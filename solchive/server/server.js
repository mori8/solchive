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
const request=require('request');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const { nextTick } = require('process');

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
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    name: "session_cookie",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:false,
        httpOnley:true,
        maxAge: 24000 * 60 * 60,  //24시간
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    (req.method === 'OPTIONS') ?
    res.send(200) :
    next();
})

//passport.serialize
passport.serializeUser((user, done)=>{
    console.log('passport session save: ', user.user_id);
    done(null, user.user_id);
})

passport.deserializeUser((id, done)=>{
    console.log('passport sessoion get id: ', id);
    done(null, id);
})

passport.use('local', new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'user_pw',
    passReqToCallback: true
}, function(req, user_id, user_pw, done) {
    if(user_id==process.env.LOGIN_ID && user_pw==process.env.LOGIN_PW){
        const user={
            user_id: user_id,
            user_pw: user_pw
        }
        console.log("id,pw 조회 성공");
        return done(null, user)
    }
    else
        return done(null, false, {'message' : 'Incorrect email or password'})
    }
));

app.post('/chkserver', (req, res, next)=>{
    passport.authenticate('local', function(err, user, info){
        if(err) res.status(500).json(err);
		if (!user) return res.status(401).json(info.message);

		req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(user);
    });

    })(req, res, next);
})

app.get('/chkserver', function(req,res) {
    var id = req.user;
	if(!req.user) res.json({loginresult:false});
	else res.json({loginresult:id});
});

var storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, /*Date.now()+ '-' + */file.originalname)
    }
})
const upload = multer({storage: storage});

// CREATE (project)
app.post('/api/project', upload.array('body_images'), (req, res) => {
    var title = req.body.title;
    var team = req.body.team;
    var period = req.body.period;
    var framework = req.body.framework;
    var body_text = req.body.body_text;
    var body_images = 'background.jpg';
    if(req.files[0]!=null){
        body_images = req.files[0].filename;
        for(var i=1; i<req.files.length; i++){
            body_images += ",";
            body_images += req.files[i].filename;
        }
    }
    var summary = req.body.summary;
    var git_url = req.body.git_url;
    var isDeleted = 0;
    
    var name1=req.body.name1;
    var name2=req.body.name2;
    var name3=req.body.name3;
    var name4=req.body.name4;
    var name5=req.body.name5;

    var comment1=req.body.comment1;
    var comment2=req.body.comment2;
    var comment3=req.body.comment3;
    var comment4=req.body.comment4;
    var comment5=req.body.comment5;

    var sql={title, team, period, framework, body_text, body_images, summary, git_url, isDeleted};
    var query=connection.query('INSERT INTO project SET ?', sql, (err,rows, fields) => {
        request.post('http://localhost:5000/api/comment', {form:{
            project_id:rows.insertId,
            name1: name1,
            name2: name2,
            name3: name3,
            name4: name4,
            name5: name5,
            comment1: comment1,
            comment2: comment2,
            comment3: comment3,
            comment4: comment4,
            comment5: comment5
        }})
        res.send(rows);
    })
});

//CREATE (comment)
app.post('/api/comment', (req, res)=>{
    var project_id=req.body.project_id;
    var name1=req.body.name1;
    var name2=req.body.name2;
    var name3=req.body.name3;
    var name4=req.body.name4;
    var name5=req.body.name5;

    var comment1=req.body.comment1;
    var comment2=req.body.comment2;
    var comment3=req.body.comment3;
    var comment4=req.body.comment4;
    var comment5=req.body.comment5;

    console.log(name1+", "+name2+", "+name3+", "+name4+", "+name5+", "+comment1+", "+comment2+", "+comment3+", "+comment4+", "+comment5);
    var sql={name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5, project_id}
    var query=connection.query('INSERT INTO comment SET ?', sql, (err,rows, fields) => {
        res.send(rows);
    })
})

// READ (project)
app.get('/api/project', (req,res) => {
    var query=connection.query('SELECT * FROM project WHERE isDeleted=0 ORDER BY period DESC', (err, rows, fields) => {
        console.log(rows);
        res.send(rows);
    })
})

// READ with id (project)
app.get('/api/project/:id', (req,res) => {
    var id=req.params.id;
    var query=connection.query('SELECT * FROM project WHERE id=?', [id], (err, rows, fields) => {
        res.send(rows);
    })
})

//READ with id (comment)
app.get('/api/comment/:id', (req, res) =>{
    var id=req.params.id;
    var query=connection.query('SELECT * FROM comment WHERE project_id =?', [id], (err, rows, fields)=>{
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
app.post('/api/update', upload.array('body_images'), (req,res) => {
    var id=req.body.id;
    var title=req.body.title;
    var team=req.body.team;
    var period=req.body.period;
    var framework=req.body.framework;
    var body_text=req.body.body_text;
    var body_images;
    if(req.files[0]!=null){
        body_images = req.files[0].filename;
        for(var i=1; i<req.files.length; i++){
            body_images += ",";
            body_images += req.files[i].filename;
        }
    }
    else
        body_images=req.body.body_images.join("");
    var summary=req.body.summary;
    var git_url=req.body.git_url;
    var isDeleted=0;

    var name1=req.body.name1;
    var name2=req.body.name2;
    var name3=req.body.name3;
    var name4=req.body.name4;
    var name5=req.body.name5;

    var comment1=req.body.comment1;
    var comment2=req.body.comment2;
    var comment3=req.body.comment3;
    var comment4=req.body.comment4;
    var comment5=req.body.comment5;

    var sql=[title, team, period, framework, body_text, body_images, summary, git_url, isDeleted, name1, comment1, name2, comment2, name3, comment3, name4, comment4, name5, comment5, id, id];
    var query=connection.query('UPDATE project AS a, comment AS b SET a.title =?, a.team =?, a.period =?, a.framework =?, a.body_text =?, a.body_images =?, a.summary =?, a.git_url =?, a.isDeleted =?, b.name1 =?, b.comment1 =?, b.name2 =?, b.comment2 =?, b.name3 =?, b.comment3 =?, b.name4 =?, b.comment4 =?, b.name5 =?, b.comment5 =? WHERE a.id =? AND b.project_id =?', sql, (err,rows, fields) => {
        res.send(rows);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
