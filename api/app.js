import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// For Parsing the data from body to json
app.use(bodyParser.json());
// For Parsing the data from body to urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
// For handling cors error
app.use(cors());

export default app;