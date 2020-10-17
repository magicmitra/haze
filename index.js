const express = require('express');
const path = require('path');
const cors = require('cors');
const dmaRouter = require('./routes/dma');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use('/', dmaRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));