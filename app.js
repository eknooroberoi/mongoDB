const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');//assert that just validates our data entry and our connection to the MongoDB database.

// Connection URL
const url = 'mongodb://localhost:27017';//This is the base URL for connecting to our database.

// Database Name
const dbName = 'fruitDB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
//we create a new Mongo client which is going to connect to
//our MongoDB database and if a fruitsDB doesn't exist then it will create it.
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();//close the connection to our database
      //only once it's done inserting the documents do we close the connection to our database.
    });
  // });
  // insertDocuments(db, function() {
  //   client.close();//close the connection to our database
  //   //only once it's done inserting the documents do we close the connection to our database.
  // });
});


//And the reason why I'm walking you through this and explaining the code is that in reality most developers
//who are working with Node and MongoDB will rarely use the native MongoDB driver.
//Now it's not because it's no good,
//it works and allows a lot of personalization and you can drill down to the specifics and you can set
//up and use your MongoDB database with a high level of control.


//So we're now creating this array of fruits and we're using the method insertMany which comes from MongoDB
//to insert all of these three documents into a collection called fruits inside a database called
//fruitsDB.

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
     {
       name: "Apple",
       score: 8,
       review: "Great fruit"
     },
     {
       name: "Orange",
       score: 6,
       review: "Kinda sour"
     },
     {
       name: "Banana",
       score: 9,
       review: "Great stuff!"
     }
  ], function(err, result) {
    assert.equal(err, null);// this one says validate to make sure that there are no errors when we inserted our document.
    assert.equal(3, result.result.n);//ensure that we have three results that are inserted into our collection.
    assert.equal(3, result.ops.length);//ensure that we have three results that are inserted into our collection.
    console.log("Inserted 3 documents into the collection");//And if that is so then we're going to log inserted three documents into the collection.
    callback(result);
  });
}


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
};
