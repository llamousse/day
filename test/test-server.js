const chai = require('chai');
const chaiHttp = require('chai-http');
// const faker = require('faker')
// const mongoose = require('mongoose')

// const {app, runServer, closeServer} = require('../server')

chai.use(chaiHttp);

const should = chai.should;
const { app } = require('../server');

// describe('load localhost:8080', function(){
//
// 	it('should go to home page', function(){
// 		return chai.request(app)
// 			.then(function(res){
// 				res.should.have.status(200);
// 				res.should.be.html;
// 			});
// 	});
//
// });
