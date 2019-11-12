const server = require('../server.js');
const express = require('express');
const request = require('supertest');
const initServer = () => {
	const app = express();
	app.use(server());
	return app;
}

/*
beforeEach(()=> {
	initializeCSVTable();
});


afterEach(()=> {
	clearCSVTable();
});
*/

const app = initServer();

describe('Test get week', () => {
	test('get most recent week', (done) => {
		request(app).get('/').then((response) => {
			expect(response.statusCode).toBe(200);
			done();
		});		
	});	
});
