const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./server/routes/authRoutes');
const path = require('path')

dotenv.config()


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

//Connection to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Connected to MongoDB'))
.catch((error)=> console.error("Error connected to MongoDB:", error))


app.use('/api/auth', authRoutes);

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'register.html'))

})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'))

})

app.get('/', (req, res) => {
    res.send('Fitness App Backend is Running')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})