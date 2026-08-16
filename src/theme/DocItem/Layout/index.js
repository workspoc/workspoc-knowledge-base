import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import styles from './styles.module.css';

const routineHelp = [
  ['ⓘ', 'Info', '/docs/welcome-to-workspoc'],
  ['☵', 'FAQs', '/docs/frequently-asked-questions'],
  ['✦', 'Setup', '/docs/first-time-setup-checklist'],
  ['?', 'Help', '/docs/contact-support'],
];

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  return {
    hidden,
    mobile: canRender ? <DocItemTOCMobile /> : undefined,
    desktop: canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined,
  };
}

function HelpRail({toc}) {
  return <aside className={styles.helpRail} aria-label="Knowledge Base shortcuts">
    {routineHelp.map(([icon,label,to])=><Link className={styles.railShortcut} to={to} key={to}><i>{icon}</i><span>{label}</span></Link>)}
  </aside>;
}

export default function DocItemLayout({children}) {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  return <div className={clsx('row', styles.docRow)}>
    <div className={clsx('col', styles.docItemCol)}>
      <ContentVisibility metadata={metadata}/><DocVersionBanner/>
      <div className={styles.docItemContainer}><article><DocBreadcrumbs/><div className={styles.articleTools}><span>Knowledge article</span><div><span>Was this helpful?</span><button aria-label="Helpful">♧</button><button aria-label="Not helpful">♤</button><Link to="/docs/contact-support">Send feedback</Link></div></div><DocVersionBadge/>{docTOC.mobile}{docTOC.desktop&&<section className={styles.pageToc}><span>On this page</span>{docTOC.desktop}</section>}<DocItemContent>{children}</DocItemContent><DocItemFooter/></article><DocItemPaginator/></div>
    </div>
    <div className={clsx('col col--3', styles.rightCol)}><HelpRail toc={docTOC.desktop}/></div>
  </div>;
}
