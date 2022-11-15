const db = require('mongoose');
db.Promise = global.Promise;

const connect = async (url) => {
	await db.connect(url, {
		useNewUrlParser: true, //Compatibilidad de servidor
	});
	// eslint-disable-next-line no-console
	console.log('Conexión exitosa a la base de datos');
};

module.exports = connect;
