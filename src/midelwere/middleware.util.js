const { check } = require("express-validator");

const validateProducts = [
  check('nombre', "El nombre no puede estar vacio").not().isEmpty(),
  check('descripcion', "La descripcion no puede estar vacio").not().isEmpty(),
  check('precio', "El precio no puede estar vacio").isInt(),
  check('tipo', "El tipo no puede estar vacio").not().isEmpty(),
  check('cantidad', "La cantidad debe ser entera y no puede estar vacio").isInt(),
]
module.exports = validateProducts;