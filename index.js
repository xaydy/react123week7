const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors =require('cors')

app.use(cors())

const connection = mysql.createConnection({
    host: '159.89.206.43',
    user: 'jack',
    password: '123456',
    database: 'wannabedev'
})

connection.connect


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    // connection.query('SELECT * FROM user', (err,result) =>{
    //     if (err) throw err
    //     res.send(result)
    // })
    res.send('api')
})

app.post('/loing', (req, res) =>{
    const {email,password}=req.body
    const params = [email,password]
    const query = "SELECT id FROM user WHERE email=? AND password = ?"
    connection.query(query,params, (err,result) =>{
        if (err) throw err

        if(result.length > 0 ){
            res.send({
                status:200,
                msg: 'Loing success'
            })
        }else{
            res.send({
                status:404,
                msg: "user does not exits"
            })
        }
            
        
    })
})

app.post('/register', (req, res)=>{
    const {email, pass, firstname, lastname, username} = req.body
    const params = [email, pass, firstname, lastname, username]
    const query = "INSERT INTO user (email, password, firstname, lastname, username) VALUES (?, ?, ?, ?,?)"
    connection.query(query,params, (err,result)=>{
        if (err) throw err
        res.send('Insert success')
    })
})


app.put('/updateUser', (req, res)=>{
    const {email, pass, firstname, lastname, username, id} = req.body
    const parms = [email, pass, firstname, lastname, username, id]
    const query = "UPDATE user SET  email = ?, password=?, firstname=?, lastname=?, username=? WHERE id=?"
    connection.query(query,parms, (err,result)=>{
        if (err) throw err
        res.send('uPdete success')
    })
})

app.delete('/deleUser', (req, res)=>{
    const {id} = req.body
    const parms = [id]
    const query = "DELETE FROM user WHERE id = ?"
    connection.query(query,parms, (err,result)=>{
        if (err) throw err
        res.send('dele success')
    })

})

app.listen(port, ()=> {
    console. log (" App Starting at port 4000")
})