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
      // console.log(db.collections('users'))
      }
  })

module.exports = function (app) {

    app.route('/api/issues/:project')
  
      .get(function (req, res){
        var project = req.params.project;
        // console.log(req.query)
        let newQuery = {}
        Object.keys(req.query).forEach(ele => {
          newQuery[ele] = req.query[ele]
        })
        gdb.collection(project).find(newQuery).toArray((err, d) => {
          res.json(d)
        })
      })    
      .post(function (req, res){
        var project = req.params.project;
        req.body.open = true
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
        delete change._id
        console.log(change)
        gdb.collection(project).updateOne(
          {_id: ObjectId(req.body._id)},
          {$set: change},
          (err, doc) => {
            if (err) res.json({error: 'Data Updation Incomplete'})            
            else {
              // console.log(doc)
              res.json({success: 'Updation Complete'})
            }
          }
        )
      })
    
      .delete(function (req, res){
        var project = req.params.project;

        gdb.collection(project).deleteOne({_id: ObjectId(req.body._id)},(err, doc) => {
          if (err) res.json({error: 'Error in Dleting Data'})
          else res.json({success: 'Issue Deleted'})
        })
    });
    
};

