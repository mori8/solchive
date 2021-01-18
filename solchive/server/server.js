const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
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
const cookieParser = require('cookie-parser');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect();

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60,
        secure:false,
        httopOnly: true
    },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
})

// LOGIN
app.post('/chkserver', (req, res) => {
    if (!req.body) res.send({loginresult:false});
    else {
      if (      
        req.body.user_id == process.env.LOGIN_ID &&
        req.body.user_pw == process.env.LOGIN_PW
      ) {
        req.session.user = {};
        req.session.user.id = req.body.user_id;
        req.session.user.pw = req.body.user_pw;
        console.log(req.session.user);
        console.log("right!");
        req.session.save(() => {
            res.send({loginresult : true});
        });
      } else {
            console.log("wrong");
            res.send({loginresult : false});
      }
    }
  });

app.get('/chkserver', (req, res) => {
    console.log("session: "+req.session.user);
    if(req.session.user){
        console.log("true");
        res.send({loginresult:true});
    }
    else{
        console.log("false");
        res.send({loginresult:false});
    }
});

var storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, /*Date.now()+ '-' +*/file.originalname)
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
    var body_images = 'background.jpg';  
    if(req.file!=null){
        body_images=req.file.filename;
    }
    var summary = req.body.summary;
    var git_url = req.body.git_url;
    var isDeleted = 0;

    var name1=req.body.name1;
    var comment1=req.body.comment1;
    var name2=req.body.name2;
    var comment2=req.body.comment2;
    var name3=req.body.name3;
    var comment3=req.body.comment3;
    var name4=req.body.name4;
    var comment4=req.body.comment4;
    var name5=req.body.name5;
    var comment5=req.body.comment5;

    var sql={title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5};         
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
app.post('/api/update', upload.single('body_images'), (req,res) => {
    var id=req.body.id;
    var title=req.body.title;  
    var team=req.body.team; 
    var period=req.body.period; 
    var framework=req.body.framework;   
    var body_text=req.body.body_text;   
    var body_images=req.body.body_images;  
    var summary=req.body.summary;  
    var git_url=req.body.git_url;   
    var isDeleted=0;
    
    if(req.file!=null){
        body_images=req.file.filename;
    }

    var name1=req.body.name1;
    var comment1=req.body.comment1;
    var name2=req.body.name2;
    var comment2=req.body.comment2;
    var name3=req.body.name3;
    var comment3=req.body.comment3;
    var name4=req.body.name4;
    var comment4=req.body.comment4;
    var name5=req.body.name5;
    var comment5=req.body.comment5;

    var sql=[title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5, id];
    var query=connection.query('UPDATE project SET title =?, team =?, period =?, framework =?, body_text =?, body_images =?, summary =?, git_url =?, isDeleted =? name1 =? comment1 =? name2 =? comment2 =? name3 =? comment3 =? name4 =? comment4 =? name5 =? comment5 =? WHERE id =?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
