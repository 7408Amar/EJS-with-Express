const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let newlistisItems = []; // Example item list

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let fixdate = today.toLocaleDateString("en-US", options);
    res.render("index", { fixdate: fixdate, newlistisItems: newlistisItems });
});

app.post("/", (req, res) => {
    let newItem = req.body.newItem;
    newlistisItems.push(newItem);
    res.redirect("/");
});

app.delete("/delete/:index", (req, res) => {
    const index = req.params.index;
    if (index > -1) {
        newlistisItems.splice(index, 1);
    }
    res.json({ success: true });
});

app.delete("/clear", (req, res) => {
    newlistisItems = [];
    res.json({ success: true });
});

app.listen(4000, function() {
    console.log('Server is running on port 4000');
});
