"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const ASSETS = {
  portal: "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779707217/image_1_vdzwae.png",
  curtainLeft: "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706559/curtain_left_znkmva.png",
  curtainRight: "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706564/curtain_right_paeyym.png",
  world: "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706392/image_2_gkcdlx.png",
  clouds: "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706555/bottom_clouds_xskut6.png",
  cards: [
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160507_2ccbb4eb-1469-484f-af25-59168ad9a233.png&w=1280&q=85",
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160644_072a7f68-a101-4ded-a332-7d37707dbdd1.png&w=1280&q=85",
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160706_1c153d04-0dfb-4ac9-a4ef-e74f301c329c.png&w=1280&q=85",
  ],
};

const projects = [
  {
    number: "01",
    name: "CAPTIFY",
    type: "AI Caption Studio",
    desc: "Turn speech into captions. Your videos. Captions, perfected.",
    href: "https://captifyy.vercel.app",
    className: "captify",
  },
  {
    number: "02",
    name: "ROAD TO SECRET WARS",
    type: "Marvel Release Tracker",
    desc: "A cinematic journey to Avengers: Secret Wars.",
    href: "https://road-to-secret-wars.vercel.app",
    className: "secret",
  },
];

const arcCards = [
  { title: "CAPTIFY", desc: "AI-powered captions for your next story", color: "#f3cdd6" },
  { title: "Creative Mind", desc: "Turning ideas into polished experiences", color: "#dcedc2" },
  { title: "Road to Secret Wars", desc: "A cinematic Marvel release tracker", color: "#c3e3f4" },
  { title: "Requirement-first", desc: "Building around what people actually need", color: "#f0e4c0" },
  { title: "Always Building", desc: "Exploring AI, web and new technology", color: "#dcd2f2" },
  { title: "Detail-focused", desc: "Small details make a product feel premium", color: "#f3cdd6" },
  { title: "AI & Web", desc: "Ideas shaped into useful digital tools", color: "#c3e3f4" },
  { title: "About Shivraj", desc: "Curiosity, creativity and a love for nature", color: "#f0e4c0" },
  { title: "Let’s Connect", desc: "Have an idea? Let’s make it real", color: "#dcedc2" },
];

const CONTACT_EMAIL = "shivrajkumar3699@gmail.com";
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function StarLogo() {
  return (
    <svg className="starLogo" viewBox="0 0 28 28" aria-label="Shivraj">
      <path d="M14 2l2.09 6.42H23l-5.45 3.96 2.09 6.42L14 14.84l-5.64 4.06 2.09-6.42L4.96 8.42h6.95L14 2z" fill="white" opacity=".9" />
      <circle cx="14" cy="24" r="1.5" fill="white" opacity=".6" />
      <circle cx="6" cy="6" r="1" fill="white" opacity=".4" />
      <circle cx="22" cy="6" r="1" fill="white" opacity=".4" />
    </svg>
  );
}

function PlayMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" /></svg>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollSceneRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const curtainLRef = useRef<HTMLDivElement>(null);
  const curtainRRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMuted = sessionStorage.getItem("shivraj-portfolio-muted") === "true";
    setMuted(savedMuted);
    if (audioRef.current) audioRef.current.muted = savedMuted;

    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);

    const updateScroll = () => {
      const scene = scrollSceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const distance = Math.max(1, scene.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / distance, 0, 1));
      setScrolled(window.scrollY > 30);
    };
    const onMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 768) return;
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    updateScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".section, .project, footer").forEach((item) => observer.observe(item));

    const openTimer = window.setTimeout(() => setCurtainsOpen(true), 100);
    const uiTimer = window.setTimeout(() => setUiVisible(true), 600);
    const doneTimer = window.setTimeout(() => setEntranceDone(true), 2200);
    return () => {
      media.removeEventListener("change", updateMobile);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      window.clearTimeout(openTimer);
      window.clearTimeout(uiTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    const ep = easeInOut(progress);
    const world = worldRef.current;
    const clouds = cloudsRef.current;
    const portal = portalRef.current;
    const left = curtainLRef.current;
    const right = curtainRRef.current;
    if (world) world.style.transform = `translate3d(${-mouse.x * 6}px,${-mouse.y * 6}px,0) scale(${lerp(1, 1.18, ep)})`;
    if (clouds) {
      clouds.style.transform = `translate3d(${-mouse.x * 9}px,${-mouse.y * 3.6}px,0) scale(${lerp(1, 1.4, ep)})`;
      clouds.style.opacity = String(lerp(0.7, 1, clamp(progress / 0.05, 0, 1)));
    }
    if (portal) {
      portal.style.transform = `translate3d(${-mouse.x * 7}px,${-mouse.y * 7}px,0) scale(${lerp(1, 7.5, ep)})`;
      portal.style.opacity = String(progress < 0.65 ? 1 : clamp(1 - (progress - 0.65) / 0.2, 0, 1));
    }
    const shift = curtainsOpen ? 62 : 0;
    const extra = lerp(0, 150, ep);
    if (left) {
      left.style.transform = `translate3d(${-mouse.x * 14 - shift - extra}%,${-mouse.y * 4}px,0) scale(${lerp(1, 1.3, ep)})`;
      left.style.transition = entranceDone ? "none" : "transform 1.8s cubic-bezier(.16,1,.3,1)";
    }
    if (right) {
      right.style.transform = `translate3d(${mouse.x * 14 + shift + extra}%,${mouse.y * 4}px,0) scale(${lerp(1, 1.3, ep)})`;
      right.style.transition = entranceDone ? "none" : "transform 1.8s cubic-bezier(.16,1,.3,1)";
    }
  }, [progress, mouse, curtainsOpen, entranceDone]);

  const startMelody = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.muted = false;
      audio.volume = 0;
      await audio.play();
      const startedAt = performance.now();
      const fadeIn = (now: number) => {
        const current = audioRef.current;
        if (!current || current.paused) return;
        const amount = Math.min((now - startedAt) / 1800, 1);
        current.volume = 0.32 * amount;
        if (amount < 1) requestAnimationFrame(fadeIn);
      };
      requestAnimationFrame(fadeIn);
      setMuted(false);
      sessionStorage.setItem("shivraj-portfolio-muted", "false");
      return true;
    } catch (error) {
      console.error("Melody playback failed:", error);
      return false;
    }
  };

  const enterSite = async () => {
    await startMelody();
    setEntered(true);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await startMelody();
      } else {
        audio.muted = !audio.muted;
        setMuted(audio.muted);
        sessionStorage.setItem("shivraj-portfolio-muted", String(audio.muted));
      }
    } catch (error) {
      console.error("Melody playback failed:", error);
    }
  };

  const openRamgarhMaps = () => {
    const destination = "Ramgarh, Jharkhand 829122, India";
    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    if (isIOS) { window.location.href = `maps://?q=${encodeURIComponent(destination)}`; return; }
    if (isAndroid) { window.location.href = `geo:0,0?q=${encodeURIComponent(destination)}`; return; }
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`, "_blank", "noopener,noreferrer");
  };

  const openDefaultMailApp = () => {
    const mailtoUrl = `mailto:${CONTACT_EMAIL}`;
    let appOpened = false;
    const markAppOpened = () => { appOpened = true; };
    window.addEventListener("blur", markAppOpened, { once: true });
    window.location.href = mailtoUrl;
    window.setTimeout(() => {
      window.removeEventListener("blur", markAppOpened);
      if (!appOpened && document.visibilityState === "visible") {
        window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;
      }
    }, 650);
  };

  const scene1Opacity = clamp(1 - progress / 0.22, 0, 1);
  const scene2Opacity = clamp((progress - 0.68) / 0.16, 0, 1);
  const arcSweep = (arcCards.length - 1) * 10;
  const rotationOffset = lerp(0, arcSweep, clamp((progress - 0.7) / 0.3, 0, 1));
  const arcRadius = isMobile ? 700 : 1100;
  const cardW = isMobile ? 160 : 220;
  const cardH = isMobile ? 175 : 230;
  const sliderH = isMobile ? 260 : 360;

  return (
    <main className={entered ? "siteEntered" : ""}>
      <audio ref={audioRef} src="/melody.mp3" loop preload="auto" />
      {!entered && (
        <div className="welcomeScreen immersiveWelcome">
          <div className="welcomePortal" aria-hidden="true" />
          <div className="welcomeCurtain welcomeCurtainLeft" aria-hidden="true" />
          <div className="welcomeCurtain welcomeCurtainRight" aria-hidden="true" />
          <div className="welcomeVignette" />
          <div className="welcomeContent">
            <p className="welcomeKicker">A LITTLE WORLD OF IDEAS & WONDER</p>
            <h1 className="welcomeName">Shivraj</h1>
            <div className="welcomeRule" />
            <p className="welcomeIntro">made with curiosity, rooted in wonder.</p>
            <button className="enterButton" onClick={enterSite}>
              <span>Step into my world</span><b>↗</b>
            </button>
            <p className="welcomeHint">Take a breath · Stay a little</p>
          </div>
        </div>
      )}

      <button
        className={muted ? "audioButton audioButtonMuted" : "audioButton"}
        onClick={toggleAudio}
        aria-label={muted ? "Play melody" : "Mute melody"}
        aria-pressed={!muted}
        title={muted ? "Play ambient melody" : "Mute ambient melody"}
      >
        <svg className="audioIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>}
        </svg>
        <span className="audioButtonAura" aria-hidden="true" />
      </button>

      <div className="parallaxScrollScene" ref={scrollSceneRef}>
        <div className="stickyViewport">
          <div className="worldLayer" ref={worldRef}><img src={ASSETS.world} alt="" /></div>
          <div className="cloudLayer" ref={cloudsRef}><img src={ASSETS.clouds} alt="" /></div>
          <div className="portalLayer" ref={portalRef}><img src={ASSETS.portal} alt="" /></div>
          <div className="bottomFade" />
          <div className="curtainLayer curtainLeft" ref={curtainLRef}><img src={ASSETS.curtainLeft} alt="" /></div>
          <div className="curtainLayer curtainRight" ref={curtainRRef}><img src={ASSETS.curtainRight} alt="" /></div>
          <div className="topFade" />

          <nav className={scrolled ? "immersiveNav navScrolled" : "immersiveNav"}>
            <div className="desktopNavGroup"><a href="#about">About</a><a href="#work">Selected work</a><a href="#contact">Contact</a></div>
            <a className="navStar" href="#top" aria-label="Back to top"><StarLogo /></a>
            <div className="desktopNavGroup navRight"><a href="#work">Projects</a><a href="#about">My story</a><a href="#contact">Let’s talk ↗</a></div>
            <div className="mobileNavGroup"><a href="#work">Explore</a><a href="#contact">Connect</a></div>
          </nav>

          <section className="sceneOne" style={{ opacity: scene1Opacity }}>
            <div className={uiVisible ? "sceneOneCopy uiVisible" : "sceneOneCopy"}>
              <p className="sceneEyebrow"><span /> CREATIVE DEVELOPER · AI · WEB</p>
              <h1><span>STEP <i>INTO</i></span><strong>SHIVRAJ</strong></h1>
              <p className="sceneDescription">A curious mind, a love for nature, and a little magic in everything we build.</p>
              <a className="sceneCta" href="#about">Wander through <span>↘</span></a>
            </div>
            <div className={uiVisible ? "sceneProjectCards uiVisible" : "sceneProjectCards"}>
              <a className="sceneProjectCard cardCaptify" href="https://captifyy.vercel.app" target="_blank" rel="noreferrer" style={{ "--card-image": `url("${ASSETS.cards[0]}")` } as CSSProperties}>
                <span className="cardGlass" /><span className="cardPlay"><PlayMark /></span><span className="sceneCardTitle">CAPTIFY</span><span className="sceneCardSub">AI Caption Studio ↗</span>
              </a>
              <a className="sceneProjectCard cardSecret" href="https://road-to-secret-wars.vercel.app" target="_blank" rel="noreferrer" style={{ "--card-image": `url("${ASSETS.cards[1]}")` } as CSSProperties}>
                <span className="cardGlass" /><span className="cardNumber">02</span><span className="sceneCardTitle">SECRET WARS</span><span className="sceneCardSub">Marvel Release Tracker ↗</span>
              </a>
              <a className="sceneProjectCard cardAbout" href="#about" style={{ "--card-image": `url("${ASSETS.cards[2]}")` } as CSSProperties}>
                <span className="cardGlass" /><span className="cardPlay"><PlayMark /></span><span className="sceneCardTitle">ABOUT ME</span><span className="sceneCardSub">Meet Shivraj ↗</span>
              </a>
            </div>
            <div className="sliderDots" aria-hidden="true"><i className="active" /><i /><i /><i /></div>
            <a className="scrollCue" href="#about"><span>DESCEND</span><b>⌄</b></a>
          </section>

          <section className="sceneTwo" style={{ opacity: scene2Opacity }}>
            <div className="sceneTwoCopy">
              <p className="sceneEyebrow"><span /> IDEAS MADE REAL</p>
              <h2>BUILD BEYOND<br />THE ORDINARY</h2>
              <p>Digital products shaped with curiosity, crafted with care, and made to feel as good as they work.</p>
            </div>
            <div className="arcSlider" style={{ height: sliderH }}>
              {arcCards.map((card, i) => {
                const centerIndex = Math.floor(arcCards.length / 2);
                const baseDeg = (i - centerIndex) * (isMobile ? 12 : 9);
                const deg = baseDeg - rotationOffset + centerIndex * (isMobile ? 12 : 9);
                const rad = deg * Math.PI / 180;
                const x = Math.sin(rad) * arcRadius;
                const y = arcRadius - Math.cos(rad) * arcRadius;
                const style = {
                  width: cardW, height: cardH, left: `calc(50% + ${x}px - ${cardW / 2}px)`,
                  bottom: `calc(-${y}px + ${isMobile ? 140 : 200}px)`,
                  backgroundColor: card.color, transform: `rotate(${deg}deg)`,
                  transformOrigin: `${cardW / 2}px ${arcRadius}px`,
                } as CSSProperties;
                return <a className="arcCard" key={card.title} href={i === 0 ? "https://captifyy.vercel.app" : i === 2 ? "https://road-to-secret-wars.vercel.app" : i === 7 ? "#about" : "#contact"} style={style}>
                  <span className="arcIndex">{String(i + 1).padStart(2, "0")}</span>
                  <span className="arcCardText"><strong>{card.title}</strong><small>{card.desc}</small></span>
                </a>;
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="noise" />
      <nav className={scrolled ? "contentNav navScrolled" : "contentNav"}>
        <a className="brand" href="#top">S<span>.</span></a>
        <div className="navLinks"><a href="#about">About</a><a href="#work">Work</a><a className="navCta" href="#contact">Let&apos;s talk <span>↗</span></a></div>
      </nav>

      <section id="top" className="hero legacyHero">
        <div className="heroBackdrop" aria-hidden="true"><img src={ASSETS.world} alt="" /></div>
        <div className="heroInner">
          <p className="eyebrow"><span /> Creative Developer · AI · Web</p>
          <h1>SHIVRAJ</h1>
          <p className="heroSub">A curious mind, a love for nature, and a little magic in everything we build.</p>
          <a href="#work" className="heroButton">Explore my work <span>↓</span></a>
        </div>
        <div className="scrollHint"><span /> Scroll to explore</div>
      </section>

      <section id="about" className="about section">
        <div className="sectionLabel">01 — ABOUT</div>
        <div className="aboutGrid">
          <div className="aboutIdentity">
            <p className="identityIntro">Hey My Name is</p>
            <h2 className="identityName">SHIVRAJ</h2>
            <p className="identityAge">I Am Just <strong>17</strong> Years old Boy</p>
            <p className="identityLocation">I Am From{" "}
              <button type="button" className="locationLink" onClick={openRamgarhMaps} aria-label="Open Ramgarh, Jharkhand 829122 in maps">Ramgarh, Jharkhand - 829122</button>
            </p>
            <a className="identityContact" href="#contact" onClick={(event) => {
              event.preventDefault(); window.history.replaceState(null, "", "#contact");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}><span>CONTACT</span><b>↗</b></a>
          </div>
          <div className="aboutCopy">
            <p className="lead">I like turning ambitious ideas into digital products that feel as good as they work.</p>
            <div className="traits">
              <p>🧠 <span><b>Creative mind</b> — turning ideas into polished digital experiences.</span></p>
              <p>🎯 <span><b>Requirement-first</b> — listening carefully and building what the client actually needs.</span></p>
              <p>⚡ <span><b>Always building</b> — experimenting with AI, web and new technologies.</span></p>
              <p>✨ <span><b>Detail-focused</b> — caring about the small things that make a product feel premium.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work section">
        <div className="sectionHead"><div className="sectionLabel">02 — SELECTED WORK</div><span>Things I&apos;ve built ↘</span></div>
        <div className="projectList">
          {projects.map((p) => <a className="project" href={p.href} target="_blank" rel="noreferrer" key={p.name}>
            <div className={"projectVisual " + p.className}>
              <div className="browserBar"><div className="macDots"><i className="macRed" /><i className="macYellow" /><i className="macGreen" /></div><small>{p.name.toLowerCase().replaceAll(" ", "-")}.vercel.app</small></div>
              <div className="preview">
                {p.className === "captify" ? <>
                  <div className="capTop">CAPTIFY</div>
                  <div className="capInterface"><div className="capMiniNav"><b>CAPTIFY</b><span>AI Caption Studio</span><em>●</em></div><div className="capVideo"><div className="capScan" /><div className="capSubject">YOUR<br /><b>IDEAS.</b></div><div className="capCaption">Turn long videos into <strong>captions.</strong></div><div className="capControls"><span>▶</span><i /><small>00:42</small></div></div><div className="capCards"><span>Hindi</span><span>English</span><span className="active">Hinglish</span><span>1080p</span></div></div>
                  <div className="capGlow" /><div className="capPill">Create captioned video&nbsp; →</div>
                </> : <><div className="swLogo">SW</div><div className="swTitle">ROAD TO<br /><b>SECRET WARS</b></div><div className="swLine" /><div className="swDate">DEC 17, 2027</div></>}
              </div>
              <span className="viewDot">↗</span>
            </div>
            <div className="projectMeta"><div><span>{p.number}</span><h3>{p.name}</h3><p>{p.type}</p></div><div className="projectArrow">View Project <b>↗</b></div></div>
            <p className="projectDesc">{p.desc}</p>
          </a>)}
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="sectionLabel">03 — CONTACT</div>
        <div className="contactInner"><p>Have an idea?</p><h2>Let&apos;s make it<br /><span>real.</span></h2>
          <div className="mailActions"><a href={`mailto:${CONTACT_EMAIL}`} className="mail" onClick={openDefaultMailApp}>{CONTACT_EMAIL} <b>↗</b></a></div>
        </div>
      </section>
      <footer><span>© 2026 SHIVRAJ KUMAR</span><span>CREATIVE DEVELOPER · AI · WEB</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
