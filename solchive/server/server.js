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
const MySQLStore = require('express-mysql-session')(session);
const request=require('request');

app.use(cookieParser());

const options={
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,

    clearExpired: true,
    checkExpirationInterval: 90000,

        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
};

app.use(session({
    name: "session_cookie_name",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options),
    cookie: { 
        maxAge: 1000 * 60 * 3,
    }
}));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    multipleStatements: true
})

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/*app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
})*/

app.get('/', (req, res)=>{
    session=req.session;
});

var session_id;
// LOGIN
app.post('/chkserver', (req, res) => {
      if (      
        req.body.user_id == process.env.LOGIN_ID &&
        req.body.user_pw == process.env.LOGIN_PW
      ) {
        req.session.logined=true;
        console.log(JSON.stringify(req.session));
        req.session.save(()=>{
            console.log("right");
            res.send({loginresult:true});
        });
      }
      else{
          console.log("wrong");
          res.send({loginresult:false});
      }
  });

app.get('/chkserver', (req, res) => {
   /* req.session.reload((err)=>{
        if(err)
        console.log(err);
    });*/
    if(req.session.logined){
        console.log("true");
        res.send({loginresult:true});
    }
    else{
        console.log("false");
        res.send({loginresult:false});
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sid');
})

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
    
    var sql={title, team, period, framework, body_text, body_images, summary, git_url, isDeleted};         
    var query=connection.query('INSERT INTO project SET ?', sql, (err,rows, fields) => {
        request.post('http://localhost:5000/api/comment', {form:{project_id:rows.insertId}})
        res.send(rows);
    })
});

app.post('/api/comment', (req, res)=>{
    var project_id=req.body.project_id;
    var name1="";
    if(req.body.name1!=null)
        name1=req.body.name1;    
    var name2="";
    if(req.body.name2!=null)
        name2=req.body.name2; 
    var name3="";
    if(req.body.name3!=null)
        name3=req.body.name3; 
    var name4="";
    if(req.body.name4!=null)
        name4=req.body.name1; 
    var name5="";
    if(req.body.name5!=null)
        name5=req.body.name5; 
    
    var comment1="";
    if(req.body.comment1!=null)
        comment1=req.body.comment1;
    var comment2="";
    if(req.body.comment2!=null)
        comment2=req.body.comment2;
    var comment3="";
    if(req.body.comment3!=null)
        comment3=req.body.comment3;
    var comment4="";
    if(req.body.comment4!=null)
        comment4=req.body.comment4;
    var comment5="";
    if(req.body.comment5!=null)
        comment5=req.body.comment5;

    var sql={name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5, project_id}
    var query=connection.query('INSERT INTO project_comment SET ?', sql, (err,rows, fields) => {
        res.send(rows);
    })
})

// READ
app.get('/api/project', (req,res) => {
    var query=connection.query('SELECT * FROM project WHERE isDeleted=0', (err, rows, fields) => {
        res.send(rows);
    })
})

// READ id
app.get('/api/project/:id', (req,res) => {
    var id=req.params.id;
    var query=connection.query('SELECT * FROM project JOIN project_comment ON WHERE project.id = project_comment.project_id WHERE id=?', [id], (err, rows, fields) => {
        console.log(fields);
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

    var name1="";
    if(req.body.name1!=null)
        name1=req.body.name1;    
    var name2="";
    if(req.body.name2!=null)
        name2=req.body.name2; 
    var name3="";
    if(req.body.name3!=null)
        name3=req.body.name3; 
    var name4="";
    if(req.body.name4!=null)
        name4=req.body.name1; 
    var name5="";
    if(req.body.name5!=null)
        name5=req.body.name5; 
    
    var comment1="";
    if(req.body.comment1!=null)
        comment1=req.body.comment1;
    var comment2="";
    if(req.body.comment2!=null)
        comment2=req.body.comment2;
    var comment3="";
    if(req.body.comment3!=null)
        comment3=req.body.comment3;
    var comment4="";
    if(req.body.comment4!=null)
        comment4=req.body.comment4;
    var comment5="";
    if(req.body.comment5!=null)
        comment5=req.body.comment5;
    
    var sql=[title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, id];
    var sql2=[name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5, id];

    var query=connection.query('UPDATE project SET title =?, team =?, period =?, framework =?, body_text =?, body_images =?, summary =?, git_url =?, isDeleted =? WHERE id =?; UPDATE project_comment SET name1 =?, comment1 =?, name2 =?, comment2 =?, name3 =?, comment3 =?, name4 =?, comment4 =?, name5 =?, comment5 =? WHERE id =?;', sql, sql2, (err,rows, fields) => {
        res.send(fields);
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
