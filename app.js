const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitDB", {useNewUrlParser: true, useUnifiedTopology: true});
//27017 is port where we can access our mongodb database server
//if fruitDB not present, it will create one
const fruitSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    review: String
  }
);
const Fruit= mongoose.model("Fruit", fruitSchema);
const fruit= new Fruit(
  {
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
  }
);

//fruit.save();//remember that every single time you run fruit.save it will save the same fruit into your fruits collection in your fruits database.
//So if you don't want that to happen, then you can just comment out this method call and you won't end up with a whole bunch of apples in your database.

const personSchema= new mongoose.Schema(
  {
    name: String,
    age: Number
  }
);
const Person= mongoose.model("Person", personSchema);
const person = new Person(
  {
    name: "John",
    age:37
  }
);

//person.save();

const kiwi = new Fruit(
  {
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
  }
);
const orange = new Fruit(
  {
    name: "Orange",
    score: 4,
    review: "Too sour for me"
  }
);
const banana= new Fruit(
  {
    name: "Banana",
    score: 3,
    review: "Weird texture"
  }
);



//insertMany and it takes two parameters. The first one is an array of objects that match that particular schema,
//so all fruits here. We've got kiwi, orange and bananas. So we'll add that kiwi, orange and banana.
//And then the second parameter will be a callback and it allows us to log any errors
//if there were any issues with inserting all of these objects into our fruits collection.
//And so we can check say if there's an error then we'll log the error, but else then we'll log "Successfully
//saved all the fruits to fruitsDB". And let's close that off and let's hit save and exit out of our database
//and run our app.js again.
Fruit.insertMany([kiwi,orange,banana], function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully saved all the fruits to fruitsDB");
  }
});
