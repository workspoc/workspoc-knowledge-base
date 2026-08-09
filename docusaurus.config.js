const config = {
  title: 'workSPOC Voice Knowledge Base',
  tagline: 'Configure, launch, analyse and improve your Voice of Customer programme.',
  favicon: 'img/favicon.svg', url: 'https://help.workspoc.example', baseUrl: '/',
  onBrokenLinks: 'throw', onBrokenMarkdownLinks: 'warn',
  presets: [['classic', {
    docs: {sidebarPath: require.resolve('./sidebars.js'), routeBasePath: 'docs'},
    blog: false,
    theme: {customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/branding.css')]},
  }]],
  themeConfig: {
    navbar: {
      title: 'Knowledge Base',
      logo: {alt: 'workSPOC Voice', src: 'img/workspoc-logo.webp', width: 176, height: 50},
      items: [
        {to: '/docs/quick-start-guide', label: 'Quick Start', position: 'right'},
        {to: '/docs/contact-support', label: 'Support', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {title: 'Explore', items: [{label: 'Getting Started', to: '/docs/quick-start-guide'}, {label: 'Surveys', to: '/docs/creating-your-first-survey'}, {label: 'Insights', to: '/docs/understanding-survey-insights'}]},
        {title: 'Help', items: [{label: 'FAQs', to: '/docs/frequently-asked-questions'}, {label: 'Troubleshooting', to: '/docs/troubleshooting'}, {label: 'Contextual Help Demo', to: '/contextual-help-demo'}]},
      ],
      copyright: `© ${new Date().getFullYear()} workSPOC Voice. Internal demonstration.`,
    },
    colorMode: {defaultMode: 'light', disableSwitch: true},
    prism: {theme: require('prism-react-renderer').themes.github},
  },
};
module.exports = config;
