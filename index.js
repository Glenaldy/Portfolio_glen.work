const express = require("express");
const exphbs = require("express-handlebars");

//Google Analytics

//Nodemailer for contacts
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const work = require("./work");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public/"));

//Force HTTPS
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}
//DEFAULT ROUTE
app.get("/", function (req, res) {
  let work_list = require("./works-data.json");
  res.render("home", { title: "Glenaldy | @ glen.work", work_list: work_list });
});

//ABOUT ROUTE
app.get("/about", function (req, res) {
  res.render("about", { title: "About Me" });
});

//WORKS ROUTE
app.get("/works", function (req, res) {
  let work_list = require("./works-data.json");
  res.render("works", {
    title: "My Works",
    work_list: work_list,
  });
});

//ABOUT ROUTE
app.get("/work-details/:project", function (req, res) {
  let work_list = require("./works-data.json");
  const projectName = req.params.project;
  let found = false;
  for (let key in work_list) {
    if (key == projectName) {
      found = true;
      break;
    }
  }
  if (found) {
    console.log("redirecting....");
    let imageDir = work.getData(
      "./public/assets/Works/" + projectName,
      "image"
    );
    let project_details = "works/" + projectName; //address for the variable inside handlebar
    let data = work_list[projectName];
    res.render("work-details", {
      title: data.title + " | Works by Glenaldy",
      projectName: projectName,
      imageDir: imageDir,
      data: data,
      project_details: project_details,
      work_list: work_list,
    });
  } else {
    res.status(404).render("error");
  }
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    title: "Contact Me",
  });
});

//FORM//
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.redirect(500, "*");
      } else {
        let confirmation = "Sent, thank you for reaching out";
        res.render("contact", {
          title: "Contact Me",
          confirmation: confirmation,
        });
      }
    });
  });
});
//ERROR HANDLING
app.get("*", function (req, res) {
  res.status(404).render("error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
