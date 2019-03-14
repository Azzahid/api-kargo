//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Bid = require('../app/models/bid');
let Transporter = require('../app/models/transporter');
let Shipper = require('../app/models/shipper');
let Job = require('../app/models/job');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Bids', () => {
    beforeEach((done) => { //Before each test we empty the database
        Bid.remove({}, (err) => {
            Transporter.remove({}, (err) => {
                done();
            });
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET bid', () => {
        it('it should GET all the bids', (done) => {
            chai.request(server)
                .get('/bid')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST bid', () => {
        it('it should POST a bid and transporter', (done) => {
            let transporter = new Transporter({name: 'ahmad', rating:5.1});
            transporter.save(async function(err,transporter){
                if(err) {
                    console.log(err);
                }
                else { //If no errors, send it back to the client
                    let shipper = new Shipper({name: 'budi'});
                    shipper.save(async function(err,shipper){
                        let date = new Date();
                        let job = {
                            origin: "D",
                            destination: "E",
                            budget: 1951,
                            ship_date: date.setDate(date.getDate() + 3),
                            distance: 100,
                            status: 'waiting',
                            shipper:shipper._id
                        };
                        let jobData = new Job(job);
                        job = await jobData.save();
                        let bid = {
                            price : 500000,
                            vehicle : "ABA",
                            status : "default",
                            job: job._id,
                            transporter:transporter._id
                        };
                        chai.request(server)
                            .post('/bid')
                            .send(bid)
                            .end((err, res) => {
                                // console.log(res.body);
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
                }
            });

        });

    });
    describe('/GET sorted bid', () => {
        it('it should POST a bid and transporter', (done) => {
            let transporter = new Transporter({name: 'ahmad', rating:5.1});
            transporter.save(async function(err,transporter){
                if(err) {
                    console.log(err);
                }
                else { //If no errors, send it back to the client
                    let shipper = new Shipper({name: 'budi'});
                    shipper.save(async function(err,shipper){
                        let date = new Date();
                        let job = {
                            origin: "D",
                            destination: "E",
                            budget: 1951,
                            ship_date: date.setDate(date.getDate() + 3),
                            distance: 100,
                            status: 'waiting',
                            shipper:shipper._id
                        };
                        let jobData = new Job(job);
                        job = await jobData.save();
                        let bids = [];
                        let bid = {
                            price : 500000,
                            vehicle : "ABA",
                            status : "default",
                            job: job._id,
                            transporter:transporter._id
                        };
                        bids.push(bid);
                        bid = {
                            price : 50000,
                            vehicle : "AJA",
                            status : "default",
                            job: job._id,
                            transporter:transporter._id
                        };
                        bids.push(bid);
                        bid = {
                            price : 10000000,
                            vehicle : "ABA",
                            status : "default",
                            job: job._id,
                            transporter:transporter._id
                        };
                        bids.push(bid);
                        for (let i=0; i<bids.length; i++) {
                            let bidData = new Bid(bids[i]);
                            await bidData.save(function(err, bid) {
                                if (err) console.log(err);
                            });
                        }
                        chai.request(server)
                            .get('/bid/sort/price')
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.length(3);
                                res.body[0].should.have.property('price');
                                res.body[0].price.should.equal(50000);
                                res.body[1].price.should.equal(500000);
                                res.body[2].price.should.equal(10000000);
                                done();
                            });
                    });
                }
            });
        });

    });
});
