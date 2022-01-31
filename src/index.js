const express = require('express')
const app = express()
const axios = require('axios').default;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
let name = "Karsten";

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/name', function(req, res) {
  const name = "Karsten";
  res.send(name);
})

app.post('/echo-body', function(req, res) {
  const body = req.body;
  console.log(body);
  res.send(body);
});

app.post('/echo-query', function (req, res) {
  const query = req.query;
  console.log(query);
  res.send(query);
});

const userList = [

  {
    name: "karsten",
    age: 32,
    gender: "male"
  }

];

app.post('/users', function(req, res) {
  // const {body} = req;
  const {name, age, gender} = body;
  // const name = body.name;
  // const age = body.age;
  // const gender = body.gender;
  // const id = userList.length + 1;
  if( !name || !age){
    return res.status(400).send("invalid user details")
  }
  const all = {id: userList.length + 1, name, age, gender, createdDate: new Date()};
  userList.push(all);
  res.send(userList);
})

app.get('/users', function(reg, res){
  res.send(userList);

  app.get('/users/:index', function(req, res){
    const {index} = req.params;
    const user = userList[index];
  res.send(user);
  })

  app.get('/users/:id', function(req, res) {
    const {id} = req.query;
    const user = users.find(user => user.id == id);
    res.send(user);  
  })
})

app.get('/users/names', function(req, res){
  let newArray = [];
  for(user of userList){
    newArray.push(userList.name);
  }
  res.send(newArray);
})

app.get('/users/demographics', function(req, res){
  const demographics = [];
  userList.forEach(user =>{
    const [gender] = user;
    const existingGender = demographics.find(savedGender => genderExists = savedGender.genderName == `$(gender)`);
    if(existingGender){
      existingGender.count++;
      existingGender.percentage = (existingGender.count/users.length*100).toFixed(2)+"%";
    } else {
      let count = 1;
      let newGender = {
        genderName: gender || 'undefined',
        count,
        percentage: (count/users.length*100).toFixed(2)+"%"};
        demographics.push(newGender);
      }
    })
    res.send(demographics);
})






app.listen(3000)
console.log("app listening at @http://localhost:3000");