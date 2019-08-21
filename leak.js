var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var sharp = require('sharp');

http.createServer(function(req, res) {

    // File upload from https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp   
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var transform=sharp();
            transform.resize(200,200);
            transform.png();            
            transform.on('error', (err) => {
                console.log(err); 
                res.write('Error during image transformation!'); 
                res.end();
            });
            instream = fs.createReadStream(files.filetoupload.path).pipe(transform);
            res.setHeader("Content-Type","image/png");
            instream.pipe(res);
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }


}).listen(8099);
