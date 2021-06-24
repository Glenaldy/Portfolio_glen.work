const fs = require("fs");
const path = require("path");

function listWorks(works, fileName) {
  let openDir = fs.opendirSync(works);
  let array = [];
  while (true) {
    let fileDirent = openDir.readSync();
    if (fileDirent != null) {
      array.push(fileDirent.name);
    } else break;
  }
  return array;
}
function getData(location, dataName) {
  let openDir = fs.opendirSync(location);
  let array = [];
  while (true) {
    let fileDirent = openDir.readSync();
    if (fileDirent != null) {
      if (!fileDirent.name.indexOf(dataName)) {
        let element = path.parse(fileDirent.name);
        let fileName = element.name;
        let fileExt = element.ext;
        let en = fileName + "en";
        let jp = fileName + "jp";
        array.push({ fileName, fileExt, en, jp });
      } else break;
    }
  }
  openDir.close();
  return array;
}

exports.listWorks = listWorks;
exports.getData = getData;
