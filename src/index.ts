import express from 'express';
import bodyParser from 'body-parser';
import { startServer } from './base/base';
import {router} from "./routes/v1/router";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

startServer(app);


app.use('/api/v1', router);