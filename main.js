const express = require("express");
const bodyParser = require("body-parser");
const views = require("./views");

const app = express();

app.use("/", express.static("static"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} request on path ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  const main = /* html */ `<h1>Dashboard</h1><p>Nothing to see&hellip;</p>`;
  res.status(200).type("html").send(views.base(main));
});

app.get("/companies/new", (req, res) => {
  res.status(200).type("html").send(views.base(views.newCompanyForm()));
});

app
  .route("/companies")
  .get((req, res) => {
    res.status(200).type("html").send(views.base(views.companies()));
  })
  .post((req, res) => {
    console.log("Form submission:", JSON.stringify(req.body));
    const { companyName, numOfEmployees } = req.body;

    // Validate inputs
    const formErrors = {
      // True on invalid input (error present), false on valid input (no error)
      companyName: !(
        typeof companyName === "string" && companyName?.startsWith("Acme")
      ),
      numOfEmployees: !(
        isFinite(numOfEmployees) && Number(numOfEmployees) > 100
      ),
    };
    console.log("Form validation errors:", JSON.stringify(formErrors));

    // If there are any validation errors, or if the request was triggered by Unpoly for form validation
    if (
      formErrors.companyName ||
      formErrors.numOfEmployees ||
      req.get("X-Up-Validate")
    ) {
      // Re-render the form with error messages
      res
        .status(400)
        .type("html")
        .send(views.base(views.newCompanyForm(formErrors, req.body)));
    } else {
      // Otherwise redirect to the page for the newly-created company (not actually)
      res.redirect(`/companies/${views.randomNumber()}`);
    }
  });

app.get("/companies/:id", (req, res) => {
  const main = /* html */ `
    <h1>Example Company</h1>
    <p><strong>Company id:</strong> ${req.params.id}</p>
    <p>Company details&hellip;</p>
  `;
  res.status(200).type("html").send(views.base(main));
});

// 404 catch-all
app.get("*", (req, res) => {
  const main = /* html */ `<h1>Page Not Found</h1><p>404 error</p>`;
  res.status(404).type("html").send(views.base(main));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
