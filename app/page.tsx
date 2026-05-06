"use client";

import { useState, useEffect, ReactNode, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  items: string[];
}

interface Project {
  name: string;
  date: string;
  description: string;
  url: string;
}

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}

interface CVData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────

const CV_DATA: CVData = {
  name: "Diogo Serrão",
  title: "Programador Full-Stack Júnior",
  location: "Ponta do Sol, Madeira",
  phone: "(+351) 967 300 714",
  email: "diogorabimserrao@gmail.com",

  summary:
    "Concluí o curso CTeSP - Tecnologias e Programação de Sistemas de Informação na Universidade da Madeira e atualmente frequento a licenciatura em Engenharia Informática. Tenho particular interesse no desenvolvimento de software, com foco em desenvolvimento web e backend, e experiência na criação de projetos académicos e pessoais. Sou motivado, autodidata e procuro uma oportunidade que me permita ganhar experiência em contexto profissional e evoluir enquanto programador.",

  skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Java", "Python", "PHP", "MySQL", "MongoDB", "Git", "Laravel"],

  experience: [
    {
      company: "ACIN – iCloud Solutions",
      role: "Estagiário de Desenvolvimento Web",
      period: "Fevereiro 2025 – Junho 2025",
      items: [
        "Desenvolvimento e manutenção de aplicações web com Laravel",
        "Integração de funcionalidades backend e gestão de bases de dados",
        "Trabalho em ambiente profissional com equipa de desenvolvimento",
      ],
    },
  ],

  projects: [
    { name: "Casa da Nati", date: "Nov 2024", description: "Criação do site com Next.js e integração de um sistema de reservas.", url: "https://casadanati.com" },
    { name: "Taxi Madeira Tour", date: "Out 2025", description: "Website para o setor do turismo na Madeira, com apresentação de serviços e navegação otimizada para mobile.", url: "https://taximadeiratour.com" },
    { name: "Fundação João Pereira", date: "Março 2025", description: "Website institucional com painel de administração personalizado para gestão de conteúdos e publicações.", url: "https://fundacaojoaopereira.pt/" },
    { name: "Rumos Paralelos", date: "Março 2026", description: "Website para empresa de construção civil e transportes, focado na apresentação de serviços.", url: "https://www.rumosparalelos.com/" },
  ],

  education: [
    { degree: "Licenciatura em Engenharia Informática", school: "Universidade da Madeira", period: "Setembro 2025 – Presente" },
    { degree: "CTeSP – Tecnologias e Programação de Sistemas de Informação", school: "Universidade da Madeira", period: "Setembro 2023 – Junho 2025", detail: "Formação técnica em engenharia de software, desenvolvimento frontend e backend, bases de dados, redes de computadores, segurança informática e sistemas de informação. Desenvolvimento de projetos práticos com tecnologias modernas como React, Next.js, Java, Python e Laravel." },
    { degree: "Certificação em Inglês – Nível B2", school: "Cambridge School, Funchal", period: "Junho 2022" },
  ],
};

// ── Matrix Rain Canvas ─────────────────────────────────────────────────────

function MatrixRain({ side }: { side: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const W = Math.max(60, Math.floor((window.innerWidth - 1200) / 2) + 40);
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      return { W, H };
    };

    let { W, H } = setup();
    const chars = "01アイウエオカキクケコサシスセソタチツテトABCDEF0123456789</>{}[]".split("");
    let cols = Math.floor(W / 14);
    let drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.05)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        ctx.font = "12px monospace";
        if (brightness > 0.95) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#4ade80";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(74,222,128,${0.3 + brightness * 0.5})`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(char, i * 14, drops[i] * 14);
        if (drops[i] * 14 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const onResize = () => {
      ({ W, H } = setup());
      cols = Math.floor(W / 14);
      drops = Array(cols).fill(1);
    };

    window.addEventListener("resize", onResize);
    const id = setInterval(draw, 45);
    return () => { clearInterval(id); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        [side]: 0,
        height: "100vh",
        opacity: 0.5,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ── Scanline Overlay ───────────────────────────────────────────────────────

function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

// ── Ticker ─────────────────────────────────────────────────────────────────

function Ticker({ top }: { top: boolean }) {
  const text =
    "  //  SYS_READY  //  NODE_ACTIVE  //  STACK: REACT · NEXT · LARAVEL · MYSQL  //  STATUS: OPEN_TO_WORK  //  BUILD: v2.6.0  //  ";
  return (
    <div
      style={{
        position: "fixed",
        [top ? "top" : "bottom"]: 0,
        left: 0,
        right: 0,
        height: 26,
        background: "rgba(74,222,128,0.06)",
        borderTop: top ? "none" : "1px solid rgba(74,222,128,0.2)",
        borderBottom: top ? "1px solid rgba(74,222,128,0.2)" : "none",
        overflow: "hidden",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          whiteSpace: "nowrap",
          animation: `ticker ${top ? "22s" : "28s"} linear infinite`,
          animationDirection: top ? "normal" : "reverse",
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.12em",
          color: "rgba(74,222,128,0.7)",
        }}
      >
        {text.repeat(8)}
      </div>
    </div>
  );
}

// ── HUD Card ───────────────────────────────────────────────────────────────

function HudCard({ children, label, index = 0 }: { children: ReactNode; label?: string; index?: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80 + index * 120);
    return () => clearTimeout(t);
  }, [index]);

  const cornerSize = 36;
  const cornerColor = hovered ? "rgba(74,222,128,0.9)" : "rgba(74,222,128,0.5)";
  const cornerStyle = (pos: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      pointerEvents: "none",
      transition: "border-color 0.25s",
    };
    switch (pos) {
      case "tl": return { ...base, top: -1, left: -1, borderTop: `2px solid ${cornerColor}`, borderLeft: `2px solid ${cornerColor}` };
      case "tr": return { ...base, top: -1, right: -1, borderTop: `2px solid ${cornerColor}`, borderRight: `2px solid ${cornerColor}` };
      case "bl": return { ...base, bottom: -1, left: -1, borderBottom: `2px solid ${cornerColor}`, borderLeft: `2px solid ${cornerColor}` };
      case "br": return { ...base, bottom: -1, right: -1, borderBottom: `2px solid ${cornerColor}`, borderRight: `2px solid ${cornerColor}` };
      default: return base;
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "24px 28px",
        background: hovered ? "rgba(74,222,128,0.03)" : "rgba(255,255,255,0.015)",
        border: "1px solid rgba(74,222,128,0.1)",
        marginBottom: 2,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, background 0.3s",
      }}
    >
      <div style={cornerStyle("tl")} />
      <div style={cornerStyle("tr")} />
      <div style={cornerStyle("bl")} />
      <div style={cornerStyle("br")} />
      {label && (
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 20,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.15em",
            color: "rgba(74,222,128,0.7)",
            background: "#050505",
            padding: "0 8px",
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

// ── Glitch Name ────────────────────────────────────────────────────────────

function GlitchName({ name }: { name: string }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        .glitch {
          position: relative;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(38px, 5.5vw, 68px);
          line-height: 0.92;
          letter-spacing: -2px;
          color: #f0ece2;
          display: inline-block;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          overflow: hidden;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
        }

        .glitch::before {
          color: #0ff;
          animation: glitchTop 4s infinite linear;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          left: -2px;
        }

        .glitch::after {
          color: #f0f;
          animation: glitchBot 4s infinite linear;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          left: 2px;
        }

        @keyframes glitchTop {
          0%, 85%   { transform: translate(0,0); opacity: 0; }
          86%       { transform: translate(-3px, -2px); opacity: 0.8; }
          87%       { transform: translate(3px, 0); opacity: 0.5; }
          88%       { transform: translate(0,0); opacity: 0; }
          94%       { transform: translate(2px, -1px); opacity: 0.6; }
          95%       { transform: translate(0,0); opacity: 0; }
          100%      { opacity: 0; }
        }

        @keyframes glitchBot {
          0%, 88%   { transform: translate(0,0); opacity: 0; }
          89%       { transform: translate(3px, 2px); opacity: 0.7; }
          90%       { transform: translate(-3px, 0); opacity: 0.4; }
          91%       { transform: translate(0,0); opacity: 0; }
          97%       { transform: translate(-2px, 1px); opacity: 0.5; }
          98%       { transform: translate(0,0); opacity: 0; }
          100%      { opacity: 0; }
        }
      `}</style>
      <h1 className="glitch" data-text={name}>
        {name}
      </h1>
    </>
  );
}

// ── Typing Title ───────────────────────────────────────────────────────────

function TypingTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, 35);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#4ade80",
        marginTop: 10,
        minHeight: "1.4em",
      }}
    >
      {displayed}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: "1em",
            background: "#4ade80",
            marginLeft: 2,
            verticalAlign: "text-bottom",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      )}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </p>
  );
}

// ── Holographic Photo ──────────────────────────────────────────────────────

function HoloPhoto() {
  return (
    <>
      <style>{`
        @keyframes holoSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes holoSpinRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes holoFlicker {
          0%,100% { opacity: 1; }
          93%     { opacity: 1; }
          94%     { opacity: 0.4; }
          95%     { opacity: 1; }
          98%     { opacity: 0.7; }
          99%     { opacity: 1; }
        }
      `}</style>
      <div style={{ position: "relative", width: 128, height: 128, flexShrink: 0 }}>
        {/* Outer spinning ring */}
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            background: "conic-gradient(#4ade80, #00ffcc, #4ade80, #0f0, transparent 40%, #4ade80)",
            animation: "holoSpin 5s linear infinite",
          }}
        />
        {/* Inner counter-spinning ring */}
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: "conic-gradient(transparent 30%, rgba(0,255,180,0.6), transparent 60%, rgba(74,222,128,0.4))",
            animation: "holoSpinRev 3s linear infinite",
          }}
        />
        {/* Mask to isolate photo area */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#050505",
          }}
        />
        {/* Scanline overlay on photo */}
        <div
          style={{
            position: "absolute",
            inset: 4,
            borderRadius: "50%",
            zIndex: 3,
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(74,222,128,0.06) 3px, rgba(74,222,128,0.06) 4px)",
            animation: "holoFlicker 6s infinite",
          }}
        />
        <img
          src="/images/profile.jpeg"
          alt="Diogo Serrão"
          style={{
            position: "absolute",
            inset: 4,
            width: "calc(100% - 8px)",
            height: "calc(100% - 8px)",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center -24px",
            zIndex: 2,
            animation: "holoFlicker 6s infinite",
          }}
        />
      </div>
    </>
  );
}

// ── Skill Tag ─────────────────────────────────────────────────────────────

function SkillTag({ skill, i }: { skill: string; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "5px 13px",
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        border: hovered ? "1px solid #4ade80" : "1px solid rgba(74,222,128,0.22)",
        color: hovered ? "#050505" : "rgba(232,228,220,0.75)",
        background: hovered ? "#4ade80" : "rgba(74,222,128,0.04)",
        cursor: "default",
        transition: "all 0.18s",
        boxShadow: hovered ? "0 0 14px rgba(74,222,128,0.5), 0 0 28px rgba(74,222,128,0.2)" : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        animationDelay: `${i * 40}ms`,
      }}
    >
      {skill}
    </span>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────

function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(74,222,128,0.5)",
        }}
      >
        //
      </span>
      <h2
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#4ade80",
          margin: 0,
        }}
      >
        {children}
      </h2>
      {id && (
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "rgba(74,222,128,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          [{id}]
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(74,222,128,0.3), transparent)" }} />
    </div>
  );
}

// ── Mouse Glow ────────────────────────────────────────────────────────────

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX - 200}px`;
        ref.current.style.top = `${e.clientY - 200}px`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, rgba(74,222,128,0.04) 40%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.12s linear, top 0.12s linear",
      }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function CVPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #050505;
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.75;
          overflow-x: hidden;
        }

        .cv-root {
          min-height: 100vh;
          position: relative;
          background: #050505;
        }

        .cv-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
          pointer-events: none;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 32px 120px;
          position: relative;
          z-index: 2;
        }

        .header {
          margin-bottom: 72px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(74,222,128,0.08);
          position: relative;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: nowrap;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .contact-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          padding-top: 4px;
        }

        .contact-item {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: rgba(232,228,220,0.45);
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }

        .contact-item::before {
          content: '> ';
          color: rgba(74,222,128,0.4);
        }

        .contact-item:hover {
          color: #4ade80;
        }

        .section {
          margin-bottom: 64px;
        }

        .summary-text {
          font-size: 16px;
          line-height: 1.85;
          color: rgba(232,228,220,0.72);
          max-width: 700px;
          border-left: 2px solid rgba(74,222,128,0.2);
          padding-left: 20px;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .exp-company {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          color: #f0ece2;
          letter-spacing: 0.04em;
        }

        .exp-role {
          font-size: 13px;
          color: #4ade80;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.05em;
          margin: 4px 0;
        }

        .exp-period {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(74,222,128,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .exp-item {
          font-size: 14px;
          color: rgba(232,228,220,0.65);
          padding: 5px 0 5px 18px;
          position: relative;
          border-bottom: 1px solid rgba(74,222,128,0.04);
        }

        .exp-item::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: rgba(74,222,128,0.5);
          font-size: 10px;
          top: 7px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 12px;
        }

        .project-card {
          position: relative;
          padding: 20px 22px;
          border: 1px solid rgba(74,222,128,0.1);
          background: rgba(255,255,255,0.01);
          text-decoration: none;
          display: block;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 1px;
          background: linear-gradient(to right, transparent, #4ade80, transparent);
          transition: left 0.4s ease;
        }

        .project-card:hover {
          border-color: rgba(74,222,128,0.35);
          background: rgba(74,222,128,0.03);
          transform: translateY(-3px);
        }

        .project-card:hover::before {
          left: 140%;
        }

        .project-corner-tl,
        .project-corner-br {
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          transition: border-color 0.25s;
        }

        .project-corner-tl {
          top: -1px; left: -1px;
          border-top: 2px solid rgba(74,222,128,0.35);
          border-left: 2px solid rgba(74,222,128,0.35);
        }

        .project-corner-br {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid rgba(74,222,128,0.35);
          border-right: 2px solid rgba(74,222,128,0.35);
        }

        .project-card:hover .project-corner-tl,
        .project-card:hover .project-corner-br {
          border-color: #4ade80;
        }

        .project-name {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: #f0ece2;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .project-date {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: rgba(74,222,128,0.45);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .project-desc {
          font-size: 13px;
          color: rgba(232,228,220,0.55);
          line-height: 1.6;
        }

        .project-url {
          margin-top: 12px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(74,222,128,0.5);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .project-url::before {
          content: '→';
          color: #4ade80;
        }

        .edu-degree {
          font-size: 15px;
          font-weight: 500;
          color: #f0ece2;
          margin-bottom: 3px;
        }

        .edu-school {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #4ade80;
          letter-spacing: 0.06em;
          margin-bottom: 3px;
        }

        .edu-period {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: rgba(74,222,128,0.4);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .edu-detail {
          font-size: 13px;
          color: rgba(232,228,220,0.5);
          line-height: 1.65;
          border-left: 1px solid rgba(74,222,128,0.15);
          padding-left: 14px;
          margin-top: 8px;
        }

        /* ── HUD coords ── */
        .hud-coord {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: rgba(74,222,128,0.2);
          letter-spacing: 0.1em;
          position: absolute;
        }

        @media (max-width: 768px) {
          .container { padding: 56px 20px 90px; }
          .header-top { flex-direction: column; align-items: flex-start; }
          .contact-block { align-items: flex-start; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cv-root">
        <MouseGlow />
        <MatrixRain side="left" />
        <MatrixRain side="right" />
        <Scanlines />
        <Ticker top={true} />
        <Ticker top={false} />

        <div className="container">

          {/* ─── HEADER ─── */}
          <header className="header">
            <span className="hud-coord" style={{ top: 0, right: 0 }}>
              32.6333°N 16.9000°W
            </span>
            <div className="header-top">
              <div className="header-left">
                <HoloPhoto />
                <div>
                  <GlitchName name={CV_DATA.name} />
                  <TypingTitle text={CV_DATA.title} />
                </div>
              </div>
              <div className="contact-block">
                <span className="contact-item">{CV_DATA.location}</span>
                <a href={`tel:${CV_DATA.phone}`} className="contact-item">{CV_DATA.phone}</a>
                <a href={`mailto:${CV_DATA.email}`} className="contact-item">{CV_DATA.email}</a>
              </div>
            </div>
          </header>

          {/* ─── SUMMARY ─── */}
          <section className="section">
            <SectionLabel id="001">Resumo</SectionLabel>
            <HudCard index={0}>
              <p className="summary-text">{CV_DATA.summary}</p>
            </HudCard>
          </section>

          {/* ─── SKILLS ─── */}
          <section className="section">
            <SectionLabel id="002">Tecnologias</SectionLabel>
            <div className="skills-grid">
              {CV_DATA.skills.map((skill, i) => (
                <SkillTag key={skill} skill={skill} i={i} />
              ))}
            </div>
          </section>

          {/* ─── EXPERIENCE ─── */}
          <section className="section">
            <SectionLabel id="003">Experiência</SectionLabel>
            {CV_DATA.experience.map((exp, i) => (
              <HudCard key={exp.company} label="EXP_ENTRY" index={i + 2}>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-period">{exp.period}</div>
                {exp.items.map((item, j) => (
                  <div key={j} className="exp-item">{item}</div>
                ))}
              </HudCard>
            ))}
          </section>

          {/* ─── PROJECTS ─── */}
          <section className="section">
            <SectionLabel id="004">Projetos</SectionLabel>
            <div className="projects-grid">
              {CV_DATA.projects.map((proj, i) => (
                <a key={proj.name} href={proj.url} target="_blank" rel="noopener noreferrer" className="project-card">
                  <div className="project-corner-tl" />
                  <div className="project-corner-br" />
                  <div className="project-name">{proj.name}</div>
                  <div className="project-date">{proj.date}</div>
                  <div className="project-desc">{proj.description}</div>
                  <div className="project-url">{proj.url.replace("https://", "").replace("http://", "")}</div>
                </a>
              ))}
            </div>
          </section>

          {/* ─── EDUCATION ─── */}
          <section className="section">
            <SectionLabel id="005">Formação</SectionLabel>
            {CV_DATA.education.map((edu, i) => (
              <HudCard key={edu.degree} label={`EDU_${String(i + 1).padStart(2, "0")}`} index={i + 5}>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-period">{edu.period}</div>
                {edu.detail && <p className="edu-detail">{edu.detail}</p>}
              </HudCard>
            ))}
          </section>

        </div>
      </div>
    </>
  );
}