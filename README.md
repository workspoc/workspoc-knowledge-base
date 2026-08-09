# workSPOC Voice Knowledge Base demo

A standalone Docusaurus prototype for an internal demonstration of the future workSPOC Voice help centre. It includes a polished homepage, full documentation hierarchy, realistic core articles, local homepage search and an interactive contextual-help concept. It intentionally has no authentication, database or product integration.

## Start locally

```bash
npm install
npm run start
```

Open `http://localhost:3000`. Create a production build with `npm run build`; preview it with `npm run serve`.

## Content and navigation

Articles live in `docs/` as Markdown or MDX. To add one, create a file with front matter and a title, then add its document ID to `sidebars.js` in the appropriate category. The homepage and contextual-help demo live in `src/pages/`; visual styling is in `src/css/custom.css` and page-level CSS modules.

## Future integration

The same content could later be hosted centrally and opened from workSPOC routes with page-specific article IDs. The Contextual Help Demo shows a right-side drawer that could use those IDs to surface screen guidance and link to the full article. Production search could use Algolia DocSearch or an approved internal search provider.

## Content administration

The deployed site includes a Decap CMS editor at `/admin/`. Approved GitHub collaborators can sign in, edit existing Markdown articles, save drafts and publish through the editorial workflow. Publishing creates a repository change and triggers Netlify's automatic build. Article creation and sidebar changes remain developer-controlled in this initial version.
