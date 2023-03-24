const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.listen(3000,()=>{
    console.log(`The Web server on port ${PORT}`);
})

// #config HBS
app.engine('hbs',expressHbs.engine({
    extname:'hbs',
    helpers:{
        increase:(value,option)=>{
            return parseInt(value) + 1;
        }
    }
}));
app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// #routers
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');

app.use('/users',userRouter.router);
app.use('/products',productRouter.router);
app.use('/admins',adminRouter.router);

// app.get('/home',(req,res)=>{

// })

app.get('/',(req,res)=>{
    res.redirect('/admins/sign_in');
})