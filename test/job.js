//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Job = require('../app/models/job');
let Shipper = require('../app/models/shipper');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Jobs', () => {
    beforeEach((done) => { //Before each test we empty the database
        Job.remove({}, (err) => {
            Shipper.remove({}, (err) => {
                done();
            });
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET job', () => {
        it('it should GET all the jobs', (done) => {
            chai.request(server)
                .get('/job')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST job', () => {
        it('it should POST a job and shipper', (done) => {
            let shipper = new Shipper({name: 'budi'});
            shipper.save((err,shipper) => {
                if(err) {
                    console.log(err);
                }
                else { //If no errors, send it back to the client
                    let job = {
                        origin: "A",
                        destination: "B",
                        budget: 1954,
                        ship_date: Date.now(),
                        distance: 100,
                        status: 'waiting',
                        shipper:shipper._id
                    };
                    chai.request(server)
                        .post('/job')
                        .send(job)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                }
            });

        });

    });
    describe('/GET sorted job', () => {
        it('it should POST a job and shipper', (done) => {
            let shipper = new Shipper({name: 'budi'});
            shipper.save(async function(err,shipper){
                if(err) {
                    console.log(err);
                }
                else { //If no errors, send it back to the client
                    let jobs = [];
                    let date = new Date();
                    let job = {
                        origin: "A",
                        destination: "B",
                        budget: 1954,
                        ship_date: date.setDate(date.getDate() + 3),
                        distance: 100,
                        status: 'waiting',
                        shipper:shipper._id
                    };
                    jobs.push(job);
                    job = {
                        origin: "C",
                        destination: "D",
                        budget: 1952,
                        ship_date: date.setDate(date.getDate() - 5),
                        distance: 100,
                        status: 'waiting',
                        shipper:shipper._id
                    };
                    jobs.push(job);
                    job = {
                        origin: "D",
                        destination: "E",
                        budget: 1951,
                        ship_date: date.setDate(date.getDate() + 3),
                        distance: 100,
                        status: 'waiting',
                        shipper:shipper._id
                    };
                    jobs.push(job);
                    for (let i=0; i<jobs.length; i++) {
                        let jobData = new Job(jobs[i]);
                        await jobData.save(function(err, job) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    chai.request(server)
                        .get('/job/sort/ship_date')
                        .end((err, res) => {
                            // console.log(res.body);
                            let jobs = res.body;
                            res.should.have.status(200);
                            res.body.should.have.length(3);
                            res.body.should.have.length(3);
                            res.body[0].should.have.property('origin');
                            res.body[0].origin.should.equal('C');
                            res.body[1].origin.should.equal('D');
                            res.body[2].origin.should.equal('A');
                            done();
                        });
                }
            });

        });

    });
});
