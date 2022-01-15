//todo  Importando Módulos
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const { addUser, deleteUserById, getAllUsers, getUserById, updateUser, updateUserPhoto } = require("./src/Conection.js");
//* Modulo para poder leer archivos(textos ,imagenes,etc) o para convertir archivos
const fs = require("fs");

//* Configuracion del servidor (llamanda a express y creando/llamando middlewares)
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
// Configuracion para poder usar las varaibles de entorno
dotenv.config();
// Le indicamos a express que se pueda acceder a la carpeta "dbimages" de forma pública.
app.use(express.static(path.join(__dirname, "dbimages")));

// Creando la configuracion de multer EL CUAL es un middleware que se va ejecutar en nuestra ruta para craer un contacto "/insertar" y lo que va hacer esto es crear una carpeta llamda "iamges" y dentro de ella
const diskstorage = multer.diskStorage({
	destination: path.join(__dirname, "/images"),
	filename: (req, file, callback) => {
		callback(null, Date.now() + "-monkeywit-" + file.originalname);
	},
});
// LLamamos el resutlado de multer  el cual es un middleware.En resumen le estamos diciendo a multer que configuracion queremos que use, en este caso le decimos que use nuestro configuracion "diskstorage" usamos .single("image") para indicarle a que variable hacemos referencia este tiene el mismo nombre a la propiedad de Nuestro FormData  que contiene la informacion del archivo que hemos colocado en el formulario.
const fileUpload = multer({ storage: diskstorage }).single("image");

//* Funcio para eliminar la imagen de la carpeta dbimages pasandole como parametro un id, el cual es el id del contacto que deseamos eliminar
function deletePgoto(id) {
	fs.unlinkSync(path.join(__dirname, "./dbimages/" + id + ".png"));
}

//* Ruta para insertar un contacto
app.post("/insertar", fileUpload, (req, res) => {
	const nombre_contacto = req.body.nombre;
	const numero_contacto = req.body.numero;
	//* La const "photo"  recibe la lectura del archivo que esta la carpeta images y esta va a leer la foto que se esta enviaod el cual es UN TIPO DE DATO "File" y "photo" va contener la convercion de la foto en codigo binario y lo va guardar en la BD en el campo "photo" y ese dato en codigo bianrio es el que vamos a enviarle al metodo "addUser" para que lo guarde en la BD
	const photo = fs.readFileSync(path.join(__dirname + "/images/" + req.file.filename));
	addUser(`contactos`, nombre_contacto, numero_contacto, photo, (err, result) => {
		if (err) throw err;
		getAllUsers(`contactos`, (err, result) => {
			if (err) throw err;
			// console.log(result);
			res.send(result);
		});
		// res.send("Agregado");
	});
});

//* Ruta  de lista de contactos de nuestra pagina
app.get("/obtener", (req, res) => {
	getAllUsers(`contactos`, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

//* Ruta para buscar un contacto por su id
app.get("/obtener/:id", (req, res) => {
	const { id } = req.params;
	getUserById(`contactos`, id, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

//* Ruta para actualizar un contacto
app.put("/actualizar/:id", fileUpload, (req, res) => {
	const { id } = req.params;
	const nombre_contacto = req.body.nombre;
	const numero_contacto = req.body.numero;

	if (req.file === undefined) {
		// console.log("SOY UNDEFINED");
		updateUser(`contactos`, id, nombre_contacto, numero_contacto, (err, result) => {
			if (err) throw err;
			// console.log(result);
			getAllUsers(`contactos`, (err, result) => {
				if (err) throw err;
				// console.log(result);
				res.send(result);
			});
		});
	} else {
		// console.log("SOY PHOTO");
		const photo = fs.readFileSync(path.join(__dirname + "/images/" + req.file.filename));
		updateUserPhoto(`contactos`, id, nombre_contacto, numero_contacto, photo, (err, result) => {
			if (err) throw err;
			// console.log(result);
			res.send("Contacto actualizado con photo");
		});
	}
});

//* Ruta para eliminar un contacto
app.delete("/borrar/:id", (req, res) => {
	const { id } = req.params;
	deleteUserById(`contactos`, id, (err, result) => {
		if (err) throw err;
		deletePgoto(id);
		getAllUsers(`contactos`, (err, result) => {
			if (err) throw err;
			// console.log(result);
			res.send(result);
		});
	});
});

app.listen(PORT);
console.log(`Aplicacion iniciada en http://localhost:${PORT}`);
