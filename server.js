const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/modules", express.static(path.join(__dirname, "./node_modules")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/views/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application listening at port ${PORT}`);
});
