import express from "express";
import mangaRoutes from "./routes/manga";
import { connect } from "mongoose";
import volumeBuilderRoutes from "./routes/volume-builder";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use("/manga", mangaRoutes);
app.use("/volume-builder", volumeBuilderRoutes);


connect("mongodb://db:27017/mangatokindle")
  .then(() => {
    app.listen(8000);
    console.log('App started successfully!')
  })
  .catch((err) => console.log('could not connect to database \n', err))

