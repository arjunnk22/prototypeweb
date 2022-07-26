const express = require('express');
const app = express();

require('dotenv').config();

const Datastore = require('nedb');

const database = new Datastore('data.db');
database.loadDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

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


