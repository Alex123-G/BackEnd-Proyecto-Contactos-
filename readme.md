<!-- Explicacion de los modulos que hemos instalador -->

"cors" => Sirve para deshabilitar el "cors" ,esto lo usaremos para poder coenctar nuestra Api con nuestro proyecto de React, ya que si en todos o casi todos los navegadores lo prohiben;y es por eso que vamos a usar esta libreria para que nos deshabilit elcorso o para que nos de permisos de poder usar nuestra Api.
"dotenv" => Esta libreria nos srive para poder usar las variables de entorno(enviroment variables) las cuales esta EN EL ARCHIVO ".env" en nuestro proyecto, se utiliza con el fin de ocultar nuestras contraseña o informacion sensible,como por ejemplo la Api key , la direccion de la base de datos
"express"=> Libreria mas conocida de node la cual nos srive
"mysql"=>
"nodemon"=>

<!--! Apuntes -->

Importante!! en el packgae json hemos cambiado la propiedad "type" y le hemos dado el valor de "module", esto lo que hara es envez de usar require(forma antigua de importar archivos) vamos usar "import" para hacer importaciones; al final quedaria asi "type": "module".

En el caso del script "start": "nodemon -r dotenv/config index.js" => Esto nos indica que ejecutemos nodemon en escucha(es decir que siga escuchando ) despues le indicamos que ejeuctamos el dotenv concretamente el archivo llamado config y por ultimo que ejcutemso index.js en el cual esta nuestro inicio del servidor,osea donde le decimos que arrance el servidor.

<!-- ¿Qué son Express y Node? -->

Node.js
Node (o más correctamente: Node.js) es un entorno que trabaja en tiempo de ejecución, de código abierto, multi-plataforma, que permite a los desarrolladores crear toda clase de herramientas de lado servidor y aplicaciones en JavaScript. La ejecución en tiempo real está pensada para usarse fuera del contexto de un explorador web (es decir, ejecutarse directamente en una computadora o sistema operativo de servidor). Como tal, el entorno omite las APIs de JavaScript específicas del explorador web y añade soporte para APIs de sistema operativo más tradicionales que incluyen HTTP y bibliotecas de sistemas de ficheros.

Express.js
Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para:
Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.
Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.
Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición
