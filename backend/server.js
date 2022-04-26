const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://suman:suman@cluster0.l6wwf.mongodb.net/formData",
    { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", require("./routes/formRoute"));

app.listen(port, () => {
    console.log('Backend server is running on port ' + port);
})