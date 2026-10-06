"use client";
import { useEffect, useState } from "react";

const projects = [
 { number:"01", name:"CAPTIFY", type:"AI Caption Studio", desc:"Turn speech into captions. Your videos. Captions, perfected.", href:"https://captifyy.vercel.app", className:"captify" },
 { number:"02", name:"ROAD TO SECRET WARS", type:"Marvel Release Tracker", desc:"A cinematic journey to Avengers: Secret Wars.", href:"https://road-to-secret-wars.vercel.app", className:"secret" }
];

export default function Home() {
 const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>30);addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
 return <main>
  <div className="noise"/>
  <nav className={scrolled?"nav navScrolled":"nav"}><a className="brand" href="#top">S<span>.</span></a><div className="navLinks"><a href="#about">About</a><a href="#work">Work</a><a className="navCta" href="#contact">Let&apos;s talk <span>↗</span></a></div></nav>
  <section id="top" className="hero"><div className="orb orbOne"/><div className="orb orbTwo"/><div className="heroGrid"/><div className="particles">{Array.from({length:18},(_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div><div className="heroInner"><p className="eyebrow"><span/> Creative Developer · AI · Web</p><h1>SHIVRAJ</h1><p className="heroSub">Building ideas into <em>experiences.</em></p><a href="#work" className="heroButton">Explore my work <span>↓</span></a></div><div className="scrollHint"><span/> Scroll to explore</div></section>
  <section id="about" className="about section"><div className="sectionLabel">01 — ABOUT</div><div className="aboutGrid"><h2>17. Curious.<br/><span>Creative. Building.</span></h2><div className="aboutCopy"><p className="lead">I like turning ambitious ideas into digital products that feel as good as they work.</p><div className="traits"><p>🧠 <span><b>Creative mind</b> — turning ideas into polished digital experiences.</span></p><p>🎯 <span><b>Requirement-first</b> — listening carefully and building what the client actually needs.</span></p><p>⚡ <span><b>Always building</b> — experimenting with AI, web and new technologies.</span></p><p>✨ <span><b>Detail-focused</b> — caring about the small things that make a product feel premium.</span></p></div></div></div></section>
  <section id="work" className="work section"><div className="sectionHead"><div className="sectionLabel">02 — SELECTED WORK</div><span>Things I&apos;ve built ↘</span></div><div className="projectList">{projects.map(p=><a className="project" href={p.href} target="_blank" rel="noreferrer" key={p.name}><div className={"projectVisual "+p.className}><div className="browserBar"><i/><i/><i/><small>{p.name.toLowerCase().replaceAll(" ","-")}.vercel.app</small></div><div className="preview">{p.className==="captify"?<><div className="capTop">CAPTIFY</div><div className="capTitle">AI Caption<br/><b>Studio</b></div><div className="capWave">{[1,2,3,4,5,6,7,8,9].map(i=><i key={i}/>)}</div><div className="capPill">Create captioned video&nbsp; →</div></>:<><div className="swLogo">SW</div><div className="swTitle">ROAD TO<br/><b>SECRET WARS</b></div><div className="swLine"/><div className="swDate">DEC 17, 2027</div></>}</div><span className="viewDot">↗</span></div><div className="projectMeta"><div><span>{p.number}</span><h3>{p.name}</h3><p>{p.type}</p></div><div className="projectArrow">View Project <b>↗</b></div></div><p className="projectDesc">{p.desc}</p></a>)}</div></section>
  <section id="contact" className="contact section"><div className="sectionLabel">03 — CONTACT</div><div className="contactInner"><p>Have an idea?</p><h2>Let&apos;s make it<br/><span>real.</span></h2><a href="mailto:shivrajkumar3699@gmail.com" className="mail">shivrajkumar3699@gmail.com <b>↗</b></a></div></section>
  <footer><span>© 2026 SHIVRAJ KUMAR</span><span>CREATIVE DEVELOPER · AI · WEB</span><a href="#top">BACK TO TOP ↑</a></footer>
 </main>
}