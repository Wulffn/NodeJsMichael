const db = require('./data');
const express = require('express');
const moment = require('moment')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async function(req, res) {
    let postings = await db.getAllPostings()
    res.render('pages/home', {
        postings: postings,
        moment: moment,
    });
});

app.post('/finish', async function(req, res) {
    const postings = await db.finishPosting(req.body.id)
    res.render('pages/home', {
        postings: postings,
        moment: moment
    });
});

app.post('/', async function(req, res) {
    let postings = await db.addPosting(req.body)
    res.render('pages/home', {
        postings: postings,
        moment: moment,
    });
});

app.listen(port, () => {
    console.log("Server listening on port 8080")
});

