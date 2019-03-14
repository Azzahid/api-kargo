let mongoose = require('mongoose');
let Job = require('../models/job');
let sort = require('../helper/sort');

/*
 * GET /book route to retrieve all the books.
 */
function getJobs(req, res) {
    let query = Job.find({});
    query.exec((err, jobs) => {
        if(err) res.send(err);
        res.json(jobs);
    });
}

function getSortedJobs(req,res) {
    let query = Job.find({});
    query.exec(async function(err, jobs) {
        if(err) res.send(err);
        // console.log(jobs);
        jobs = await sort.sort(jobs, req.params.attr);
        res.json(jobs);
    });
}

function postJobs(req, res) {
    //Creates a new book
    var newJob = new Job(req.body);

    //Save it into the DB.
    newJob.save((err,job) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Job successfully added!", job});
        }
    });
}

//export all the functions
module.exports = { getJobs, getSortedJobs, postJobs};
