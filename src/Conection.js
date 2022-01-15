var mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const configMysql = {
	host: process.env.HOST,
	// Ojo aqui colocamos user y no Usuario(como el nombre de la variable de entorno) porque el objeto de la conexion tiene como nombre de la propiedad "user" y por eso tenemos que pasarle el mismo nombre de la propiedad; si colocamos USUARIO o lo mismo en minuscula nos saldra indefinido ya que la conexion nos pide como nombre de la propiead "user".
	user: process.env.USUARIO,
	password: process.env.PASSWORD,
	database: process.env.database,
};

// GUARDANDO LA CONEXION de nuestra bd en una constante, para poder utilizarla esa conexion y guardar datos en la bd.
const conect = mysql.createConnection(configMysql);

//* Funcion agregar usuario(Esto deberia estar en otro archivo llamado functions o algo parecido y estas se van a llamar al "index.js");ademas el contenido de index.js como la creacion de las rutas deberian estar en una carpeta llamada Controllers y dentro de ella el archivo UserController.js.
module.exports.addUser = (tabla, nombre_contacto, numero_contacto, photo, callback) => {
	let sql = `insert into ${tabla} set ?`;
	const data = { nombre_contacto, numero_contacto, photo };
	conect.query(sql, data, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para actualizar un contacto CON PHOTO
module.exports.updateUserPhoto = (tabla, id, nombre_contacto, numero_contacto, photo, callback) => {
	const data = [nombre_contacto, numero_contacto, photo, id];
	let sql = `UPDATE ${tabla} SET nombre_contacto = ?, numero_contacto = ? , photo = ? WHERE id_contactos = ?`;
	conect.query(sql, data, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para actualizar un contacto SIN PHOTO
module.exports.updateUser = (tabla, id, nombre_contacto, numero_contacto, callback) => {
	const data = [nombre_contacto, numero_contacto, id];
	let sql = `UPDATE ${tabla} SET nombre_contacto = ?, numero_contacto = ? WHERE id_contactos = ?`;
	conect.query(sql, data, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para listar todos los contactos
module.exports.getAllUsers = (tabla, callback) => {
	let sql = `select * from ${tabla}`;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			//* Hacemos un recorrido de result(que es un Arreglo de objeto con los datos de los usuairos) y dentro de el lo que hacemos es por cada elemento del arreglo es decir por cada usuario vamos a crear una imagen con los bits que nos da (item.photo) que es la imagen convertida en bits y guardada en la BD y le decimos que nos lo guarde en "dbimages" y lo guarda con el nombre del id.png.
			result.map(item => {
				fs.writeFileSync(path.join(__dirname, "../dbimages/" + item.id_contactos + ".png"), item.photo);
			});
			// * En photo_url estamos indicando que nos devuelva un arreglo con el nombre de los archivos que estan dentro de "dbimages"
			const photo_url = fs.readdirSync(path.join(__dirname, "../dbimages/"));
			//*  Nueva constante para devolver el resultado de nuestro listado, ademas de un Array del listado de las fotos
			const newResult = [[...result], { photo_url }];
			callback(null, newResult);
		}
	});
};

//* Funcion buscar contacto por id
module.exports.getUserById = (tabla, id, callback) => {
	let sql = `select * from ${tabla} where id_contactos= ${id}`;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para eliminar un contacto
module.exports.deleteUserById = (tabla, id, callback) => {
	let sql = `delete from ${tabla} where id_contactos = ${id} `;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			return callback(null, result);
		}
	});
};
