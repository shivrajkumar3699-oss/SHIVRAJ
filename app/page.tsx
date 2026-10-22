"use client";
import { useEffect, useRef, useState } from "react";

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

const CONTACT_EMAIL = "shivrajkumar3699@gmail.com";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("shivraj-portfolio-theme");
    if (savedTheme === "night") setNightMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("shivraj-portfolio-theme", nightMode ? "night" : "day");
  }, [nightMode]);

  useEffect(() => {
    const savedMuted = sessionStorage.getItem("shivraj-portfolio-muted") === "true";

    if (savedMuted) setMuted(true);
    if (audioRef.current) audioRef.current.muted = savedMuted;

    const f = () => setScrolled(scrollY > 30);
    addEventListener("scroll", f, { passive: true });

    const revealItems = document.querySelectorAll(
      ".section, .project, footer"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      removeEventListener("scroll", f);
      observer.disconnect();
    };
  }, []);

  const startMelody = async () => {
    const a = audioRef.current;
    if (!a) return false;

    try {
      a.muted = false;
      a.volume = 0.32;
      a.loop = true;
      await a.play();

      setMuted(false);
      sessionStorage.setItem("shivraj-portfolio-muted", "false");
      console.log("Melody started successfully");
      return true;
    } catch (e) {
      console.error("Melody playback failed:", e);
      return false;
    }
  };

  const enterSite = async () => {
    const started = await startMelody();
    setEntered(true);
    if (!started) {
      console.warn("Melody did not start; use the speaker button to retry.");
    }
  };

  const toggleAudio = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) {
        await startMelody();
      } else {
        a.muted = !a.muted;
        setMuted(a.muted);
        sessionStorage.setItem("shivraj-portfolio-muted", String(a.muted));
      }
    } catch (e) {
      console.error("Melody playback failed:", e);
    }
  };

  const particles = Array.from({ length: 52 }, (_, i) => i);

  return (
    <main className={`${entered ? "siteEntered" : ""} ${nightMode ? "theme-night" : "theme-day"}`}>
      <audio
        ref={audioRef}
        src="/melody.mp3"
        loop
        preload="auto"
        onCanPlay={() =>
          console.log("Melody can play:", audioRef.current?.readyState)
        }
        onLoadedMetadata={() =>
          console.log("Melody metadata loaded:", audioRef.current?.duration)
        }
        onError={() =>
          console.error("Melody source error:", audioRef.current?.error)
        }
      />

      {!entered && (
        <div className="welcomeScreen dreamWelcome">
          <div className="dreamSky" aria-hidden="true" />
          <div className="dreamSun" aria-hidden="true" />
          <div className="dreamCloud dreamCloudOne" aria-hidden="true" />
          <div className="dreamCloud dreamCloudTwo" aria-hidden="true" />
          <div className="dreamMountain dreamMountainBack" aria-hidden="true" />
          <div className="dreamMountain dreamMountainFront" aria-hidden="true" />
          <div className="dreamMeadow" aria-hidden="true" />
          <div className="dreamFireflies" aria-hidden="true">
            {Array.from({ length: 34 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="welcomeVignette" />
          <div className="welcomeGlow" />
          <div className="welcomeRing welcomeRingOne" />
          <div className="welcomeRing welcomeRingTwo" />
          <div className="welcomeParticles">
            {particles.map((i) => (
              <i
                key={i}
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="welcomeContent">
            <div className="welcomeKicker">A LITTLE WORLD OF IDEAS & WONDER</div>
            <div className="welcomeName">Shivraj</div>
            <div className="welcomeRule" />
            <p className="dreamWelcomeLine">made with curiosity, rooted in wonder.</p>
            <button className="enterButton" onClick={enterSite}>
              <span>Step into my world</span>
              <b>↗</b>
            </button>
            <div className="welcomeHint">Take a breath · Stay a little</div>
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
          {muted ? (
            <path d="m16 9 5 6m0-6-5 6" />
          ) : (
            <>
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </>
          )}
        </svg>
        <span className="audioButtonAura" aria-hidden="true" />
      </button>


      <button
        className={nightMode ? "themeToggle isNight" : "themeToggle"}
        type="button"
        onClick={() => setNightMode((current) => !current)}
        aria-label={nightMode ? "Switch to day mode" : "Switch to night mode"}
        aria-pressed={nightMode}
        title={nightMode ? "Switch to day mode" : "Switch to night mode"}
      >
        <span className="themeToggleTrack" aria-hidden="true">
          <span className="themeToggleSun">
            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" /><path d="M12 1.8v2.1M12 20.1v2.1M4.78 4.78l1.48 1.48m11.48 11.48 1.48 1.48M1.8 12h2.1m16.2 0h2.1M4.78 19.22l1.48-1.48M17.74 6.26l1.48-1.48" /></svg>
          </span>
          <span className="themeToggleMoon">
            <svg viewBox="0 0 24 24" fill="none"><path d="M20.5 15.1A8.8 8.8 0 0 1 8.9 3.5 8.9 8.9 0 1 0 20.5 15.1Z" /></svg>
          </span>
          <span className="themeToggleKnob" />
        </span>
        <span className="themeToggleLabel">{nightMode ? "Night" : "Day"}</span>
      </button>

      <div className="noise" />
      <div className="ambientParticles">
        {particles.map((i) => (
          <i
            key={i}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>

      <nav className={scrolled ? "nav navScrolled" : "nav"}>
        <a className="brand" href="#top">
          S<span>.</span>
        </a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a className="navCta" href="#contact">
            Let&apos;s talk <span>↗</span>
          </a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="dreamHeroLandscape" aria-hidden="true">
          <div className="dreamHeroSun" />
          <div className="dreamHeroCloud dreamHeroCloudOne" />
          <div className="dreamHeroCloud dreamHeroCloudTwo" />
          <div className="dreamHeroRange dreamHeroRangeBack" />
          <div className="dreamHeroRange dreamHeroRangeFront" />
          <div className="dreamHeroField" />
          <div className="dreamHeroGlow" />
        </div>

        <svg className="storyLandscape" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice" role="img" aria-label={nightMode ? "A moonlit mountain campsite with flying owls" : "A sunny hand-drawn mountain landscape with birds and a camper"}>
          <defs>
            <linearGradient id="storyDaySky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#168be5"/><stop offset="43%" stopColor="#61c4f4"/><stop offset="76%" stopColor="#b8e6ff"/><stop offset="100%" stopColor="#ffe0b1"/></linearGradient>
            <linearGradient id="storyNightSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#02091e"/><stop offset="38%" stopColor="#081b43"/><stop offset="72%" stopColor="#17345f"/><stop offset="100%" stopColor="#304e70"/></linearGradient>
            <linearGradient id="storyFarMountain" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a9d2c5"/><stop offset="100%" stopColor="#6b9d9a"/></linearGradient>
            <linearGradient id="storyNearMountain" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#5b9c85"/><stop offset="100%" stopColor="#306b5a"/></linearGradient>
            <linearGradient id="storyPlateau" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b2d87c"/><stop offset="42%" stopColor="#6da75c"/><stop offset="100%" stopColor="#315c49"/></linearGradient><linearGradient id="storyLake" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b3e8f5" stopOpacity=".82"/><stop offset="100%" stopColor="#2787b4" stopOpacity=".16"/></linearGradient><linearGradient id="storyTentCanvas" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff0bd"/><stop offset="55%" stopColor="#e7bd78"/><stop offset="100%" stopColor="#b67a47"/></linearGradient><linearGradient id="storyTentWarm" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffdb8a" stopOpacity=".9"/><stop offset="100%" stopColor="#f47a27" stopOpacity=".15"/></linearGradient>
            <radialGradient id="storyMoonGlow"><stop offset="0%" stopColor="#fffdf0" stopOpacity=".9"/><stop offset="45%" stopColor="#d8e8ff" stopOpacity=".25"/><stop offset="100%" stopColor="#a8c7ff" stopOpacity="0"/></radialGradient>
            <radialGradient id="storyFireGlow"><stop offset="0%" stopColor="#ffb34f" stopOpacity=".75"/><stop offset="100%" stopColor="#ff782f" stopOpacity="0"/></radialGradient>
          </defs>
          <g className="storyDayLayer">
            <rect width="1440" height="620" fill="url(#storyDaySky)"/>
            <circle cx="1130" cy="110" r="105" fill="#fff4ba" opacity=".24" className="storySunHalo"/>
            <circle cx="1130" cy="110" r="48" fill="#ffe17b" stroke="#f8c957" strokeWidth="3" className="storySunDisc"/>
            <g className="storyDayClouds" fill="#fff7e8" opacity=".76"><path d="M-40 171c-7-30 17-51 46-45 15-37 67-43 91-7 36-8 62 20 48 52H-40Z"/><path d="M120 154c-5-22 12-39 34-36 10-29 53-33 70-5 30-6 48 21 36 43H120Z"/><path d="M420 95c-4-17 10-31 28-28 9-24 42-27 56-4 24-5 39 17 29 32H420Z"/><path d="M1110 218c-6-23 12-39 35-35 11-29 51-32 68-5 30-6 48 20 37 40H1110Z" opacity=".52"/></g><g className="storySunRays" transform="translate(1130 110)" stroke="#fff1ad" strokeWidth="4" strokeLinecap="round" opacity=".78">{Array.from({length:12},(_,i)=><path key={i} d="M0-54V-64" transform={`rotate(${i*30})`}/>)}</g>
          </g>
          <g className="storyNightLayer">
            <rect width="1440" height="620" fill="url(#storyNightSky)"/>
            <circle cx="1128" cy="112" r="150" fill="url(#storyMoonGlow)" className="storyMoonAura"/>
            <circle cx="1128" cy="112" r="53" fill="#f3f5ff" className="storyMoonDisc"/>
            <g fill="#a9c8ff" opacity=".5"><circle cx="1110" cy="91" r="8"/><circle cx="1144" cy="124" r="12"/><circle cx="1139" cy="82" r="5"/><circle cx="1097" cy="127" r="4"/><circle cx="1161" cy="101" r="6"/><circle cx="1118" cy="145" r="3"/><circle cx="1089" cy="103" r="4"/></g><g className="storyMilkyWay" fill="#d9e8ff" opacity=".22">{Array.from({length:40},(_,i)=><circle key={i} cx={(i*89+170)%1430} cy={(i*47+28)%320} r={i%5===0?2:0.9}/>)}</g>
            {Array.from({length: 64}, (_, i) => (
              <circle key={i} className="storyStar" cx={(i * 197 + 43) % 1430 + 5} cy={(i * 71 + 19) % 290 + 8} r={i % 7 === 0 ? 2.1 : 1.15} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </g>
          <g className="storyMountains">
            <path d="M0 440 115 300 180 350 322 145 455 335 560 220 692 366 818 190 972 356 1095 245 1240 363 1360 285 1440 344V620H0Z" fill="url(#storyFarMountain)" stroke="#568d84" strokeWidth="4" strokeLinejoin="round"/><path d="m0 440 115-140 65 50 142-205 133 190 105-115 132 146 126-176 154 166 123-111 145 118 120-78 80 59-125-19-85-43-121 31-112-21-106 41-111-19-96 33-94-15-111 31-87-6-111 41Z" fill="#eaf6ff" opacity=".46"/><path d="m275 194 47-49 45 65-39-18-22 11-14-15-16 13ZM772 239l46-49 47 55-37-12-21 12-18-11-17 10ZM1055 279l40-34 44 52-35-14-20 12-13-11-16 8Z" fill="#f5fbff" opacity=".92"/>
            <path d="m220 248 102-103 78 111-51-25-30 12-24-25-25 22Z" fill="#e9f4e6" opacity=".9"/>
            <path d="m720 293 98-103 93 109-50-20-34 15-29-25-29 21Z" fill="#e8f2e5" opacity=".85"/>
            <path d="M0 490 145 377 250 424 400 294 540 445 670 345 800 455 940 327 1070 444 1190 362 1320 435 1440 390V620H0Z" fill="url(#storyNearMountain)" stroke="#397963" strokeWidth="4" strokeLinejoin="round"/><path d="m365 329 35-35 47 50-35-17-22 12-25-10ZM632 383l38-38 42 49-33-15-21 12-26-8ZM902 366l38-39 47 53-37-17-23 10-25-7Z" fill="#d9f1e8" opacity=".82"/><path d="M0 493 145 377 205 403 145 396 76 455 0 515ZM540 445l130-100 74 85-80-48-63 35-61 28ZM1070 444l120-82 79 73-78-45-51 26-70 28Z" fill="#183f47" opacity=".25"/>
            <path d="M0 514Q190 464 365 504T735 493T1100 494T1440 474V620H0Z" fill="#477d5c"/><path d="M0 515Q165 493 295 518T590 528Q745 514 855 531T1150 513T1440 496V620H0Z" fill="url(#storyLake)" opacity=".76"/><path d="M80 550Q260 528 402 549T690 549" fill="none" stroke="#d9f5ff" strokeWidth="3" opacity=".5"/><path d="M40 574Q240 555 365 574M510 560q88-11 154 0" fill="none" stroke="#c8f2ff" strokeWidth="2" opacity=".3"/>
          </g>
          <g className="storyPlateauLand">
            <path d="M560 510Q690 466 820 488T1050 465Q1230 454 1440 492V620H490Q540 568 560 510Z" fill="url(#storyPlateau)" stroke="#356c4c" strokeWidth="4"/><path d="M525 575Q680 533 842 548T1160 529T1440 542V620H500Z" fill="#254f43" opacity=".3"/><g className="storyPines" fill="#244d43" stroke="#173b35" strokeWidth="2"><path d="m1250 503 28-83 28 83h-18l25 30h-70l25-30Z"/><path d="m1310 522 20-61 22 61h-14l20 22h-54l20-22Z"/><path d="m1370 513 25-75 26 75h-16l22 26h-62l22-26Z"/></g>
            <path d="M575 525Q780 488 950 511T1440 516" fill="none" stroke="#b5d69a" strokeWidth="4" strokeLinecap="round" opacity=".7"/>
            <g className="storyGrass" stroke="#d4e8a7" strokeWidth="3" strokeLinecap="round"><path d="m650 570 5-13m-5 13-8-8M720 594l2-14m0 14 9-9M1320 557l5-13m-5 13-8-8M1400 590l3-12"/></g>
          </g>
          <g className="storyBirds">
            <g className="storyDayBird storyBirdOne" transform="translate(390 205)"><path d="M0 0 31-19 22-2 48-5 23 8 13 3 0 0Z" fill="#df514f" stroke="#7e373c" strokeWidth="3" strokeLinejoin="round"/><path d="m22-2 9-17 5 16" fill="#f68a78" stroke="#7e373c" strokeWidth="2"/></g>
            <g className="storyDayBird storyBirdTwo" transform="translate(480 160) scale(.8)"><path d="M0 0 31-19 22-2 48-5 23 8 13 3 0 0Z" fill="#3279ce" stroke="#244e87" strokeWidth="3" strokeLinejoin="round"/><path d="m22-2 9-17 5 16" fill="#77c3f0" stroke="#244e87" strokeWidth="2"/></g>
            <g className="storyDayBird storyBirdThree" transform="translate(545 224) scale(.65)"><path d="M0 0 31-19 22-2 48-5 23 8 13 3 0 0Z" fill="#e9a73b" stroke="#946226" strokeWidth="3" strokeLinejoin="round"/><path d="m22-2 9-17 5 16" fill="#ffe07a" stroke="#946226" strokeWidth="2"/></g>
            <g className="storyOwls">
              <g className="storyOwl storyOwlOne" transform="translate(380 188)"><path d="M-18-11-23-27-7-19Q0-23 7-19L23-27 18-9Q29 7 17 21Q0 34-17 21Q-29 7-18-11Z" fill="#66506c" stroke="#1c1934" strokeWidth="3"/><ellipse cx="-9" cy="2" rx="7" ry="8" fill="#f58d39"/><ellipse cx="9" cy="2" rx="7" ry="8" fill="#f58d39"/><circle cx="-9" cy="2" r="3.8" fill="#080b17"/><circle cx="9" cy="2" r="3.8" fill="#080b17"/><path d="m-4 12 4 5 4-5" fill="#f3b55b"/></g>
              <g className="storyOwl storyOwlTwo" transform="translate(485 145) scale(.72)"><path d="M-18-11-23-27-7-19Q0-23 7-19L23-27 18-9Q29 7 17 21Q0 34-17 21Q-29 7-18-11Z" fill="#4d627f" stroke="#1c1934" strokeWidth="3"/><ellipse cx="-9" cy="2" rx="7" ry="8" fill="#ff9a36"/><ellipse cx="9" cy="2" rx="7" ry="8" fill="#ff9a36"/><circle cx="-9" cy="2" r="3.8" fill="#080b17"/><circle cx="9" cy="2" r="3.8" fill="#080b17"/><path d="m-4 12 4 5 4-5" fill="#f3b55b"/></g>
            </g>
          </g>
          <g className="storyCamp">
            <g className="storyTent">
              {/* Taut triangular canvas with visible ridge, stitched seams, stakes and a believable dark entrance. */}
              <ellipse cx="1112" cy="551" rx="123" ry="9" fill="#142d2a" opacity=".3"/>
              <path d="M1001 550 1113 378 1226 550Z" fill="url(#storyTentCanvas)" stroke="#59412e" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M1113 378 1104 550 1001 550Z" fill="#fff3cf" opacity=".46"/>
              <path d="M1113 389 1208 541 1113 541Z" fill="#c18b52" opacity=".38"/>
              <path d="M1113 381 1113 550" stroke="#785438" strokeWidth="4" strokeLinecap="round"/>
              <path d="M1113 390 1012 541M1120 397 1216 541" fill="none" stroke="#fff4d7" strokeWidth="2.5" opacity=".78"/>
              <path d="M1030 512 1077 439M1045 526 1086 463M1184 514 1147 455" fill="none" stroke="#c18a53" strokeWidth="2" opacity=".58"/>
              <path d="M1080 550 1113 466 1150 550Z" fill="#382b24" stroke="#63462f" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M1090 550 1113 485 1139 550Z" fill="#101b27"/>
              <path d="M1113 467 1113 550" stroke="#94704d" strokeWidth="2" opacity=".8"/>
              <path d="M1004 548 1113 378 1224 548" fill="none" stroke="#fff0c6" strokeWidth="3" strokeLinecap="round"/>
              <path d="M1002 550 987 556M1225 550l15 6" stroke="#766044" strokeWidth="3" strokeLinecap="round"/>
              <path d="M1110 390 1116 390" stroke="#fff9e5" strokeWidth="4" strokeLinecap="round"/>
              <g className="storySleeper" aria-hidden="true">
                {/* Only a soft sleeping silhouette is visible through the tent fabric at night. */}
                <ellipse cx="1115" cy="537" rx="39" ry="6" fill="#080f1b" opacity=".45"/>
                <path d="M1080 529Q1086 516 1104 517L1126 520Q1140 524 1147 535L1137 541 1088 540Z" fill="#101522" opacity=".96"/>
                <circle cx="1090" cy="518" r="10" fill="#0a101c"/>
                <path d="M1083 513Q1085 505 1094 508L1100 515 1092 522 1084 520Z" fill="#070d18"/>
                <path d="M1117 524 1134 528 1141 536 1128 537 1114 531Z" fill="#0a111d"/>
                <path d="M1097 526 1109 532 1119 531" fill="none" stroke="#273044" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
              </g>
              <g className="storyZzz" aria-hidden="true"><text x="1121" y="511">Z</text><text x="1140" y="488">z</text><text x="1157" y="466">z</text></g>
            </g>

            <g className="storyCamper">
              <ellipse cx="815" cy="573" rx="48" ry="8" fill="#102b25" opacity=".48" className="storyCamperCastShadow"/>
              <path d="M792 475 832 475 835 516 830 568 811 568 808 526 803 568 783 568 784 523 781 495Z" fill="#8eb9d8" stroke="#527b9a" strokeWidth="3.2" strokeLinejoin="round"/>
              <path d="M812 482 811 523M827 483 824 526M792 486 795 523" fill="none" stroke="#c6e0f1" strokeWidth="2.4" strokeLinecap="round" opacity=".85"/>
              <path d="M783 568 803 568 805 576 776 576Q771 573 776 570Z" fill="#28312f" stroke="#161e1c" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M811 568 830 568 840 574Q843 578 835 578L809 576Z" fill="#28312f" stroke="#161e1c" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M789 405Q798 397 807 397L823 397Q833 400 839 411L832 432 831 480Q811 490 786 480L787 433 778 417Q781 409 789 405Z" fill="#f7f6f1" stroke="#b7b8b2" strokeWidth="3.1" strokeLinejoin="round"/>
              <path d="M812 400 812 482" stroke="#242625" strokeWidth="2.8" strokeLinecap="round"/>
              <path d="M789 412 798 427M834 412 825 428M792 451l10 6M824 455l7-5M798 477l9-3" fill="none" stroke="#d0d0c9" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M781 414 770 433 778 441 790 425Z" fill="#f0efe9" stroke="#b7b8b2" strokeWidth="2.4" strokeLinejoin="round"/>
              <path d="M832 413 844 430 836 438 826 425Z" fill="#f0efe9" stroke="#b7b8b2" strokeWidth="2.4" strokeLinejoin="round"/>
              <path d="M774 428 778 434 785 429M833 428 838 433 842 428" fill="none" stroke="#c2c2bb" strokeWidth="3" strokeLinecap="round"/>
              <path d="M780 430 767 447 785 455 799 444" fill="none" stroke="#c98e68" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M785 455 797 449" fill="none" stroke="#c98e68" strokeWidth="9" strokeLinecap="round"/>
              <path d="M834 430 848 447 831 456 819 448" fill="none" stroke="#c98e68" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M831 456 819 450" fill="none" stroke="#c98e68" strokeWidth="9" strokeLinecap="round"/>
              <path d="M791 440q-2 5 3 8M826 440q3 5-2 8" fill="none" stroke="#e7b58f" strokeWidth="2.5" strokeLinecap="round"/>
              <g className="storyOmniWatch" transform="translate(787 453) rotate(-18)">
                <rect x="-4" y="-8" width="8" height="16" rx="3" fill="#344b32"/>
                <rect x="-6.5" y="-6.5" width="13" height="13" rx="4" fill="#202d25" stroke="#6f8a4a" strokeWidth="1.8"/>
                <circle r="4.1" fill="#a5e34c" stroke="#d5f58c" strokeWidth="1.2"/>
                <circle r="1.6" fill="#eaffbd"/>
              </g>
              <path d="M795 393 793 379Q795 363 811 363 827 364 829 380L824 395 814 391 807 397Z" fill="#30231f" stroke="#1b1917" strokeWidth="3" strokeLinejoin="round"/>
              <ellipse cx="811" cy="384" rx="14" ry="17" fill="#c98e68" stroke="#875b43" strokeWidth="2.2"/>
              <path d="M797 380Q797 365 811 365 823 365 828 377L822 381 817 376 809 381 803 377 798 387Z" fill="#30231f"/>
              <g className="storyLimeBag">
                <ellipse cx="864" cy="572" rx="28" ry="5" fill="#142b24" opacity=".4"/>
                <path d="M844 535Q844 529 851 527L874 527Q881 530 882 539L884 565Q883 570 877 571L850 571Q844 569 844 563Z" fill="#b5d934" stroke="#5d7620" strokeWidth="3" strokeLinejoin="round"/>
                <path d="M850 534Q862 526 875 534" fill="none" stroke="#e4f68b" strokeWidth="3" strokeLinecap="round"/>
                <path d="M850 542 878 542 878 557 850 557Z" fill="#9bc42b" stroke="#6b8724" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M854 546 874 546M854 551 870 551" stroke="#d9ef77" strokeWidth="2" strokeLinecap="round"/>
                <rect x="860" y="557" width="8" height="5" rx="1.5" fill="#4d6123"/>
                <path d="M846 541 841 549 843 560M880 541l5 8-2 10" fill="none" stroke="#758e28" strokeWidth="2.5" strokeLinecap="round"/>
              </g>
            </g>
            <g className="storyFire">
              <ellipse cx="978" cy="571" rx="104" ry="75" fill="url(#storyFireGlow)" className="storyFireLight"/><ellipse cx="978" cy="584" rx="57" ry="15" fill="#ffb95b" opacity=".2"/>
              <path d="M948 580q-18-23 1-44 0 17 13 22-4-31 21-50 0 26 12 37 13 14-1 35Z" fill="#ff7a2f" stroke="#d94e25" strokeWidth="3" className="storyFlame storyFlameA"/>
              <path d="M963 580q-7-17 7-29 1 12 9 15 9 6 2 14Z" fill="#ffe27b" className="storyFlame storyFlameB"/>
              <path d="m943 585 57-13m-49-4 45 19" stroke="#644438" strokeWidth="8" strokeLinecap="round"/>
              <circle cx="950" cy="548" r="3" fill="#ffcf6c" className="storyEmber"/><circle cx="1000" cy="535" r="2.5" fill="#ffcf6c" className="storyEmber storyEmberTwo"/>
            </g>
            <g className="storyAshes" aria-hidden="true">
              <ellipse cx="978" cy="581" rx="48" ry="9" fill="#c7c0a9" opacity=".75"/>
              <ellipse cx="979" cy="579" rx="31" ry="5" fill="#77796f" opacity=".72"/>
              <path d="m941 579 29-10 20 8 21-5 12 8-26 5-22-3-18 2Z" fill="#514b43" stroke="#6f665b" strokeWidth="2" strokeLinejoin="round"/>
              <path d="m948 574 25-12 20 5 13-5 10 7-22 5-19-3-16 5Z" fill="#76543d" stroke="#493b31" strokeWidth="3" strokeLinejoin="round"/>
              <path d="m952 570 17-7m16 8 18-6" stroke="#b28a60" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="959" cy="580" r="2.5" fill="#d8d2c1" opacity=".8"/>
              <circle cx="990" cy="582" r="2" fill="#e0dac8" opacity=".8"/>
              <circle cx="1002" cy="576" r="1.5" fill="#d8d2c1" opacity=".8"/>
            </g>
          </g>
        </svg>

        <div className="orb orbOne" />
        <div className="orb orbTwo" />
        <div className="heroGrid" />
        <div className="particles">
          {Array.from({ length: 18 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="heroInner">
          <p className="eyebrow heroReveal heroRevealOne">
            <span /> Creative Developer · AI · Web
          </p>
          <h1 className="heroReveal heroRevealTwo">SHIVRAJ</h1>
          <p className="heroSub heroReveal heroRevealThree">
            A curious mind, a love for nature, and a little magic in everything we build.
          </p>
          <a href="#work" className="heroButton heroReveal heroRevealFour">
            Wander through <span>↓</span>
          </a>
        </div>
        <div className="scrollHint">
          <span /> Scroll to explore
        </div>
      </section>

      <section id="about" className="about section">
        <div className="sectionLabel">01 — ABOUT</div>
        <div className="aboutGrid">
          <div className="aboutIdentity">
            <p className="identityIntro">Hey My Name is</p>
            <h2 className="identityName">SHIVRAJ</h2>
            <p className="identityAge">
              I Am Just <strong>17</strong> Years old Boy
            </p>
            <p className="identityLocation">
              I Am From{" "}
              <a
                className="locationLink"
                href="https://www.google.com/maps/search/?api=1&query=Ramgarh%2C%20Jharkhand%20829122%2C%20India"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Ramgarh, Jharkhand 829122 in Google Maps in a new tab"
              >
                Ramgarh, Jharkhand - 829122
              </a>
            </p>
            <a
              className="identityContact"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                window.history.replaceState(null, "", "#contact");
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span>CONTACT</span>
              <b>↗</b>
            </a>
          </div>
          <div className="aboutCopy">
            <p className="lead">
              I like turning ambitious ideas into digital products that feel as good as they work.
            </p>
            <div className="traits">
              <p>
                🧠 <span><b>Creative mind</b> — turning ideas into polished digital experiences.</span>
              </p>
              <p>
                🎯 <span><b>Requirement-first</b> — listening carefully and building what the client actually needs.</span>
              </p>
              <p>
                ⚡ <span><b>Always building</b> — experimenting with AI, web and new technologies.</span>
              </p>
              <p>
                ✨ <span><b>Detail-focused</b> — caring about the small things that make a product feel premium.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work section">
        <div className="sectionHead">
          <div className="sectionLabel">02 — SELECTED WORK</div>
          <span>Things I&apos;ve built ↘</span>
        </div>

        <div className="projectList">
          {projects.map((p) => (
            <a
              className="project"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              key={p.name}
            >
              <div className={"projectVisual " + p.className}>
                <div className="browserBar">
                  <div className="macDots">
                    <i className="macRed" />
                    <i className="macYellow" />
                    <i className="macGreen" />
                  </div>
                  <small>
                    {p.name.toLowerCase().replaceAll(" ", "-")}.vercel.app
                  </small>
                </div>

                <div className="preview">
                  {p.className === "captify" ? (
                    <>
                      <div className="capTop">CAPTIFY</div>
                      <div className="capInterface">
                        <div className="capMiniNav">
                          <b>CAPTIFY</b>
                          <span>AI Caption Studio</span>
                          <em>●</em>
                        </div>
                        <div className="capVideo">
                          <div className="capScan" />
                          <div className="capSubject">
                            YOUR
                            <br />
                            <b>IDEAS.</b>
                          </div>
                          <div className="capCaption">
                            Turn long videos into <strong>captions.</strong>
                          </div>
                          <div className="capControls">
                            <span>▶</span>
                            <i />
                            <small>00:42</small>
                          </div>
                        </div>
                        <div className="capCards">
                          <span>Hindi</span>
                          <span>English</span>
                          <span className="active">Hinglish</span>
                          <span>1080p</span>
                        </div>
                      </div>
                      <div className="capGlow" />
                      <div className="capPill">Create captioned video&nbsp; →</div>
                    </>
                  ) : (
                    <>
                      <div className="swLogo">SW</div>
                      <div className="swTitle">
                        ROAD TO
                        <br />
                        <b>SECRET WARS</b>
                      </div>
                      <div className="swLine" />
                      <div className="swDate">DEC 17, 2027</div>
                    </>
                  )}
                </div>

                <span className="viewDot">↗</span>
              </div>

              <div className="projectMeta">
                <div>
                  <span>{p.number}</span>
                  <h3>{p.name}</h3>
                  <p>{p.type}</p>
                </div>
                <div className="projectArrow">
                  View Project <b>↗</b>
                </div>
              </div>

              <p className="projectDesc">{p.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="sectionLabel">03 — CONTACT</div>
        <div className="contactInner">
          <p>Have an idea?</p>
          <h2>
            Let&apos;s make it
            <br />
            <span>real.</span>
          </h2>
          <div className="mailActions">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`}
              className="mail"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT_EMAIL} <b>↗</b>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 SHIVRAJ KUMAR</span>
        <span>CREATIVE DEVELOPER · AI · WEB</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
