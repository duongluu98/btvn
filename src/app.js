const express = require("express");
const expressLayouts = require("express-ejs-layouts");
var morgan = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");
const cookiesParse = require("cookie-parser");
const routerWeb = require("./routes/web");
const routerApi = require("./routes/api");
const authMiddleware = require("./middlewares/auth.middleware");
const validateMiddleware = require("./middlewares/validate.middleware");
const session = require("express-session");
const flash = require("connect-flash");
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
//log file
app.use(
  morgan("common", {
    stream: fs.createWriteStream(__dirname + "/logs/access.log", {
      flags: "a",
    }),
  })
);

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookiesParse()); //xu li cookies
app.use(
  session({
    secret: "f8",
    resave: false,
    saveUninitialized: true,
    name: "f8-session",
  })
);

app.use(flash());

//view
app.set("view engine", "ejs"); // setup engine
app.set("views", __dirname + "/views"); // setup duong daaxn
//
app.use(expressLayouts);
// dang urlencoded va json()
app.use(express.urlencoded({ extended: true })); //applli cation/x-www...
app.use(express.json()); // aplication/json
////
// đăng kí middleware
// app.use(authMiddleware)
app.use(validateMiddleware);
app.use(routerWeb);
app.use("/api", routerApi);

//app.ten_method(path, handler)
//method: get, post, put, patch, delete
// app.get('/', (req, res) => {
//     res.send('<h1>Trang chu</h1>')
// })

// app.get('/gioi-thieu', (req, res) => {
//     res.send('<h1>Gioi thieu</h1>')
// })

//xử lí lỗi 404
app.use((req, res, next) => {
  res.status(404);
  if (process.env.NODE_ENV === "production") {
    return res.render("errors/error-prod", {
      error: { status: 404 },
      layout: false,
    });
  }
  res.render("errors/error-dev", {
    error: "Không tìm thấy trang",
    layout: false,
  });
});

//xu li loi maw dinh
app.use((err, req, res, next) => {
  res.status(500);
  if (process.env.NODE_ENV === "production") {
    return res.render("errors/error-prod", {
      error: { status: 500 },
      layout: false,
    });
  }
  res.render("errors/error", { error: err, layout: false });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
