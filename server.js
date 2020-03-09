var express = require('express');
var app = express();
var connectDB = require('./config/db');

connectDB();

app.get('/', (req,res)=>{
    console.log('API running');
    
});

app.use(express.json({extended: false}))
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));



var port = process.env.port || 3000
app.listen(port, ()=>{
    console.log('Server running on port'+port);
    
})