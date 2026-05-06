"use client";

import { useState, useEffect, ReactNode } from "react";

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
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Java",
    "Python",
    "PHP",
    "MySQL",
    "MongoDB",
    "Git",
    "Laravel",
  ],
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
    {
      name: "Casa da Nati",
      date: "Nov 2024",
      description:
        "Criação do site com Next.js e integração de um sistema de reservas.",
      url: "https://casadanati.com",
    },
    {
      name: "Taxi Madeira Tour",
      date: "Out 2025",
      description:
        "Website para o setor do turismo na Madeira, com apresentação de serviços e navegação otimizada para mobile.",
      url: "https://taximadeiratour.com",
    },
    {
      name: "Fundação João Pereira",
      date: "Março 2025",
      description:
        "Website institucional com painel de administração personalizado para gestão de conteúdos e publicações.",
      url: "https://fundacaojoaopereira.pt/",
    },
    {
      name: "Rumos Paralelos",
      date: "Março 2026",
      description:
        "Website para empresa de construção civil e transportes, focado na apresentação de serviços.",
      url: "https://www.rumosparalelos.com/",
    },
  ],
  education: [
    {
      degree: "Licenciatura em Engenharia Informática",
      school: "Universidade da Madeira",
      period: "Setembro 2025 – Presente",
    },
    {
      degree: "CTeSP – Tecnologias e Programação de Sistemas de Informação",
      school: "Universidade da Madeira",
      period: "Setembro 2023 – Junho 2025",
      detail:
        "Formação técnica em engenharia de software, desenvolvimento frontend e backend, bases de dados, redes de computadores, segurança informática e sistemas de informação. Desenvolvimento de projetos práticos com tecnologias modernas como React, Next.js, Java, Python e Laravel.",
    },
    {
      degree: "Certificação em Inglês – Nível B2",
      school: "Cambridge School, Funchal",
      period: "Junho 2022",
    },
  ],
};

// ── AnimatedSection ────────────────────────────────────────────────────────

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CVPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.7;
        }

        .cv-root {
          min-height: 100vh;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: fixed;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .bg-glow-2 {
          position: fixed;
          bottom: -20%;
          left: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          padding: 80px 32px 120px;
          position: relative;
          z-index: 1;
        }

        .header {
          margin-bottom: 80px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 56px;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          flex-wrap: nowrap;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }
        .profile-photo-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 6px;
        }
        .profile-photo-wrapper::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(#4ade80, transparent 60%, #4ade80);
          z-index: 0;
          animation: spin 8s linear infinite;
        }
        .profile-photo-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #0a0a0a;
          z-index: 1;
        }
        .profile-photo {
          position: relative;
          z-index: 2;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center -24px;
          display: block;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 64px);
          line-height: 0.95;
          letter-spacing: -2px;
          color: #f5f0e8;
          margin-bottom: 12px;
        }
        .name em {
          font-style: italic;
          color: #4ade80;
        }
        .job-title {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #4ade80;
        }
        .contact-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          padding-top: 8px;
        }
        .contact-item {
          font-size: 13px;
          color: rgba(232,228,220,0.55);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.3px;
        }
        .contact-item:hover { color: #4ade80; }

        .section { margin-bottom: 72px; }
        .section-label {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #4ade80;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .summary-text {
          font-size: 17px;
          line-height: 1.9;
          color: rgba(232,228,220,0.78);
          max-width: 720px;
        }

        .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
          padding: 6px 14px;
          border: 1px solid rgba(74,222,128,0.2);
          border-radius: 2px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: rgba(232,228,220,0.75);
          background: rgba(74,222,128,0.04);
          transition: all 0.2s;
          cursor: default;
        }
        .skill-tag:hover {
          border-color: rgba(74,222,128,0.6);
          color: #4ade80;
          background: rgba(74,222,128,0.08);
        }

        .exp-item {
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .exp-item:first-child { padding-top: 0; }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }
        .exp-company {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #f5f0e8;
        }
        .exp-period {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(232,228,220,0.35);
          text-transform: uppercase;
        }
        .exp-role {
          font-size: 13px;
          color: #4ade80;
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-bottom: 16px;
        }
        .exp-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .exp-list li {
          font-size: 14px;
          color: rgba(232,228,220,0.6);
          padding-left: 16px;
          position: relative;
        }
        .exp-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: rgba(74,222,128,0.5);
          font-size: 12px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.04);
        }
        .project-card {
          background: #0a0a0a;
          padding: 28px 32px;
          cursor: pointer;
          text-decoration: none;
          display: block;
          transition: background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(74,222,128,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover { background: #0f0f0f; }
        .project-card:hover::before { opacity: 1; }
        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 10px;
        }
        .project-name {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #f5f0e8;
          transition: color 0.2s;
        }
        .project-card:hover .project-name { color: #4ade80; }
        .project-date {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(232,228,220,0.3);
          text-transform: uppercase;
        }
        .project-desc {
          font-size: 13px;
          color: rgba(232,228,220,0.55);
          line-height: 1.65;
          margin-bottom: 14px;
        }
        .project-link {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(74,222,128,0.6);
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .project-link::after { content: '↗'; font-size: 13px; }

        .edu-item {
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: start;
        }
        .edu-item:first-child { padding-top: 0; }
        .edu-degree {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #f5f0e8;
          margin-bottom: 4px;
        }
        .edu-school {
          font-size: 13px;
          color: rgba(74,222,128,0.8);
          margin-bottom: 6px;
          font-weight: 500;
        }
        .edu-detail {
          font-size: 13px;
          color: rgba(232,228,220,0.45);
          line-height: 1.6;
        }
        .edu-period {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(232,228,220,0.3);
          text-transform: uppercase;
          white-space: nowrap;
          padding-top: 3px;
        }

        .footer {
          margin-top: 100px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-name {
          font-family: 'DM Serif Display', serif;
          font-size: 15px;
          color: rgba(232,228,220,0.3);
        }
        .footer-note {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(232,228,220,0.2);
        }

        @media (max-width: 600px) {
          .container { padding: 48px 20px 80px; }
          .header-top { flex-direction: column; }
          .contact-block { align-items: flex-start; }
          .projects-grid { grid-template-columns: 1fr; }
          .edu-item { grid-template-columns: 1fr; }
          .edu-period { order: -1; }
        }
      `}</style>

      <div className="cv-root">
        <div className="bg-glow" />
        <div className="bg-glow-2" />

        <div className="container">
          {/* ── HEADER ── */}
          <AnimatedSection delay={0}>
            <header className="header">
              <div className="header-top">
                <div className="header-left">
                  <div className="profile-photo-wrapper">
                    <img
                      src="/images/profile.jpeg"
                      alt="Diogo Serrão"
                      width={88}
                      height={88}
                      className="profile-photo"
                    />
                  </div>
                  <div>
                    <h1 className="name">
                      Diogo Serrão
                    </h1>
                    <p className="job-title">{CV_DATA.title}</p>
                  </div>
                </div>
                <div className="contact-block">
                  <span className="contact-item">{CV_DATA.location}</span>
                  <a href={`tel:${CV_DATA.phone}`} className="contact-item">
                    {CV_DATA.phone}
                  </a>
                  <a href={`mailto:${CV_DATA.email}`} className="contact-item">
                    {CV_DATA.email}
                  </a>
                </div>
              </div>
            </header>
          </AnimatedSection>

          {/* ── RESUMO ── */}
          <AnimatedSection delay={120}>
            <section className="section">
              <h2 className="section-label">Resumo</h2>
              <p className="summary-text">{CV_DATA.summary}</p>
            </section>
          </AnimatedSection>

          {/* ── TECNOLOGIAS ── */}
          <AnimatedSection delay={200}>
            <section className="section">
              <h2 className="section-label">Tecnologias</h2>
              <div className="skills-grid">
                {CV_DATA.skills.map((skill: string) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* ── EXPERIÊNCIA ── */}
          <AnimatedSection delay={280}>
            <section className="section">
              <h2 className="section-label">Experiência</h2>
              {CV_DATA.experience.map((exp: ExperienceItem) => (
                <div key={exp.company} className="exp-item">
                  <div className="exp-header">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <p className="exp-role">{exp.role}</p>
                  <ul className="exp-list">
                    {exp.items.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* ── PROJETOS ── */}
          <AnimatedSection delay={360}>
            <section className="section">
              <h2 className="section-label">Projetos</h2>
              <div className="projects-grid">
                {CV_DATA.projects.map((project: Project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                    onMouseEnter={() => setHoveredProject(project.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="project-top">
                      <span className="project-name">{project.name}</span>
                      <span className="project-date">{project.date}</span>
                    </div>
                    <p className="project-desc">{project.description}</p>
                    <span className="project-link">Ver projeto</span>
                  </a>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* ── EDUCAÇÃO ── */}
          <AnimatedSection delay={440}>
            <section className="section">
              <h2 className="section-label">Educação</h2>
              {CV_DATA.education.map((edu: EducationItem) => (
                <div key={edu.degree} className="edu-item">
                  <div>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-school">{edu.school}</p>
                    {edu.detail && <p className="edu-detail">{edu.detail}</p>}
                  </div>
                  <span className="edu-period">{edu.period}</span>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* ── FOOTER ── */}
          <AnimatedSection delay={520}>
            <footer className="footer">
              <span className="footer-name">Diogo Serrão</span>
              <span className="footer-note">
                Madeira, Portugal · {new Date().getFullYear()}
              </span>
            </footer>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
