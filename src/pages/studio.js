import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './studio.module.css';

const controlItems = [
  ['account', 'Manage Account'], ['org', 'Organisation Setup'], ['catalog', 'Business Catalog'],
  ['queues', 'Queues'], ['contacts', 'Contacts'],
];
const configItems = [
  ['pillars', 'Pillars'], ['domains', 'Domains'], ['practices', 'Practices'], ['headers', 'Headers & Factors'],
  ['lifecycle', 'Lifecycle'], ['classification', 'Contact Classification'], ['categories', 'Question Categories'], ['themes', 'Response Themes'],
];

const libraryData = {
  pillars: [['1', 'Business Alignment & Value Realisation', 'Measures alignment, demand, partners and measurable business outcomes.'], ['2', 'Capability & Operating Model Excellence', 'Measures organisational fitness, skills and ability to execute.'], ['3', 'Modernisation & Future Readiness', 'Measures platforms, innovation and readiness for tomorrow.']],
  domains: [['1', 'Customer Attitude / Mindset', 'Understanding how customer perception influences value.'], ['2', 'Capability & Fit for Purpose', 'Assessing whether services support intended outcomes.'], ['3', 'Customer Engagement', 'Measuring the quality and consistency of interaction.']],
  practices: [['1', 'Project Delivery – Predictable / Reliable', 'Delivery against expectations with transparent communication.'], ['2', 'Proactive Communication', 'Timely, relevant updates before customers need to ask.'], ['3', 'Service Recovery', 'Fast, accountable resolution when expectations are missed.']],
  headers: [['1', 'Relationship', 'Groups questions connected to the overall relationship.'], ['2', 'Delivery', 'Groups questions about delivery quality and reliability.']],
  lifecycle: [['1', 'Align & Shape', 'Define value, goals and stakeholder expectations.'], ['2', 'Plan & Design', 'Translate needs into an actionable service design.'], ['3', 'Build & Deliver', 'Execute delivery and manage change.']],
  classification: [['1', 'Customer', 'Paying customers and service recipients.'], ['2', 'Partner', 'Strategic and delivery partners.'], ['3', 'Employee', 'Internal colleagues and stakeholders.']],
  categories: [['1', 'Accountability', 'Measures ownership and follow-through.'], ['2', 'Adaptability', 'Measures responsiveness to changing priorities.'], ['3', 'Capability Assessment', 'Measures skills, capacity and effectiveness.']],
  themes: [['1', 'A good start', 'A positive opening-stage experience.'], ['2', 'Above average', 'Experience exceeds normal expectations.'], ['3', 'Barrier to success', 'A recurring friction point requiring action.']],
};

const orgTabs = ['Operating Year', 'Division', 'Business Unit', 'Regions', 'Location / Site', 'Department', 'Function', 'Offering'];
const questions = [
  ['Q-101', 'How satisfied are you with the overall experience?', 'Score Based', 'Relationship'],
  ['Q-102', 'How easy was it to complete your recent task?', 'Rating', 'Customer Effort'],
  ['Q-103', 'How likely are you to recommend us?', 'Net Promoter Score', 'Advocacy'],
];

function Field({label, children, wide}) { return <label className={wide ? styles.wide : ''}><span>{label}</span>{children || <input placeholder={`Enter ${label.toLowerCase()}`}/>}</label>; }

function FormActions({onSave}) { return <div className={styles.actions}><button type="button">Cancel</button><button className={styles.primary} type="button" onClick={onSave}>Save</button></div>; }

function AccountScreen({notify}) { return <><ScreenTitle title="Control · Manage Account"/><div className={styles.tabs}><b>Account</b><span>Manage Users</span></div><section className={styles.formGrid}><Field label="Account"><input defaultValue="Porlob"/></Field><Field label="Region"><select><option>South & East Asia</option></select></Field><Field label="Related Industry"><select><option>Information Technology</option></select></Field><Field label="Data Region"><select><option>Australia</option></select></Field><Field label="Notes" wide><textarea defaultValue="Enterprise Voice of Customer programme"/></Field><Field label="Address" wide><input defaultValue="Mumbai, Maharashtra"/></Field><Field label="Country"><select><option>India</option></select></Field><Field label="State"><input defaultValue="Maharashtra"/></Field><Field label="Pincode"><input defaultValue="400601"/></Field></section><FormActions onSave={()=>notify('Account details saved')}/></>; }

function OrgScreen({notify}) { const [tab,setTab]=useState(orgTabs[0]); return <><ScreenTitle title="Configuration · Organisation Setup"/><div className={styles.tabs}>{orgTabs.map(x=><button className={x===tab?styles.activeTab:''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><section className={styles.formGrid}><Field label={tab}><input placeholder={`Enter ${tab.toLowerCase()}`}/></Field><Field label="Start date"><input type="date"/></Field><Field label="End date"><input type="date"/></Field><Field label="Short description" wide><textarea placeholder="Add a concise description"/></Field></section><FormActions onSave={()=>notify(`${tab} saved`)}/><Records title={tab} rows={[[1,`FY 2026 · ${tab}`,'Active'],[2,`FY 2025 · ${tab}`,'Archived']]}/></>; }

function SimpleForm({title, label, notify}) { return <><ScreenTitle title={title}/><section className={styles.formGrid}><Field label={label}><input placeholder={`Enter ${label.toLowerCase()}`}/></Field><Field label="Short description" wide><textarea placeholder="Maximum 500 characters"/></Field></section><FormActions onSave={()=>notify(`${label} saved`)}/><Records title={label} rows={[[1,`${label} example`,'Active'],[2,`${label} secondary`,'Active']]}/></>; }

function Queues({notify}) { return <><ScreenTitle title="Control · Queue / Assignment Group"/><section className={styles.formGrid}><Field label="Queue / Assignment Group"><input placeholder="Enter queue name"/></Field><Field label="Primary owner"><select><option>Select primary owner</option><option>Priya Shah</option></select></Field><Field label="Queue members" wide><input placeholder="Select additional members"/></Field><Field label="Short description" wide><textarea placeholder="Maximum 500 characters"/></Field></section><FormActions onSave={()=>notify('Queue saved')}/><Records title="Queues" rows={[[1,'Customer Experience','Priya Shah'],[2,'Service Recovery','Arun Mehta']]}/></>; }

function Contacts({notify}) { const [tab,setTab]=useState('Entities'); return <><ScreenTitle title="Control · Contacts"/><div className={styles.tabs}>{['Entities','Entity Contacts','Individual Contacts','Contact Upload'].map(x=><button className={x===tab?styles.activeTab:''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><section className={styles.formGrid}><Field label={tab==='Entities'?'Entity':'Contact name'}/><Field label="Contact class"><select><option>Customer</option><option>Partner</option><option>Employee</option></select></Field><Field label="Country"><select><option>India</option><option>Australia</option><option>United Kingdom</option></select></Field><Field label="Short description" wide><textarea/></Field><Field label="Reference number"/><Field label="Region / BU"/></section><FormActions onSave={()=>notify(`${tab} record saved`)}/><Records title={tab} rows={[[1,'Northstar Industries','Customer'],[2,'Apex Digital','Partner'],[3,'Maya Rao','Individual']]}/></>; }

function Library({type}) { const label=configItems.find(x=>x[0]===type)?.[1]||type; const rows=libraryData[type]||[]; const [search,setSearch]=useState(''); const visible=rows.filter(r=>r.join(' ').toLowerCase().includes(search.toLowerCase())); return <><ScreenTitle title={`Configuration · ${label}`}/><div className={styles.tabs}><b>System Library</b><span>My Workspace</span></div><div className={styles.filter}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${label.toLowerCase()}...`}/><button onClick={()=>setSearch('')}>Reset</button></div><Records title={label} rows={visible}/></>; }

function QuestionLibrary({templates=false}) { const [search,setSearch]=useState(''); const rows=templates?[['1','Team Culture','Team Effectiveness & Behaviour','1'],['2','Customer Experience','Relationship Health','8']]:questions; const visible=rows.filter(r=>r.join(' ').toLowerCase().includes(search.toLowerCase())); return <><ScreenTitle title="Surveys · Question Library"/><div className={styles.tabs}><b>{templates?'Topic Templates':'Question Repository'}</b><span>{templates?'Question Repository':'Topic Templates'}</span></div><div className={styles.filterPanel}><div><b>Filters</b><small>{templates?'Reusable survey structures':'Question type · Practice · Header · Factor'}</small></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={templates?'Search topics...':'Search questions...'}/><button onClick={()=>setSearch('')}>Reset</button></div><Records title={templates?'Topic Templates':'Questions'} rows={visible}/></>; }

const dashboardBars=[['IT support',82],['Workplace tools',76],['Business apps',71],['Data & reporting',68],['Cybersecurity',64],['Change delivery',59]];
const insightCards=[['High','Service desk handoffs increase effort','Employees who contact more than one support group report 24% lower effort scores.','Service Desk','Reduce handoffs'],['High','Change communication arrives too late','Project stakeholders cite limited notice as the strongest driver of dissatisfaction.','Change Enablement','Improve release communication'],['Medium','Self-service is trusted but hard to find','Knowledge usefulness scores well, while findability trails by 14 points.','Digital Workplace','Improve knowledge discovery']];
const initialActions=[{id:'A-104',title:'Introduce single-owner service recovery',owner:'Priya Shah',due:'28 Aug',status:'In progress',metric:'Effort +8 pts'},{id:'A-105',title:'Launch 14-day change communication standard',owner:'Arun Mehta',due:'05 Sep',status:'Planned',metric:'Clarity +10 pts'},{id:'A-106',title:'Redesign knowledge search taxonomy',owner:'Maya Rao',due:'12 Sep',status:'At risk',metric:'Findability +12 pts'}];

function Dashboard(){const[period,setPeriod]=useState('Last 90 days'),[stage,setStage]=useState('analytics'),[actions,setActions]=useState(initialActions);const complete=id=>setActions(items=>items.map(a=>a.id===id?{...a,status:'Completed'}:a));return <><ScreenTitle title="ITXi VOC Dashboard · Analytics to Insights to Actions"/><div className={styles.dashboardControls}><div className={styles.pipeline}>{[['analytics','1','Analytics'],['insights','2','Insights'],['actions','3','Actions']].map(([id,n,label])=><button className={stage===id?styles.pipelineActive:''} onClick={()=>setStage(id)} key={id}><b>{n}</b><span>{label}</span></button>)}</div><select value={period} onChange={e=>setPeriod(e.target.value)} aria-label="Dashboard period"><option>Last 30 days</option><option>Last 90 days</option><option>Year to date</option></select></div><section className={styles.dashboardIntro}><div><span>ITXi · INTERNAL CUSTOMER EXPERIENCE</span><h2>Technology experience at a glance</h2><p>{period} · 1,284 responses · 72% response confidence</p></div><div className={styles.health}><b>74</b><span>Experience health</span><small>↑ 4 pts vs prior period</small></div></section><section className={styles.kpis}>{[['+31','IT NPS','↑ 6'],['76','CSAT','↑ 3'],['68','Customer effort','↓ 2'],['71%','First contact resolution','↑ 5%'],['3.8h','Mean time to resolve','↓ 42m'],['64%','Digital adoption','↑ 8%']].map(([v,l,d])=><article key={l}><span>{l}</span><b>{v}</b><small>{d}</small></article>)}</section><section className={styles.analyticsGrid}><article className={styles.chartCard}><header><div><span>EXPERIENCE BY SERVICE</span><h3>Where ITXi performs—and where friction remains</h3></div><b>Target 75</b></header><div className={styles.barChart}>{dashboardBars.map(([name,value])=><div key={name}><span>{name}</span><div><i style={{width:`${value}%`}}/><em style={{left:'75%'}}/></div><b>{value}</b></div>)}</div></article><article className={styles.driverCard}><span>KEY DRIVERS</span><h3>What shapes advocacy</h3>{[['Resolution ownership','+18'],['Proactive communication','+14'],['Ease of access','+11'],['Tool reliability','+9']].map(([n,v],i)=><div key={n}><b>{i+1}</b><span>{n}</span><strong>{v}</strong></div>)}</article></section><section className={styles.sectionHeading}><div><span>02 · INSIGHTS</span><h2>Evidence translated into priorities</h2></div><button onClick={()=>setStage('insights')}>Review all insights</button></section><section className={styles.insightGrid}>{insightCards.map(([priority,title,body,team,action])=><article key={title}><div><span className={priority==='High'?styles.high:styles.medium}>{priority}</span><small>{team}</small></div><h3>{title}</h3><p>{body}</p><button onClick={()=>setStage('actions')}>Create action · {action} →</button></article>)}</section><section className={styles.sectionHeading}><div><span>03 · ACTIONS</span><h2>Improvements with owners and outcomes</h2></div><b>2 on track · 1 at risk</b></section><section className={styles.actionList}>{actions.map(a=><article key={a.id}><div className={styles.actionId}>{a.id}</div><div><h3>{a.title}</h3><p>{a.owner} · Due {a.due}</p></div><div><span className={`${styles.actionStatus} ${a.status==='At risk'?styles.risk:''}`}>{a.status}</span><small>{a.metric}</small></div><button disabled={a.status==='Completed'} onClick={()=>complete(a.id)}>{a.status==='Completed'?'Completed ✓':'Mark complete'}</button></article>)}</section></>}

function Records({title, rows}) { return <section className={styles.records}><div className={styles.recordsHead}><div><b>{title}</b><small>{rows.length} records</small></div><button>＋ Add new</button></div><div className={styles.tableWrap}><table><thead><tr><th>Row ID</th><th>Name</th><th>Description / Type</th><th>Status</th></tr></thead><tbody>{rows.map((r,i)=><tr key={`${r[0]}-${i}`}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span className={styles.status}>{r[3]||'Active'}</span></td></tr>)}</tbody></table></div></section>; }

function ScreenTitle({title}) { return <header className={styles.screenTitle}><span>ⓘ</span><h1>{title}</h1><div>ITXi · DX Professional <i/> Trial · 30 days <i/> AU</div></header>; }

function NavGroup({title,icon,items,screen,setScreen}) { return <section className={styles.navGroup}><h3><span>{icon}</span>{title}</h3>{items.map(([id,label])=><button className={screen===id?styles.current:''} onClick={()=>setScreen(id)} key={id}>{label}</button>)}</section>; }

export default function Studio(){
  const [screen,setScreen]=useState('dashboard'),[menu,setMenu]=useState(false),[toast,setToast]=useState('');
  const notify=msg=>{setToast(msg);setTimeout(()=>setToast(''),1800)};
  const select=id=>{setScreen(id);setMenu(false)};
  const content=useMemo(()=>{
    if(screen==='dashboard')return <Dashboard/>;
    if(screen==='account')return <AccountScreen notify={notify}/>;
    if(screen==='org')return <OrgScreen notify={notify}/>;
    if(screen==='catalog')return <SimpleForm title="Configuration · Business Catalog" label="Catalog item" notify={notify}/>;
    if(screen==='queues')return <Queues notify={notify}/>;
    if(screen==='contacts')return <Contacts notify={notify}/>;
    if(configItems.some(x=>x[0]===screen))return <Library type={screen}/>;
    if(screen==='questions')return <QuestionLibrary/>;
    if(screen==='templates')return <QuestionLibrary templates/>;
    return <Library type="pillars"/>;
  },[screen]);
  return <Layout title="workSPOC Studio" description="Interactive workSPOC Voice product prototype" noFooter>
    <main className={styles.app}>
      <button className={styles.mobileToggle} onClick={()=>setMenu(true)} aria-label="Open workSPOC navigation">☰</button>
      {menu&&<button className={styles.scrim} onClick={()=>setMenu(false)} aria-label="Close navigation"/>}
      <aside className={`${styles.sidebar} ${menu?styles.open:''}`}>
        <div className={styles.brand}><img src="/img/workspoc-logo.webp" alt="workSPOC Voice"/><button onClick={()=>setMenu(false)}>×</button></div>
        <button className={`${styles.home} ${screen==='dashboard'?styles.current:''}`} onClick={()=>select('dashboard')}>⌂ <span>Dashboard</span></button>
        <NavGroup title="Control" icon="⚙" items={controlItems} screen={screen} setScreen={select}/>
        <NavGroup title="Config" icon="⌘" items={configItems} screen={screen} setScreen={select}/>
        <NavGroup title="Surveys" icon="▣" items={[["questions","Question Repository"],["templates","Topic Templates"]]} screen={screen} setScreen={select}/>
        <div className={styles.future}><button onClick={()=>select('dashboard')}>⚡ Actions</button><button onClick={()=>select('dashboard')}>▥ Insights</button><span>▣ Project Central</span><span>◉ Notifications</span></div>
        <Link to="/">? Knowledge Base</Link>
      </aside>
      <section className={styles.workspace}>
        <header className={styles.topbar}><div className={styles.kbSearch}>⌕ <span>Search workSPOC Knowledge Base</span></div><b>▦ Porlob</b><span>⚙ Customer Portal</span></header>
        <div className={styles.content}>{content}</div>
      </section>
      {toast&&<div className={styles.toast}>✓ {toast}</div>}
    </main>
  </Layout>;
}
