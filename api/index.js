const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors')
const helmet = require('helmet');
const fileUpload = require('express-fileupload')
const path = require('path')

app.use(express.json());
app.use(cors())
app.set('trust proxy', 1);
app.use(helmet({
  xFrameOptions: false,
}));
app.use("/upload", express.static(path.join(__dirname, "public/uploads")));


const uploadRoute = require('./routes/uploadFile')
const authRoute = require('./routes/auth')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log("DB connection Successfull") })
  .then(() => app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is runnig")
  }))
  .catch((err) => { console.log(err) });

app.get("/", (req,res)=>{
  res.send("Welcome to cu fileUpload")
})

app.use("/api/files", uploadRoute)
app.use("/api/auth",authRoute)

