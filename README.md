# Unpoly Problem: `a[up-accept-location]` Attribute Not Working

This repo documents a problem I am having with [Unpoly](https://unpoly.com) that I am asking for help with.

I cannot replicate the behavior of the "new company" button in the Unpoly demo app on the ["all companies" page](https://demo.unpoly.com/companies).

## Desired Behavior

1. I navigate to the "companies" page.
2. I click on the "add company" button.
3. The "new company" form pops up in a modal.
4. I submit a valid form.
5. The modal is "accepted" (using the terminology of the Unpoly documentation) and goes away. I am returned to the underlying "companies" page, where the "list of companies" is updated. Only the "list of companies" element (an unordered list with ID `#companies-list`), should be updated. The random number in the footer should not change.

All of the above steps except #5 work as desired.

## Actual Behavior

Instead, this is what happens:

Steps 1 through 4 same as above, then I am redirected to the "example company" page.

## Getting Started

Node version: 18

Browser: Chromium 108

Recommended (optional) VSCode extensions for template string syntax highlighting (pick one):

- ["Comment tagged templates" by Matt Bierner](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates) (~16k installs) (preferred)
- ["es6-string-html" by Tobermory](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) (~270k installs)

## Endpoints

This is a very simple demo app. These are all of its endpoints:

| Method | Path           | Purpose                                   |
| ------ | -------------- | ----------------------------------------- |
| GET    | /              | Home                                      |
| GET    | /companies     | Companies list                            |
| POST   | /companies     | Add company                               |
| GET    | /companies/new | Form for adding companies                 |
| GET    | /companies/:id | Individual company (dummy implementation) |

## Modal Launch

The "add company" button (from `views.js`):

```html
<a
  href="/companies/new"
  up-layer="new"
  up-accept-location="/companies/$id"
  up-on-accepted="up.reload('#companies-list'); alert('...');"
>
  <button>+ Add company</button>
</a>
```

**The `[up-accept-location]` attribute doesn't appear to be working.**

## Successful Form Submission

On successful submission, the "new company" form redirects to `/companies/<id>`, where the `<id>` is randomly generated on the fly, and is meant to be a placeholder for demonstration purposes. This can be seen here (from `main.js`):

```js
// Redirect status code 302
res.redirect(`/companies/${views.randomNumber()}`);
```

**This should cause the modal to close, but it doesn't.**

## Manually Reload Companies List

On the "companies" page, there is a button to manually reload the `#companies-list` element. It works. You will notice that the companies list changes while the random number in the footer remains the same. This button's `[onclick]` attribute is the same as the "new company" button's `[up-on-accepted]` attribute.

## Form Validation

Form validation via Unpoly works flawlessly. This is not an issue. From `views.js`:

```html
<form method="post" action="/companies" up-validate>...</form>
```
