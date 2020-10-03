
let mongoose = require('mongoose');
let data = require('./dataGeneration.js');


const db = mongoose.connect('mongodb://localhost/videoHeader', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(error => handleError(error));
const connection = mongoose.connection;
connection.on('error', () => {
  console.log('err creating mongoose connection');
});
connection.once('open', () => {
  console.log('im connected to mongo');
});
const { Schema } = mongoose;

let headerSchema = {
  identifier: Number,
  backing: {
    fundingGoal: Number,
    pledged: Number,
    backers: Number,
    daysRemaining: Number,
    fundingStatus: {
      plan: String,
      endDate: Date,
      alreadyFunded: String,
    }
  },
  header: {
    title: String,
    headline: String,
    videoUrl: String,
    thumbnail: String,
  }
};

// console.log('data ', data.dataResults[0]);
const MyModel = mongoose.model('headerData', new Schema (headerSchema));
let SeedData = [];
for (let i = 0; i < 5; i++) {
  //return video promise and then get synchronous data object
  // data.video()
  // .then((videoData) => {
  //   console.log('videoData', videoData);
  //   new MyModel(data.dataResults);
  //   console.log('MyModel', MyModel);
  //   SeedData.push(data).save();
  // })
  // .catch((err) => {
  //   console.log('err in video request from database', err);

  // });
  let generatedData = data.objectCreation(i);
  // generatedData['_id'] = i;
  let currentModel = new MyModel(generatedData);
  // currentModel.update({identifier: {i}});
  console.log('MyModel', currentModel);
  // SeedData.push(current.save());
}
// console.log(SeedData);
// Promise.all(SeedData);

//iterate 100 times inputing data into an instance of mymodel
//promimse all to save all instances




