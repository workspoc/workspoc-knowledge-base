import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const categories = [
  ['01', 'Getting Started', 'Learn the platform and configure your organisation.', '/docs/quick-start-guide'],
  ['02', 'Configure workSPOC', 'Set up users, organisation structure and VOC framework.', '/docs/setting-up-your-organisation'],
  ['03', 'Surveys', 'Build, launch and manage customer surveys.', '/docs/creating-your-first-survey'],
  ['04', 'Insights & Analytics', 'Understand responses, trends and customer insights.', '/docs/understanding-survey-insights'],
  ['05', 'Market Intelligence', 'Explore sector journeys, moments that matter and example cases.', '/market-intelligence'],
  ['06', 'Survey Design Assistant', 'Prepare a focused, sector-aware survey brief.', '/survey-design-assistant'],
];

const popular = [
  ['Setting Up Your Organisation', '/docs/setting-up-your-organisation'],
  ['Managing Users', '/docs/managing-users'],
  ['Understanding Pillars, Domains & Practices', '/docs/understanding-pillars-domains-practices'],
  ['Creating Your First Survey', '/docs/creating-your-first-survey'],
  ['Understanding Survey Insights', '/docs/understanding-survey-insights'],
  ['Turning Insights into Actions', '/docs/from-insight-to-action'],
];

const localeCopy = {
  en: {
    eyebrow: 'workSPOC VOICE · KNOWLEDGE BASE', title: 'How can we help you?',
    intro: 'Everything you need to configure, launch, analyse and improve your Voice of Customer programme.',
    search: 'Search articles, sectors and guidance...', empty: 'No matching content. Try a broader phrase.',
    popular: 'POPULAR ARTICLES', essentials: 'Start with the essentials',
    practical: 'Practical guidance for the tasks teams use most.', newUser: 'NEW TO WORKSPOC?',
    cta: 'Go from setup to your first insight.', path: 'Follow a practical, step-by-step path through the platform.',
    button: 'Start with the Quick Start Guide →', browse: 'Browse all help articles', quick: 'Open Quick Start',
  },
  hi: {
    eyebrow: 'workSPOC VOICE · ज्ञान आधार', title: 'हम आपकी कैसे सहायता कर सकते हैं?',
    intro: 'अपने Voice of Customer कार्यक्रम को कॉन्फ़िगर, लॉन्च, विश्लेषित और बेहतर बनाने के लिए आवश्यक सभी मार्गदर्शन।',
    search: 'लेख, सेक्टर और मार्गदर्शन खोजें...', empty: 'कोई संबंधित सामग्री नहीं मिली। कोई व्यापक शब्द आज़माएँ।',
    popular: 'लोकप्रिय लेख', essentials: 'आवश्यक विषयों से शुरुआत करें',
    practical: 'टीमों द्वारा सबसे अधिक उपयोग किए जाने वाले कार्यों के लिए व्यावहारिक मार्गदर्शन।', newUser: 'workSPOC में नए हैं?',
    cta: 'सेटअप से अपनी पहली इनसाइट तक जाएँ।', path: 'प्लेटफ़ॉर्म के लिए एक व्यावहारिक चरण-दर-चरण मार्ग अपनाएँ।',
    button: 'त्वरित शुरुआत मार्गदर्शिका खोलें →', browse: 'सभी सहायता लेख देखें', quick: 'त्वरित शुरुआत खोलें',
  },
  fr: {
    eyebrow: 'workSPOC VOICE · BASE DE CONNAISSANCES', title: 'Comment pouvons-nous vous aider ?',
    intro: 'Tout ce dont vous avez besoin pour configurer, lancer, analyser et améliorer votre programme Voix du Client.',
    search: 'Rechercher des articles, secteurs et guides...', empty: 'Aucun contenu correspondant. Essayez une recherche plus large.',
    popular: 'ARTICLES POPULAIRES', essentials: 'Commencez par l’essentiel',
    practical: 'Des conseils pratiques pour les tâches les plus courantes.', newUser: 'NOUVEAU SUR WORKSPOC ?',
    cta: 'Passez de la configuration à votre premier insight.', path: 'Suivez un parcours pratique, étape par étape, à travers la plateforme.',
    button: 'Ouvrir le guide de démarrage →', browse: 'Voir tous les articles', quick: 'Ouvrir le démarrage rapide',
  },
};

export default function Home() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const copy = localeCopy[currentLocale] || localeCopy.en;
  const [q, setQ] = useState('');
  const [index, setIndex] = useState([]);
  const indexUrl = useBaseUrl('/search-index.json');

  useEffect(() => { fetch(indexUrl).then(r => r.json()).then(setIndex).catch(() => {}); }, [indexUrl]);

  const found = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.map(item => ({
      item,
      score: terms.reduce((n, t) => n + (item.title.toLowerCase().includes(t) ? 5 : 0) + (item.content.toLowerCase().includes(t) ? 1 : 0), 0),
    })).filter(x => x.score).sort((a, b) => b.score - a.score).slice(0, 7).map(x => x.item);
  }, [q, index]);

  return <Layout title="Knowledge Base" description="workSPOC Voice product documentation">
    <main>
      <section className={`${styles.hero} kbHomeHero`}>
        <div className={styles.eyebrow}>{copy.eyebrow}</div>
        <h1>{copy.title}</h1><p>{copy.intro}</p>
        <div className={styles.search}><span>⌕</span><input aria-label="Search help" placeholder={copy.search} value={q} onChange={e => setQ(e.target.value)}/>
          {q && <div className={styles.results}>{found.length ? found.map(a => <Link key={a.url} to={a.url}><div><small>{a.type}</small>{a.title}</div><b>→</b></Link>) : <em>{copy.empty}</em>}</div>}
        </div>
        <div className="kbHeroActions"><Link className="button button--primary button--lg" to="/docs/welcome-to-workspoc">{copy.browse}</Link><Link className="button button--secondary button--lg" to="/docs/quick-start-guide">{copy.quick}</Link></div>
      </section>
      <div className={styles.shell}>
        <section className={styles.categories}>{categories.map(c => <Link className={styles.card} to={c[3]} key={c[1]}><i>{c[0]}</i><div><h2>{c[1]}</h2><p>{c[2]}</p></div><b>→</b></Link>)}</section>
        <section className={styles.popular}><div><span className={styles.label}>{copy.popular}</span><h2>{copy.essentials}</h2><p>{copy.practical}</p></div><div>{popular.map((a, i) => <Link to={a[1]} key={a[0]}><span>0{i + 1}</span>{a[0]}<b>→</b></Link>)}</div></section>
        <section className={styles.cta}><div><span>{copy.newUser}</span><h2>{copy.cta}</h2><p>{copy.path}</p></div><Link className="button button--primary button--lg" to="/docs/quick-start-guide">{copy.button}</Link></section>
      </div>
    </main>
  </Layout>;
}
