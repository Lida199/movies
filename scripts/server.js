const express = require("express");
const path = require("path");
const open = require("open");

import webpack from "webpack";
import config from "../webpack.config";

const port = 3000;
const app = express();
app.use(express.static('src'));

// app.use('/images',express.static(path.join(dirname,''..','images')));

const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open("http://localhost:" + port);
    }
});