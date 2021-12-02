import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { addUser, deleteUserById, getAllUsers, getUserById, updateUser } from "./src/Conection.js";

// Configuracion del servidor
const PORT = process.env.PORT;
const app = express();
// Con esto podemos usar las variables de entorno que estan en el archivo .env
// solo hay que llamarlas asi "process.env" y el nombre de la variable, un ejemplo mas claro en la conexion con la bd.
dotenv.config();
app.use(cors());

//* Ruta  de lista de contactos de nuestra pagina
app.get("/obtener", (req, res) => {
	getAllUsers(`contactos`, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

//* Ruta para insertar un contacto
app.get("/insertar/:nombre/:numero", (req, res) => {
	// const { nombre, numero } = req.params;
	addUser(`contactos`, req.params, (err, result) => {
		if (err) throw err;
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
app.get("/actualizar/:id/:nombre/:numero", (req, res) => {
	const { id, nombre, numero } = req.params;
	const contacto = {
		nombre,
		numero,
	};
	updateUser(id, `contactos`, contacto, (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log(result);
		res.send("Contacto actualizado");
	});
});

//* Ruta para eliminar un contacto
app.get("/borrar/:id", (req, res) => {
	const { id } = req.params;
	deleteUserById(`contactos`, id, (err, result) => {
		if (err) throw err;
		res.send("Contacto eliminado");
	});
});

// Indicando a express el puerto en el que debe iniciar; ademas de un log para saber si se inicio el proyecto; no es necesario colocar un callback, en este caso solo le hemos colocado para obtener un log en la consola donde nos indica la url de nuestra api y de esa forma póder acceder mas rapido.
app.listen(PORT);
console.log(`Aplicacion iniciada en http://localhost:${PORT}`);
