const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;
const data = fs.readFileSync('../database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const cors = require('cors');
const multer=require('multer');
const dotenv=require('dotenv');
dotenv.config({path:'../.env'});
const session=require('express-session');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
})

// LOGIN
app.use(session({
    HttpOnly: true,
    secure: true,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 }
}));

app.post('/chkserver', (req, res) => {
    if (!req.body) res.redirect('/');
    else {
      if (      
        req.body.user_id == process.env.LOGIN_ID &&
        req.body.user_pw == process.env.LOGIN_PW
      ) {
        req.session.user = {};
        req.session.user.id = req.body.user_id;
        req.session.user.pw = req.body.user_pw;
        console.log("right!");
        req.session.save(() => {
          res.redirect('/main');
        });
      } else {
        res.redirect('/');
        console.log("wrong");
      }
    }
  });

var storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})
const upload = multer({storage: storage});


// CREATE
app.post('/api/project', upload.single('body_images'), (req, res) => {
    var title = req.body.title;
    var team = req.body.team;
    var period = req.body.period;
    var framework = req.body.framework;
    var body_text = req.body.body_text;
    var body_images = '/upload/' + req.file.filename;  
    var summary = req.body.summary;
    var git_url = req.body.git_url;
    var isDeleted = 0;
    // var impression=req.body.impression;
  
    var sql={title, team, period, framework, body_text, body_images, summary, git_url, isDeleted};          
    var query=connection.query('INSERT INTO project SET ?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

// READ
app.get('/api/project', (req,res) => {
    var query=connection.query('SELECT * FROM project WHERE isDeleted=0', (err, rows, fields) => {
        res.send(rows);
    })
})

// READ id
app.get('/api/project/:id', (req,res) => {
    var id=req.params.id;
    var query=connection.query('SELECT * FROM project WHERE id =?', [id], (err, rows, fields) => {
        res.send(rows);
    })
})

// DELETE
app.delete('/api/project/:id', (req, res) => {
    var id = req.params.id;
    var query=connection.query('UPDATE project SET isDeleted = 1 WHERE id =?', [id], (err, rows, fields) => {
        res.send(rows);
    })
})

// UPDATE
app.post('/api/update', (req,res) => {
    var id=req.body.id;
    var title=req.body.title;  
    var team=req.body.team; 
    var period=req.body.period; 
    var framework=req.body.framework;   
    var body_text=req.body.body_text;   
    var body_images='/upload/'+req.file.filename;  
    var summary=req.body.summary;  
    var git_url=req.body.git_url;   
    var isDeleted=0;
    // var impression=req.body.impression; 

    var sql=[title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, id];
    var query=connection.query('UPDATE project SET title =?, team =?, period =?, framework =?, body_text =?, body_images =?, summary =?, git_url =?, isDeleted =? WHERE id =?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));