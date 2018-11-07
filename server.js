const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
var bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes/burgersController.js")(app);
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});