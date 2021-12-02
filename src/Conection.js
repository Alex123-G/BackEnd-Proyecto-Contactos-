import e from "express";
import mysql from "mysql";

const configMysql = {
	host: process.env.HOST,
	// Ojo aqui colocamos user y no Usuario poruqe el objeto de la conexion tiene como nombre de la propiedad "user" y por eso tenemos que pasarle el mismo nombre de la propiedad; si colocamos usuario nos saldra indefinido.
	user: process.env.USUARIO,
	password: process.env.PASSWORD,
	database: process.env.database,
};

// GUARDANDO LA CONEXION de nuestra bd en una constante, para poder utilizarla esa conexion y guardar datos en la bd.
const conect = mysql.createConnection(configMysql);

//* Funcion agregar usuario
const addUser = (tabla, usuario, callback) => {
	//! el valor de nombre de contactodebe ir entre comillas sean dobles o simples, esto es poruqe el tipo de dato de la tabla es un varchar(char) , y si no lo colocamos es como si le estubieramos enviando un int; ES POR ESO QUE CUANDO UN CAMPO DE UNA TABLA ES VARCHAR(CHAR) LO DEBEMOS COLOCAR CON COMILLAS.
	let sql = `insert into ${tabla} (id_contactos, nombre_contacto, numero_contacto) values (null, "${usuario.nombre}", ${usuario.numero})`;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

const getAllUsers = (tabla, callback) => {
	let sql = `select * from ${tabla}`;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion buscar contacto por id
const getUserById = (tabla, id, callback) => {
	let sql = `select * from ${tabla} where id_contactos= ${id}`;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para actualizar un contacto
const updateUser = (id, tabla, usuario, callback) => {
	let sql = `update ${tabla} set nombre_contacto = "${usuario.nombre}", numero_contacto = ${usuario.numero} where id_contactos = ${id} `;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

//* Funcion para eliminar un contacto
const deleteUserById = (tabla, id, callback) => {
	let sql = `delete from ${tabla} where id_contactos = ${id} `;
	conect.query(sql, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

export { conect, addUser, getAllUsers, getUserById, updateUser, deleteUserById };
