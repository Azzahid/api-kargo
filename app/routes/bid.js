let mongoose = require('mongoose');
let Bid = require('../models/bid');
let sort = require('../helper/sort');

/*
 * GET /book route to retrieve all the books.
 */
function getBids(req, res) {
    //Query the DB and if no errors, send all the books
    let query = Bid.find({});
    query.exec(async function(err, bids){
        if(err) res.send(err);
        res.json(bids);
    });
}

function getSortedBids(req, res) {
    let query = Bid.find({});
    query.exec(async function(err, bids) {
        if(err) res.send(err);
        // console.log(bids);
        bids = await sort.sort(bids, req.params.attr);
        res.json(bids);
    });
}

/*
 * POST /book to save a new book.
 */
function postBid(req, res) {
    //Creates a new book
    var newBids = new Bid(req.body);
    //Save it into the DB.
    newBids.save((err,bids) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Book successfully added!", bids });
        }
    });
}

//export all the functions
module.exports = { getBids, getSortedBids, postBid };
