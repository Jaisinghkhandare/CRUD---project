const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

const User = require("./public/db/connect");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));   

app.get('/profile', (req ,res )=>
{
    res.sendFile(path.join(__dirname, 'public','profile.html'));
}) 

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'public','home','home.html'))
})

 app.post('/register',(req,res)=>
{
    console.log(req.body);
    const { username, password } = req.body;

    //res.json({status:"succesfully registered"});
    try {
        const user = new User({ username, password });
         user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
});


app.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    console.log({username});

    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (user) {
            if(user.password === password){
            const token = jwt.sign(username, 'your_jwt_secret');
            res.json({ message: 'Login successful', token });}

        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});



app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});









