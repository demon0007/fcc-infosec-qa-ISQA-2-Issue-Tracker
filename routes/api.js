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
      console.log(db.collections('users'))
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
        gdb.collection(project).insertOne(req.body, (err, doc) => {
          if (err) res.json({error: 'Data Insertion Error'})
          else res.json(doc.ops[0])
        })
      })
    
      .put(function (req, res){
        var project = req.params.project;
        let change = {}
        Object.keys(req.body).forEach(key => {
          if ( req.body[key] != '' ) {
            change[key] = req.body[key]
          }
        })
        console.log(change)
//         gdb.collection(project).update(
//           {_id: req.body._id},
          
//         )
      })
    
      .delete(function (req, res){
        var project = req.params.project;

      });
    
};
