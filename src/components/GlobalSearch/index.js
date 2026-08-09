import React,{useEffect,useMemo,useRef,useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function GlobalSearch(){
  const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[index,setIndex]=useState([]);
  const input=useRef(null),indexUrl=useBaseUrl('/search-index.json');
  useEffect(()=>{fetch(indexUrl).then(r=>r.json()).then(setIndex).catch(()=>setIndex([]))},[indexUrl]);
  useEffect(()=>{if(open)setTimeout(()=>input.current?.focus(),20)},[open]);
  useEffect(()=>{const onKey=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(true)}if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
  const results=useMemo(()=>{const terms=query.toLowerCase().trim().split(/\s+/).filter(Boolean);if(!terms.length)return index.slice(0,6);return index.map(item=>({item,score:terms.reduce((n,t)=>n+(item.title.toLowerCase().includes(t)?5:0)+(item.content.toLowerCase().includes(t)?1:0),0)})).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,8).map(x=>x.item)},[index,query]);
  return <><button className={styles.trigger} onClick={()=>setOpen(true)} aria-label="Search Knowledge Base"><span>⌕</span><em>Search</em><kbd>Ctrl K</kbd></button>{open&&<div className={styles.overlay} onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}><section className={styles.dialog} role="dialog" aria-modal="true" aria-label="Search Knowledge Base"><div className={styles.inputRow}><span>⌕</span><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search articles, sectors and guidance…"/><button onClick={()=>setOpen(false)}>Esc</button></div><div className={styles.list}>{results.length?results.map(item=><Link to={item.url} key={item.url} onClick={()=>setOpen(false)}><small>{item.type}</small><strong>{item.title}</strong><p>{item.excerpt}</p><b>→</b></Link>):<div className={styles.empty}>No results found. Try a broader phrase.</div>}</div><footer>Searches approved workSPOC content · Use ↑ ↓ to browse</footer></section></div>}</>;
}
