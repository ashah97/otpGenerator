import express from 'express';
import http from 'http';
import bodyParser from "body-parser";

import userRouter from './routes/user';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRouter);

app.use((req, res) => {
  res.json({
    status: 404,
    data: "Route does not exist",
  });
});

var httpServer = http.createServer(app);
httpServer.listen(8081, () => {
  console.log(`Example app listening at http://localhost:${8080}`);
});