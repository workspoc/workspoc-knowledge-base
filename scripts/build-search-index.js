const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');

function cleanMarkdown(value) {
  return value
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[#>*_`|\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleOf(raw, fallback) {
  const frontmatter = raw.match(/^---[\s\S]*?\ntitle:\s*['"]?([^\n'"]+)['"]?[\s\S]*?---/);
  const heading = raw.match(/^#\s+(.+)$/m);
  return (frontmatter?.[1] || heading?.[1] || fallback).trim();
}

const docs = fs.readdirSync(docsDir)
  .filter(file => /\.mdx?$/.test(file))
  .map(file => {
    const raw = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const slug = file.replace(/\.mdx?$/, '');
    const content = cleanMarkdown(raw);
    return {title: titleOf(raw, slug), url: `/docs/${slug}`, type: 'Article', excerpt: content.slice(0, 240), content};
  });

const sectors = [
  ['Banking & Financial Services', 'banking-financial-services', 'Account opening, everyday banking, lending, service recovery and relationship growth.'],
  ['Healthcare', 'healthcare', 'Access, consultation, treatment, discharge, follow-up and continuity of care.'],
  ['Manufacturing', 'manufacturing', 'Discovery, specification, ordering, delivery, commissioning and lifecycle service.'],
  ['Retail & E-commerce', 'retail-ecommerce', 'Discovery, purchase, fulfilment, returns, support and loyalty.'],
  ['Technology & SaaS', 'technology-saas', 'Evaluation, onboarding, adoption, support, renewal and advocacy.'],
].map(([title, slug, excerpt]) => ({title, url: `/market-intelligence/${slug}`, type: 'Sector intelligence', excerpt, content: `${title} ${excerpt}`}));

const features = [
  {title: 'Market Intelligence', url: '/market-intelligence', type: 'Feature', excerpt: 'Sector-specific customer journeys, moments that matter and illustrative Voice of Customer programmes.', content: 'sector market intelligence customer journey examples'},
  {title: 'Survey Design Assistant', url: '/survey-design-assistant', type: 'Feature', excerpt: 'Create a structured survey brief using your objective, audience, sector and lifecycle stage.', content: 'survey design questions respondents invitation distribution insights'},
];

fs.writeFileSync(path.join(root, 'static', 'search-index.json'), JSON.stringify([...docs, ...sectors, ...features]));
console.log(`Search index created with ${docs.length + sectors.length + features.length} entries.`);
