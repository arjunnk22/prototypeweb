const express = require('express');
const hspData = require('./data.json');
const bodyParser=require("body-parser");

const app = express();

require('dotenv').config();

const Datastore = require('nedb');

const database = new Datastore('data.db');
database.loadDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}`));
app.use(express.static('public'));
app.use(express.json({}));
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        response.json(data);
    });

});


app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    
    //getapi(data)
    response.json({
        status: 'SUCCESS',
        timestamp: timestamp,
        lat : data.lat,
        lng : data.lng
    });

    
});


// app.post('/pst', (request, response) => {
//     console.log(request.body);
//     const data = request.body;

//     let reqData = hspData.find(el => el.postal === data.postal);
//     const newData = reqData["email"];

//     response.json({
//         status: 'SUCCESS',
//         lat : data.lat,
//         lng : data.lng,
//         post : data.postal,
//         eml : newData
//     });

    
// });

app.post('/pst', function(req, res){

    const newData = req.body;
    // res.writeHead(200,{
    //     "Content-Type": "text/plain",
    //     "Access-Control-Allow-Origin": "*" // Allow access from other domains
    // });
    
    
    res.json({
         newdata: newData
    });
    //res.end();
});