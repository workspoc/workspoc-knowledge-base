const config = {
  title: 'workSPOC Voice Knowledge Base',
  tagline: 'Configure, launch, analyse and improve your Voice of Customer programme.',
  favicon: 'img/favicon.svg',
  url: 'https://workspoc-kb.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'fr'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en-GB'},
      hi: {label: 'हिन्दी', htmlLang: 'hi'},
      fr: {label: 'Français', htmlLang: 'fr'},
    },
  },
  presets: [['classic', {
    docs: {sidebarPath: require.resolve('./sidebars.js'), routeBasePath: 'docs'},
    blog: false,
    theme: {customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/branding.css'), require.resolve('./src/css/search-overrides.css'), require.resolve('./src/css/responsive.css')]},
  }]],
  themeConfig: {
    navbar: {
      title: 'Knowledge Base',
      logo: {alt: 'workSPOC Voice', src: 'img/workspoc-logo.webp', width: 176, height: 50},
      items: [
        {type: 'custom-globalSearch', position: 'right'},
        {to: '/market-intelligence', label: 'Market Intelligence', position: 'right'},
        {to: '/survey-design-assistant', label: 'Survey Assistant', position: 'right'},
        {type: 'localeDropdown', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {title: 'Portal', items: [{label: 'Home', to: '/'}, {label: 'Knowledge Base', to: '/docs/welcome-to-workspoc'}, {label: 'Getting Started', to: '/docs/quick-start-guide'}, {label: 'Market Intelligence', to: '/market-intelligence'}, {label: 'Survey Design Assistant', to: '/survey-design-assistant'}]},
        {title: 'Help', items: [{label: 'FAQs', to: '/docs/frequently-asked-questions'}, {label: 'Troubleshooting', to: '/docs/troubleshooting'}, {label: 'Contextual Help Demo', to: '/contextual-help-demo'}]},
        {title: 'Language', items: [{label: 'English', href: 'https://workspoc-kb.netlify.app/', target: '_self'}, {label: 'हिन्दी', href: 'https://workspoc-kb.netlify.app/hi/', target: '_self'}, {label: 'Français', href: 'https://workspoc-kb.netlify.app/fr/', target: '_self'}]},
      ],
      copyright: `© ${new Date().getFullYear()} workSPOC Voice. Internal demonstration.`,
    },
    colorMode: {defaultMode: 'light', disableSwitch: true},
    prism: {theme: require('prism-react-renderer').themes.github},
  },
};
module.exports = config;
