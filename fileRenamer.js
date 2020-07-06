// npm i -g moment
var fs = require('fs');
var moment = require('moment');
// Write directory path here
var directoryPath = './';
var list = fs.readdirSync(directoryPath);
var newFileName;
var fileNametmp;
var fileExt;
var stat;
var fileCreatedAt;
var imgNamesTaken = [];
var vidNamesTaken = [];
var allowedFiles = ['jpg', 'png', 'jpeg', 'mp4'];

list.forEach(function (fileName) {
    fileExt = fileName.split('.').pop().toLowerCase();
    fileNametmp = fileName.replace(/_/g, '').replace(/-/g, '');
    if(!/^\..*/.test(fileName) && allowedFiles.indexOf(fileExt) > -1) {
        stat = fs.statSync(directoryPath + fileName);
        fileCreatedAt = moment(stat.mtime);
        if (fileExt == 'mp4') {
            newFileName = fileCreatedAt.format("[VID]YYYYMMDD[-]HHmmss");
            if (vidNamesTaken.indexOf(newFileName) > -1)
                newFileName = newFileName + "_2";
        } else {
            newFileName = fileCreatedAt.format("[IMG]YYYYMMDD[-]HHmmss");
            if (imgNamesTaken.indexOf(newFileName) > -1)
                newFileName = newFileName + "_2"
        }
    }

    if (fileExt == 'mp4') {
        if (vidNamesTaken.indexOf(newFileName) > -1) {
            console.log("Failed for: ", newFileName);
            process.exit();
        }
    } else {
        if (imgNamesTaken.indexOf(newFileName) > -1) {
            console.log("Failed for: ", newFileName);
            process.exit();
        }
    }
    newFileName = newFileName + "." + fileExt;

    if (fileName != newFileName) {
        console.log("Old name: %s :: New name: %s", fileName, newFileName);
        fs.renameSync(directoryPath + fileName, directoryPath + newFileName);
    }
});
