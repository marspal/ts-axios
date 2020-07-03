const express = require("express");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

const app = express();
const router = express.Router()
const cors = {
  "Access-Control-Allow-Origin": "http://localhost:8080",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": 'Content-Type'
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
// Allow-Methods 注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求
router.post("/more/server2", function(req, res){
  res.set(cors);
  res.json(req.cookies)
})

router.options("/more/server2", function(req, res){
  res.set(cors);
  res.end();
})

app.use(router)
const port = 8088
module.export = app.listen(port)
