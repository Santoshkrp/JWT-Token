
require('dotenv').config();

const express = require('express')
const app = express()


const jwt = require('jsonwebtoken')

app.use(express.json())

const posts=[
    {
        username : 'kyle',
        title:'Post 1'
    },
    {
    username : 'jim',
    title:'Post 2'
    }
]

app.get('/posts', authenticateToken, (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

app.get('/',(req,res)=>{

    res.sendFile(__dirname + '/index2.html');
});



app.post('/login', (req,res)=>{
    //authentication user

    const username = req.body.username
    const user ={name: username}
    
//     create token using  (node terminal) and past in .env Token
// require('crypto').randomBytes(64).toString('hex)

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken : accessToken})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()

    })
}


// app.listen(4000)

app.listen(4000,()=> {
    console.log("server is listening at port 4000");})