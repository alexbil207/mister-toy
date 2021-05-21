const express = require('express');
const session = require('express-session');
const userService = require('./services/user.service.js')
const toyService = require('./services/toys.service.js')

const cors = require('cors')
const app = express();
const PORT = 3030;



// Config Express Application
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}
app.use(cors(corsOptions))




//##### statistics #######
app.get('/api/toy/statisticts', (req, res) => {
    toyService.getToyStatistics()
        .then(statisticts => res.send(statisticts));
});


//############# Users ###########
app.post('/api/signup', (req, res) => {
    const userInfo = req.body;
    userService.saveUser(userInfo)
        .then(user => res.send(user))
        .catch(err => res.status(401).send('Not Saved!'))
});

app.post('/api/login', (req, res) => {
    const credentials = req.body;
    userService.getUser(credentials)
        .then(user => {
            if (user) {
                req.session.loggedInUser = user;
                res.send(user)

            } else res.status(403).send('User Not Exist');
        });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
})

//############# Toys ###########

//get
app.get('/api/toy', (req, res) => {
    toyService.query(req.query)
        .then(toys => res.send(toys));
});


//Read
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params;
    toyService.getToyById(toyId)
        .then(toy => {
            res.send(toy)
        })
})


//create
app.post('/api/toy', (req, res) => {
    const toyInfo = req.body;
    toyService.saveToy(toyInfo)
        .then(toy => res.send(toy))
        .catch(err => res.send(err))
});

//update
app.put('/api/toy', (req, res) => {
    const toyInfo = req.body;
    toyService.saveToy(toyInfo)
        .then(toy => res.send(toy))
        .catch(err => res.send(err))
});

//delete
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params;
    toyService.removeToy(toyId)
        .then(status => res.send(status))
        .catch(err => res.send(err))
})

app.listen(PORT, (req, res) => console.log("app listening in http://localhost:" + PORT));