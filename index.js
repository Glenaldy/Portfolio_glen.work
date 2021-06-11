const e = require("express");
const express = require("express");
const exphbs = require("express-handlebars");
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

app.get("/", function (req, res) {
  let work_list = require("./works-data.json");
  res.render("home", { title: "Glenaldy", work_list: work_list });
});
app.get("/about", function (req, res) {
  res.render("about", { title: "About Me" });
});
app.get("/works", function (req, res) {
  let work_list = require("./works-data.json");
  res.render("works", {
    title: "My Works",
    work_list: work_list,
  });
});
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
