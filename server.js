const express=require('express');
const path=require('path');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const db =require('./db');
const {States}=db.models
const app=express();


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/dist',express.static(path.join(__dirname,'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/states',async(req,res,next)=>{
    try{
       res.send(await States.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.get('/api/states/:stateId',async (req,res,next)=>{
  try{
    const state =await States.findByPk(req.params.stateId);
    res.json(state)
  }
  catch (err){
    next(err)
  }
})

const init = async()=> {
    try {
      await db.syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };
  
  init();