/**
 * Adapted from https://github.com/janl/mustache.js/blob/master/mustache.js#L71
 * This project should not be considered XSS-proof or secure in any sense!
 */
const escapeHtml = (string) => {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  return String(string ?? "").replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
};
const esc = escapeHtml;

const randomNumber = () => Math.round(Math.random() * 1000);

const base = (children) => /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="https://unpkg.com/unpoly@2.7.2/unpoly.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/unpoly@2.7.2/unpoly.min.css">

  <link rel="stylesheet" href="/styles.css">

  <title>Unpoly Test</title>
</head>
<body>
  <nav>
    <a href="/"><strong>My Website</strong></a>
    <a href="/">Home</a>
    <a href="/companies">Companies</a>
  </nav>
  <main>
    ${children}
  </main>
  <footer>
    <p>Random number: ${randomNumber()}</p>
    <p>(The random numbers are there to help you tell which parts of the page have been updated by <a href="https://unpoly.com">Unpoly</a>. See repo README!)</p>
  </footer>
</body>
</html>
`;

const newCompanyForm = (formErrors, formValues) => /* html */ `
<form method="post" action="/companies" up-validate>
  <h1>New company</h1>

  <label ${formErrors?.companyName ? `class="invalid"` : ""}>
    Company name (required)
    <input
      name="companyName"
      ${formValues?.companyName ? `value="${esc(formValues.companyName)}"` : ""}
      required
      type="text"
    />
    <div class="field-error">Must start with "Acme"</div>
  </label>

  <label ${formErrors?.numOfEmployees ? `class="invalid"` : ""}>
    Number of employees (required)
    <input
      name="numOfEmployees"
      ${
        formValues?.numOfEmployees
          ? `value="${esc(formValues.numOfEmployees)}"`
          : ""
      }
      required
      type="text"
    />
    <div class="field-error">Must be greater than 100</div>
  </label>

  <button type="submit">Submit</button>
</form>
`;

const companies = () => /* html */ `
<h1>Companies</h1>
<p>
  <a
    href="/companies/new"
    up-layer="new"
    up-accept-location="/companies/$id"
    up-on-accepted="up.reload('#companies-list'); alert('Companies list reloaded! (Notice how the random number in the footer did not change.)');"
  >
    <button>+ Add company</button>
  </a>
</p>
<p>List of companies:</p>
<ul id="companies-list">
  <li>${randomNumber()}</li>
  <li>${randomNumber()}</li>
  <li>${randomNumber()}</li>
</ul>
<p>
  Manually reload companies list:
  <button onclick="up.reload('#companies-list'); alert('Companies list reloaded! (Notice how the random number in the footer did not change.)');">Reload</button>
</p>
`;

module.exports = {
  base,
  newCompanyForm,
  companies,
  randomNumber,
};
