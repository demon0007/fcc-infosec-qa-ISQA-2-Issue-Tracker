/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var gdb
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

MongoClient.connect(CONNECTION_STRING, (err, db) => {
    
    if (err) {
      console.log("Error In Connecting To the Database")
    } else {
      
      console.log("Successfully Connected to The Database")
      gdb = db
      }
  })

module.exports = function (app) {

    app.route('/api/issues/:project')
  
      .get(function (req, res){
        var project = req.params.project;
        console.log(project)
        res.json({})
      })
    
      .post(function (req, res){
        var project = req.params.project;
        
        res.json(req.body)
      })
    
      .put(function (req, res){
        var project = req.params.project;

      })
    
      .delete(function (req, res){
        var project = req.params.project;

      });
    
};
