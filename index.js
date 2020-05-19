const express = require('express');
const shell = require('shelljs')
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());

app.post('/transcode', (req, res) => {
    const {input_uri, output_uri} = req.body;
    shell.exec(`./run.sh ${input_uri} ${output_uri}`)
    res.send({
        message: 'Encoding Successful'   
    });
})

app.listen(8080, () => {
    console.log("Listening on port 3000");
})