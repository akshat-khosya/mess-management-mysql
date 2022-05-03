const express = require("express");
const bodyParser=require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db=require("./models/index");
const app = express();

dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require("./database/connection"); 
app.get("/",async(req,res)=>{

  res.send("Sql backend");
})
// // routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");

// //routes use
app.use("/api/admin", admin);
app.use("/api/auth", auth);
app.listen(process.env.PORT, () => {
    console.log("Server started at port " + process.env.PORT);
  });
  