const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}`));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    response.json({
        status: 'SUCCESS',
        lat : data.lat,
        lng : data.lng
    });
})