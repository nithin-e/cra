// src/index.ts
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './route/routes'; // Ensure the path is correct

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.use("/", router); 
const MONGOURL = "mongodb://127.0.0.1:27017";

mongoose
  .connect(MONGOURL, {
    dbName: "crud-using-ts",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("mongoose connection error", err);
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
