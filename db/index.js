
const Sequelize=require('sequelize');
const {STRING}=Sequelize;
const connect =new Sequelize(process.env.DATABASE_URL||'postgres://localhost/homework3_db')

const States=connect.define('states',{
    name: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: STRING,
        allowNull: false,
      },
      imageUrl: {
        type: STRING,
      },
    });
  
   const syncAndSeed=async()=>{
    await connect.sync({ force: true });
    const [ hawaii, california, utah ,arizona,montana,nevada,newyork] = await Promise.all([
        States.create({ name: 'Hawaii',description:'Mauna Kea',imageUrl:'kylo.png' }),
        States.create({ name: 'California' ,description:'Mauna Kea',imageUrl:'kylo.png' }),
        States.create({ name: 'Utah' ,description:'Mauna Kea',imageUrl:'kylo.png' }),
        States.create({ name: 'Arizona' ,description:'Mauna Kea',imageUrl:'kylo.png' }),
        States.create({ name: 'Montana',description:'Mauna Kea',imageUrl:'kylo.png'  }),
        States.create({ name: 'Nevada' ,description:'Mauna Kea',imageUrl:'kylo.png' }),
        States.create({ name: 'New York' ,description:'Mauna Kea',imageUrl:'kylo.png' }),
      ]);

   };

   module.exports={
       models:{
           States,
       },
       syncAndSeed
   }