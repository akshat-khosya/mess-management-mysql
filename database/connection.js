const Sequelize=require("sequelize");
const sequelize=new Sequelize("messmanagement","root","Akshat12@",{host:'127.0.0.1', dialect:"mysql",operatorsAlises:false});
module.exports=sequelize;
global.sequelizs=sequelize;