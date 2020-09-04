
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
        States.create({ name: 'Hawaii',description:'Mauna Kea The highest point of Hawaii',imageUrl:'maunakea.jpg' }),
        States.create({ name: 'California' ,description:'Yosemite National Park',imageUrl:'yosemmite.jpg' }),
        States.create({ name: 'Utah' ,description:'Arches National Park.This is Delicate arch ',imageUrl:'delicatearch.jpg' }),
        States.create({ name: 'Arizona' ,description:'Monument Valley.',imageUrl:'monumentvalley.jpg' }),
        States.create({ name: 'Montana',description:'Yellowstone National Park.This is Grand Prismatic Spring',imageUrl:'yellowstone.jpg'  }),
        States.create({ name: 'Nevada' ,description:'Las Vegas',imageUrl:'lasvegas.jpg' }),
        States.create({ name: 'New York' ,description:'Manhattan.Park Ave',imageUrl:'newyork.jpg' }),
      ]);

   };

   module.exports={
       models:{
           States,
       },
       syncAndSeed
   }