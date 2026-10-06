# Cake It Easy homepage

The redesigned homepage, built from the design handoff as a plain static site.
There's nothing to install and no build step.

## Files

| File | What it is |
|---|---|
| `index.html` | The page: all the text, links and images |
| `styles.css` | All the styling. Brand colours are at the top under `:root` |
| `script.js` | The Menu button and the two forms (custom-cake inquiry and newsletter) |
| `images/` | Photos converted to WebP at two sizes (`-800` and `-1600`) so they load fast |

## See it

Double-click `index.html` to open it in your browser. To put it online, upload these
files to any static host (GitHub Pages, Netlify, or the current web host).

## Before launch

- [ ] **Shop links:** every "Order", "See all cakes" and "Book a spot" button goes to
      `https://cakeiteasy.ca/shop/` for now. Swap each one for the real WooCommerce
      product page. In `index.html`, search for `cakeiteasy.ca/shop`.
- [ ] **Hours:** confirm the hours for all three locations. The old site shows three
      different versions.
- [ ] **Reviews:** the quotes are paraphrased, so get the client to sign off on the wording.
- [ ] **Kids' class photo:** replace the purple "Kids' decorating class" panel with a photo.
- [ ] **Newsletter:** there's no mailing-list service yet, so "Subscribe" opens an email to
      info@cakeiteasy.ca. To connect Mailchimp or similar, paste its signup URL into
      `NEWSLETTER_ENDPOINT` at the top of `script.js`.
- [ ] **Custom cake inquiry:** this opens the visitor's email app with their details filled in,
      addressed to info@cakeiteasy.ca. That works without a server, but a hosted form
      service would be smoother.
- [ ] **Page title and description:** approve the wording in the `<head>` of `index.html`.

## Undoing changes

Every change is a git commit, so you can always go back:

- See the history: `git log --oneline`
- Undo one commit and keep the history: `git revert <commit-id>`
