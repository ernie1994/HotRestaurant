var express = require("express");
var path = require("path");

var app = express();


var PORT = 3001;
var reservations = [];
var waitlist = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "home.html"));
});

app.get("/view", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "view.html"));
});

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "make.html"));
});

app.post("/api/reserve", (req, res) => {
    var reservation = req.body;
    var reserved;
    if (reservations.length === 5) {
        waitlist.push(reservation);
        reserved = false;
    } else {
        reservations.push(reservation);
        reserved = true;
    }
    res.send({ reserved: reserved });
});

app.get("/api/view", (req, res) => {
    var obj = {
        reservations: reservations,
        waitlist: waitlist
    }
    res.send(obj);
});


app.listen(PORT, () => {
    console.log("Listening at PORT " + PORT);
});