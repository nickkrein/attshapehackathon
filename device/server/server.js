
let express = require("express");
let app = express();

let bodyParser = require("body-parser");

let statusManager = require("./models/statusModel.js");
let manager = new statusManager.StatusManager;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.disabled("view cache");

let port = process.env.PORT || 8219;

// Routes
//
let router = express.Router();

router.use((request, response, next) => {
  next();
});

router.get("/", (request, response) => {
  response.sendStatus(200);
});


router.route("/errors")
  .put((request, response) => {
    manager.setErrors(request.body);
    let errors = manager.getErrors();
    response.json(errors);
  })

  .get((request, response) => {
    let errors = manager.getErrors();
    response.json(errors);
  });


router.route("/status")
  .put((request, response) => {
    manager.setStatus(request.body);
    let status = manager.getStatus();
    response.json(status);
  })

  .get((request, response) => {
    let status = manager.getStatus();
    response.json(status);
  });



app.use( "/api", router);

app.listen(port);
console.log("Listening at http://127.0.0.1:" + port + "/api");