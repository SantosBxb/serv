const {v4: uuidv4} = require('uuid');
const path = require('path');

exports.uploadImage = (files) => {
  return new Promise((resolve, reject) => {
    const {imagen} = files;
    const splitName = imagen.name.split('.');
    const extension = splitName[splitName.length - 1];
    const extensiones = ['png', 'jpg', 'jpeg', 'svg'];
    if (!extensiones.includes(extension)) {
      return reject('Archivo no válido ');
    }
    const name = `${uuidv4()}.${extension}`;
    const pathSave = path.join(__dirname, '../img/', name);
    imagen.mv(pathSave, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(pathSave);
    });
  });
}