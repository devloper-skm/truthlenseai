import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ShieldCheck, LayoutDashboard, ScanLine, History, BookOpen, PanelLeft, ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WebsiteFooter } from './footer';
const nav = [ { to:'/' as const,label:'Overview',icon:LayoutDashboard }, { to:'/verify' as const,label:'Verify content',icon:ScanLine }, { to:'/history' as const,label:'Verification history',icon:History }, { to:'/about' as const,label:'About TruthLens',icon:BookOpen } ];
export function Brand() { return <span className="brand"><span className="brand-mark"><ShieldCheck size={23}/></span><span className="sidebar-label">TruthLens <span className="brand-ai">AI</span></span></span>; }
export function AppShell({children}:{children:ReactNode}) {
 const path=useRouterState({select:s=>s.location.pathname});
 const [collapsed,setCollapsed]=useState(false); const [mobile,setMobile]=useState(false);
 if(path==='/welcome') return <>{children}</>;
 const title=nav.find(n=>n.to===path)?.label ?? 'Verification results';
 return <div className={`${collapsed?'sidebar-collapsed':''} ${mobile?'mobile-open':''}`}>
 {mobile&&<div className="mobile-scrim" onClick={()=>setMobile(false)}/>}
 <aside className="app-sidebar"><Link to="/" aria-label="TruthLens AI home"><Brand/></Link><div className="sidebar-eyebrow">WORKSPACE</div>
 <nav>{nav.map(n=><Link key={n.to} to={n.to} title={n.label} onClick={()=>setMobile(false)} className={`nav-link ${path===n.to?'active':''}`}><n.icon/><span className="sidebar-label">{n.label}</span></Link>)}</nav>
 <div className="sidebar-bottom"><div className="sidebar-note"><div className="flex items-center gap-2 text-xs font-medium"><ShieldCheck size={17} className="text-primary"/> A little doubt. A lot of clarity.</div><p>Better information starts with asking better questions.</p><Button asChild variant="link" className="mt-2 h-auto p-0 text-xs"><Link to="/about">Our methodology <ArrowUpRight size={13}/></Link></Button></div>
 <Link to="/welcome" className="nav-link"><ArrowUpRight/><span className="sidebar-label">Explore TruthLens</span></Link>
 <div className="sidebar-profile"><div className="avatar">G</div><div className="flex-1"><p className="text-xs font-medium">Guest workspace</p><p className="mt-1 text-[10px] text-sidebar-muted">Frontend preview</p></div><ChevronDown size={14} className="sidebar-label text-sidebar-muted"/></div></div></aside>
 <div className="app-body"><header className="topbar"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" title="Toggle sidebar" aria-label="Toggle sidebar" onClick={()=>{if(window.innerWidth<=640)setMobile(!mobile);else setCollapsed(!collapsed);}}>{mobile?<X size={18}/>:<PanelLeft size={18}/>}</Button><span className="topbar-title">{title}</span></div><div className="topbar-actions"><span className="preview-pill"><span className="preview-dot"/> Preview environment</span><span className="h-6 border-l border-border"/><div className="avatar" title="Guest workspace">G</div></div></header><main className="content">{children}<WebsiteFooter/></main></div></div>;
}
