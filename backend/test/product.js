process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


describe('getting the user details from the orders table',()=> {
    it('it should GET all the user order details', (done) => {
        chai.request(server)
        .post('/api/profile/mypurchases')
        .send({email: 'gadechinnu70@gmail.com'})
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

describe('checking the shop uniqueness',()=> {
    it('checking whether the user entered shopname is created or not', (done) => {
        chai.request(server)
        .post('/api/shopname/uniqueshopname')
        .send({shopname: 'InthePitara'})
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.have.property('success').eql('false');
            done();
        });
    });
});

describe('getting the results of users favorite products',()=> {
    it('user favorite details should be present', (done) => {
        chai.request(server)
        .post('/api/profile/getfavourite')
        .send({favkeyword:'undefined',email:'gadechinnu70@gmail.com'})
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql('true');
            done();
        });
    });
});

describe('getting the results of shop categories',()=> {
    it('shop categories should be present', (done) => {
        chai.request(server)
        .post('/api/shopname/getshopcategory')
        .send({shopname: 'InthePitara'})
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql('true');
            done();
        });
    });
});

describe('Adding the user custom shopcategory',()=> {
    it('user shop category should be present', (done) => {
        chai.request(server)
        .post('/api/shopname/shopcategory')
        .send({shopname: 'InthePitara'})
        .end((err,res)=> {
            res.should.have.status(200);
            res.body.should.have.property('success').eql('true');
            done();
        });
    });
});