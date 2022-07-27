const express = require('express');

var fs=require('fs');
var hsdata=fs.readFileSync('data.json', 'utf8');
var obj=JSON.parse(hsdata);

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


app.post('/pst', function(req, res){
    const df = req.body;
    var hspemail = "NOT FOUND";
    var hspstreet = "NOT FOUND";
    var hsppost = "NOT FOUND";
    for (var i =0; i<obj.length; i++) {
        if (obj[i].postal == df.pst) {
            var hsppost = obj[i].postal;
            var hspemail = obj[i].email;
            var hspstreet = obj[i].street;
        }
    }

    
    res.json({
        status: "SUCCESS",
        postal: hsppost,
        email : hspemail,
        street : hspstreet
   });
});