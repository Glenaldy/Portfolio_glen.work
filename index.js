const e = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const work = require("./work");

// let work_list = require("./works-data.json");
// let title_list = [];
// for (let key in work_list) {
//   title_list.push(work_list[key]["title"]);
// }

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public/"));

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
    res.redirect("/");
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
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
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
