import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── global styles ────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  @keyframes drift {
    0%   { background-position: 0 0; }
    100% { background-position: 48px 48px; }
  }
  @keyframes orb-float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-24px) scale(1.04); }
  }
  @keyframes orb-float-r {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(20px) scale(0.97); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes tap-bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.92); }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.4); }
  }
  @keyframes bubble-ring {
    0%   { box-shadow: 0 0 0 0 rgba(220,38,38,0.6); }
    70%  { box-shadow: 0 0 0 12px rgba(220,38,38,0); }
    100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
  }
  @keyframes chat-in  {
    from { opacity: 0; transform: translateY(18px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes chat-out {
    from { opacity: 1; transform: translateY(0)    scale(1); }
    to   { opacity: 0; transform: translateY(18px) scale(0.96); }
  }
  @keyframes badge-pop {
    0%   { transform: scale(0); }
    65%  { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; font-size: 15px; }
  body {
    font-family: 'Inter', sans-serif;
    background: #080808;
    color: #f0f0f0;
    margin: 0;
  }

  .mono { font-family: 'JetBrains Mono', monospace; }

  /* dot grid */
  .dot-grid {
    background-image: radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 32px 32px;
    animation: drift 10s linear infinite;
  }

  /* mesh orbs */
  .orb-red {
    position: fixed; border-radius: 50%;
    filter: blur(80px); pointer-events: none;
    background: radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 70%);
    animation: orb-float 9s ease-in-out infinite;
  }
  .orb-dark {
    position: fixed; border-radius: 50%;
    filter: blur(100px); pointer-events: none;
    background: radial-gradient(circle, rgba(120,10,10,0.18) 0%, transparent 70%);
    animation: orb-float-r 12s ease-in-out infinite;
  }

  /* scanline */
  .scanline {
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);
    animation: scanline 7s linear infinite;
    pointer-events: none; z-index: 9999;
  }

  /* animations */
  .fade-up       { animation: fade-up 0.45s ease both; }
  .anim-tap      { animation: tap-bounce 0.25s ease; }
  .anim-badge    { animation: badge-pop 0.3s ease both; }
  .chat-enter    { animation: chat-in  0.22s ease both; }
  .chat-exit     { animation: chat-out 0.18s ease both; }
  .bubble-pulse  { animation: bubble-ring 2.4s ease infinite; }

  /* shimmer button */
  .btn-shimmer {
    background: linear-gradient(90deg, #dc2626, #ef4444, #dc2626);
    background-size: 200% auto;
    transition: background-position 0.4s ease;
  }
  .btn-shimmer:hover { animation: shimmer 1.2s linear infinite; }

  /* scrollbar */
  ::-webkit-scrollbar       { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #080808; }
  ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 2px; }

  /* form inputs */
  .field {
    width: 100%;
    background: #111;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #f0f0f0;
    outline: none;
    transition: border-color 0.15s;
  }
  .field::placeholder { color: #555; }
  .field:focus        { border-color: #dc2626; }
  select.field option { background: #111; }

  /* nav active */
  .nav-active {
    color: #dc2626;
    border: 1px solid rgba(220,38,38,0.35);
    background: rgba(220,38,38,0.07);
  }

  /* section divider label */
  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
  }

  /* card hover lift */
  .card-lift {
    transition: transform 0.18s ease, border-color 0.18s ease;
  }
  .card-lift:hover {
    transform: translateY(-2px);
    border-color: rgba(220,38,38,0.45);
  }
`;

// ─── constants ────────────────────────────────────────────────────────────────

const EMAIL = "ghostnether28@gmail.com";
const WHATSAPP = "5511913548544";
const WA_URL = `https://wa.me/${WHATSAPP}`;

// ─── types ────────────────────────────────────────────────────────────────────

interface GHUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  company: string;
  public_repos: number;
  followers: number;
  following: number;
  hireable: boolean;
  html_url: string;
  created_at: string;
}
interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
}
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Quem é Manoel?",
    a: "Manoel Edivaldo — estudante de Eng. de Software em São Paulo, focado em Low-Level, Linux e Clean Code. Trabalha na Mila e explora computação de baixo nível.",
  },
  {
    q: "Projetos em destaque?",
    a: "CPU-reader-proc (monitor em Assembly), Nexus-OS (microkernel experimental), ASM_taskManager-v.1 e ContactManager em C são os principais.",
  },
  {
    q: "Stack e linguagens?",
    a: "Assembly x86-64 é o foco principal, seguido de C. Para web: HTML/CSS/JS. Ambiente Linux. Também trabalha com design gráfico e identidade visual.",
  },
  {
    q: "Faz design também?",
    a: "Sim! Além de desenvolvimento de sistemas, oferece serviços de design gráfico, identidade visual e UI. Entre em contato para solicitar um orçamento.",
  },
  {
    q: "Como solicitar orçamento?",
    a: "Use a seção #orçamento nesta página, envie um email para ghostnether28@gmail.com ou chame no WhatsApp: +55 11 91354-8544.",
  },
];

function autoReply(input: string): string {
  const t = input.toLowerCase();
  if (/(quem|manoel|bio|sobre)/.test(t)) return FAQ[0].a;
  if (/(projeto|repo|repositório)/.test(t)) return FAQ[1].a;
  if (/(linguagem|stack|tecnolog|assembly|asm|\bc\b)/.test(t))
    return FAQ[2].a;
  if (/(design|logo|identidade|visual|ui|brand)/.test(t))
    return FAQ[3].a;
  if (/(orçamento|preço|custo|valor|serviço|contratar)/.test(t))
    return FAQ[4].a;
  if (/(contato|email|whatsapp|falar|mensagem)/.test(t))
    return `Você pode me contatar por email: ${EMAIL} ou WhatsApp: +55 11 91354-8544.`;
  if (/(kernel|nexus|microkernel)/.test(t))
    return "Nexus-OS é um microkernel experimental em Assembly — scheduling básico e gerenciamento de memória sem abstrações de alto nível.";
  if (/(linux)/.test(t))
    return "Linux é o ambiente principal — todos os projetos são desenvolvidos e testados em Linux.";
  return "Não tenho uma resposta específica. Tente uma das perguntas rápidas abaixo ou visite github.com/m-axl.";
}

// ─── helpers ──────────────────────────────────────────────────────────────────

const LANG_COLOR: Record<string, string> = {
  Assembly: "#6f42c1",
  C: "#555555",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  Rust: "#dea584",
};

function LangPill({ lang }: { lang: string | null }) {
  if (!lang) return null;
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.72rem",
        color: "#737373",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: LANG_COLOR[lang] ?? "#888",
          flexShrink: 0,
        }}
      />
      {lang}
    </span>
  );
}

function useTap() {
  const [tapping, setTapping] = useState(false);
  const tap = useCallback(() => {
    setTapping(false);
    requestAnimationFrame(() => {
      setTapping(true);
      setTimeout(() => setTapping(false), 260);
    });
  }, []);
  return { tapping, tap };
}

function SectionHead({
  label,
  count,
}: {
  label: string;
  count?: number | string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <span className="section-label">{label}</span>
      <div
        style={{ flex: 1, height: 1, background: "#1f1f1f" }}
      />
      {count !== undefined && (
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.72rem",
            color: "#dc2626",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* dot grid */}
        <div
          className="dot-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.7,
          }}
        />
        {/* gradient overlay — darkens edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(30,0,0,0.4) 0%, transparent 60%)",
          }}
        />
      </div>
      {/* floating orbs */}
      <div
        className="orb-red"
        style={{
          width: 420,
          height: 420,
          top: "-80px",
          left: "-120px",
          zIndex: 0,
        }}
      />
      <div
        className="orb-dark"
        style={{
          width: 360,
          height: 360,
          bottom: "10%",
          right: "-80px",
          zIndex: 0,
        }}
      />
      <div
        className="orb-red"
        style={{
          width: 280,
          height: 280,
          top: "55%",
          left: "60%",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div className="scanline" />
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#sobre", label: "sobre" },
  { href: "#repositorios", label: "repos" },
  { href: "#contato", label: "contato" },
  { href: "#orcamento", label: "orçamento" },
];

function Nav({ user }: { user: GHUser | null }) {
  const [active, setActive] = useState("#sobre");

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #1a1a1a",
        background: "rgba(8,8,8,0.88)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          maxWidth: 768,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: "0.82rem",
            color: "#555",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#dc2626" }}>~/</span>
          {user?.login ?? "m-axl"}
        </span>

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 4,
            overflowX: "auto",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setActive(href)}
              className={`mono ${active === href ? "nav-active" : ""}`}
              style={{
                fontSize: "0.72rem",
                padding: "5px 10px",
                borderRadius: 6,
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                color: active === href ? "#dc2626" : "#555",
                transition: "color 0.15s",
                border:
                  active === href
                    ? undefined
                    : "1px solid transparent",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/m-axl"
          target="_blank"
          rel="noopener noreferrer"
          className="mono"
          style={{
            fontSize: "0.72rem",
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid #1f1f1f",
            color: "#555",
            textDecoration: "none",
            flexShrink: 0,
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.borderColor =
              "#dc2626";
            (e.target as HTMLElement).style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.borderColor =
              "#1f1f1f";
            (e.target as HTMLElement).style.color = "#555";
          }}
        >
          github ↗
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ user }: { user: GHUser | null }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 80);
  }, []);
  const joinYear = user
    ? new Date(user.created_at).getFullYear()
    : "—";

  return (
    <section
      id="sobre"
      className={show ? "fade-up" : ""}
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 768,
        margin: "0 auto",
        padding: "56px 20px 48px",
        opacity: show ? 1 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          alignItems: "center",
        }}
      >
        {/* avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              border: "2px solid #dc2626",
              overflow: "hidden",
              background: "#111",
            }}
          >
            {user && (
              <img
                src={user.avatar_url}
                alt={user.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          {user?.hireable && (
            <span
              title="Disponível para contratação"
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#22c55e",
                border: "2.5px solid #080808",
              }}
            />
          )}
        </div>

        {/* info */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#f0f0f0",
                margin: 0,
              }}
            >
              {user?.name ?? "Manoel Edivaldo"}
            </h1>
            <span
              className="mono"
              style={{
                fontSize: "0.7rem",
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(220,38,38,0.1)",
                color: "#dc2626",
                border: "1px solid rgba(220,38,38,0.2)",
              }}
            >
              @{user?.login ?? "m-axl"}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              color: "#737373",
              lineHeight: 1.65,
              marginBottom: 12,
              maxWidth: 440,
            }}
          >
            {user?.bio ??
              "Software Engineer Student | Low-Level | Clean Code | Linux"}
          </p>
          <div
            className="mono"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              fontSize: "0.72rem",
              color: "#555",
            }}
          >
            {user?.location && <span>📍 {user.location}</span>}
            {user?.company && (
              <span>🏢 {user.company.trim()}</span>
            )}
            <span>📅 desde {joinYear}</span>
          </div>
        </div>
      </div>

      {/* stats */}
      <div
        style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1,
          background: "#1a1a1a",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {[
          {
            label: "Repositórios",
            value: user?.public_repos ?? "—",
          },
          {
            label: "Seguidores",
            value: user?.followers ?? "—",
          },
          { label: "Seguindo", value: user?.following ?? "—" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: "#111",
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#dc2626",
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "#555",
                marginTop: 2,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Repos ────────────────────────────────────────────────────────────────────

function RepoCard({
  repo,
  idx,
}: {
  repo: GHRepo;
  idx: number;
}) {
  const { tapping, tap } = useTap();
  const updated = new Date(repo.updated_at).toLocaleDateString(
    "pt-BR",
    { month: "short", year: "numeric" },
  );

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={tap}
      className={`card-lift ${tapping ? "anim-tap" : ""}`}
      style={{
        display: "block",
        border: "1px solid #1f1f1f",
        borderRadius: 10,
        background: "#0f0f0f",
        padding: "16px",
        textDecoration: "none",
        animationDelay: `${idx * 55}ms`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#e0e0e0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {repo.name}
        </span>
        <span
          className="mono"
          style={{
            fontSize: "0.72rem",
            color: "#555",
            flexShrink: 0,
          }}
        >
          ★ {repo.stargazers_count}
        </span>
      </div>
      {repo.description && (
        <p
          style={{
            fontSize: "0.78rem",
            color: "#737373",
            lineHeight: 1.55,
            marginBottom: 12,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {repo.description}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LangPill lang={repo.language} />
        <span style={{ fontSize: "0.7rem", color: "#444" }}>
          {updated}
        </span>
      </div>
    </a>
  );
}

function Repos({ repos }: { repos: GHRepo[] }) {
  return (
    <section
      id="repositorios"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 768,
        margin: "0 auto",
        padding: "0 20px 48px",
        scrollMarginTop: 64,
      }}
    >
      <SectionHead
        label="Repositórios"
        count={repos.length || "—"}
      />
      {repos.length === 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 100,
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: 10,
                animation: "pulse-dot 1.5s ease infinite",
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {repos.map((r, i) => (
            <RepoCard key={r.id} repo={r} idx={i} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact({ user }: { user: GHUser | null }) {
  const [copied, setCopied] = useState(false);
  const { tapping: tE, tap: tapE } = useTap();
  const { tapping: tW, tap: tapW } = useTap();
  const { tapping: tG, tap: tapG } = useTap();

  function copyEmail() {
    tapE();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const cards = [
    {
      icon: "✉️",
      label: "Email",
      value: EMAIL,
      action: copyEmail,
      actionLabel: copied ? "copiado ✓" : "copiar",
      tapping: tE,
      href: undefined,
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: "+55 11 91354-8544",
      action: tapW,
      actionLabel: "abrir chat ↗",
      tapping: tW,
      href: WA_URL,
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: `github.com/${user?.login ?? "m-axl"}`,
      action: tapG,
      actionLabel: "ver perfil ↗",
      tapping: tG,
      href: user?.html_url ?? "https://github.com/m-axl",
    },
  ];

  return (
    <section
      id="contato"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 768,
        margin: "0 auto",
        padding: "0 20px 48px",
        scrollMarginTop: 64,
      }}
    >
      <SectionHead label="Contate-me" />

      <div
        style={{
          border: "1px solid #1f1f1f",
          borderRadius: 12,
          background: "#0f0f0f",
          overflow: "hidden",
        }}
      >
        {/* accent strip */}
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, #dc2626, #ef4444, #dc2626)",
          }}
        />

        <div
          style={{
            padding: "24px 20px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.label}
              style={{
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                padding: "16px",
                background: "#111",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: "1rem" }}>
                  {card.icon}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.68rem",
                    color: "#555",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {card.label}
                </span>
              </div>
              <span
                className="mono"
                style={{
                  fontSize: "0.78rem",
                  color: "#e0e0e0",
                  wordBreak: "break-all",
                }}
              >
                {card.value}
              </span>
              {card.href ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={card.action}
                  className={card.tapping ? "anim-tap" : ""}
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    padding: "5px 10px",
                    borderRadius: 5,
                    border: "1px solid #222",
                    color: "#737373",
                    textDecoration: "none",
                    transition:
                      "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.target as HTMLElement
                    ).style.borderColor = "#dc2626";
                    (e.target as HTMLElement).style.color =
                      "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.target as HTMLElement
                    ).style.borderColor = "#222";
                    (e.target as HTMLElement).style.color =
                      "#737373";
                  }}
                >
                  {card.actionLabel}
                </a>
              ) : (
                <button
                  onClick={card.action}
                  className={card.tapping ? "anim-tap" : ""}
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    padding: "5px 10px",
                    borderRadius: 5,
                    border: "1px solid #222",
                    color: "#737373",
                    background: "none",
                    cursor: "pointer",
                    transition:
                      "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.target as HTMLElement
                    ).style.borderColor = "#dc2626";
                    (e.target as HTMLElement).style.color =
                      "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.target as HTMLElement
                    ).style.borderColor = "#222";
                    (e.target as HTMLElement).style.color =
                      "#737373";
                  }}
                >
                  {card.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              flexShrink: 0,
              animation: "pulse-dot 2s ease infinite",
            }}
          />
          <span
            className="mono"
            style={{ fontSize: "0.7rem", color: "#555" }}
          >
            Disponível para oportunidades remotas · São Paulo,
            BR
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Budget / Orçamento ───────────────────────────────────────────────────────

const SERVICES = [
  "Desenvolvimento de sistemas (C / Assembly)",
  "Desenvolvimento web (HTML · CSS · JS)",
  "Design gráfico / Identidade visual",
  "UI/UX Design",
  "Design + Desenvolvimento (completo)",
  "Consultoria técnica",
  "Outro",
];

const BUDGETS = [
  "Até R$ 500",
  "R$ 500 – R$ 2.000",
  "R$ 2.000 – R$ 5.000",
  "R$ 5.000+",
  "A definir",
];

type FormState = "idle" | "sending" | "sent" | "error";

function Budget() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const { tapping, tap } = useTap();

  function set(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

async function submit(e: React.FormEvent) {
    e.preventDefault();
    tap();
    setStatus("sending");
    try{
      const response=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
      });
      const data=await response.json();
      if(!response.ok||!data.success) throw new Error();
      setStatus("sent");
    }catch(err){
      console.error(err);
      setStatus("error");
    }
}


  const wa_msg = encodeURIComponent(
    `Olá Manoel! Vi seu portfólio e tenho interesse em contratar o serviço: ${form.service || "…"}. Meu nome é ${form.name || "…"}.`,
  );

  return (
    <section
      id="orcamento"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 768,
        margin: "0 auto",
        padding: "0 20px 64px",
        scrollMarginTop: 64,
      }}
    >
      <SectionHead label="Solicitar Orçamento" />

      <div
        style={{
          border: "1px solid #1f1f1f",
          borderRadius: 12,
          background: "#0f0f0f",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, #dc2626, #ef4444, #dc2626)",
          }}
        />

        {/* service tags */}
        <div style={{ padding: "20px 20px 0" }}>
          <p
            style={{
              fontSize: "0.82rem",
              color: "#737373",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            Ofereço serviços de{" "}
            <strong style={{ color: "#e0e0e0" }}>
              desenvolvimento de sistemas
            </strong>
            , <strong style={{ color: "#e0e0e0" }}>web</strong>{" "}
            e{" "}
            <strong style={{ color: "#e0e0e0" }}>
              design gráfico / identidade visual
            </strong>
            . Preencha o formulário ou entre em contato direto
            pelo WhatsApp.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {[
              "Low-Level / Sistemas",
              "Web",
              "Design Gráfico",
              "Identidade Visual",
              "UI Design",
            ].map((tag) => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize: "0.68rem",
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: "1px solid #222",
                  color: "#555",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {status === "sent" ? (
          <div
            style={{
              padding: "40px 20px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>
              ✅
            </div>
            <p
              style={{
                color: "#e0e0e0",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              Mensagem enviada!
            </p>
            <p
              style={{ fontSize: "0.82rem", color: "#737373" }}
            >
              Responderei em até 24h. Obrigado!
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setForm({
                  name: "",
                  email: "",
                  service: "",
                  budget: "",
                  message: "",
                });
              }}
              style={{
                marginTop: 20,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem",
                padding: "7px 14px",
                borderRadius: 6,
                border: "1px solid #222",
                background: "none",
                color: "#737373",
                cursor: "pointer",
              }}
            >
              novo orçamento
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            style={{ padding: "0 20px 20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  Nome *
                </label>
                <input
                  className="field"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={set("name")}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  Email *
                </label>
                <input
                  className="field"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  Serviço *
                </label>
                <select
                  className="field"
                  value={form.service}
                  onChange={set("service")}
                  required
                >
                  <option value="">Selecione…</option>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  Orçamento estimado
                </label>
                <select
                  className="field"
                  value={form.budget}
                  onChange={set("budget")}
                >
                  <option value="">Selecione…</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "#555",
                  marginBottom: 5,
                }}
              >
                Descreva o projeto *
              </label>
              <textarea
                className="field"
                rows={4}
                placeholder="Conte um pouco sobre o projeto, prazos e objetivos…"
                value={form.message}
                onChange={set("message")}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <button
                type="submit"
                className={`btn-shimmer ${tapping ? "anim-tap" : ""}`}
                disabled={status === "sending"}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  opacity: status === "sending" ? 0.6 : 1,
                }}
              >
                {status === "sending"
                  ? "enviando…"
                  : "enviar solicitação"}
              </button>

              <a
                href={`${WA_URL}?text=${wa_msg}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "1px solid #222",
                  color: "#737373",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#25d366";
                  el.style.color = "#25d366";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#222";
                  el.style.color = "#737373";
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Floating Chat ────────────────────────────────────────────────────────────

function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Olá! Sou o assistente do perfil m-axl. Escolha uma pergunta rápida ou escreva a sua 👇",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { tapping, tap } = useTap();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function openChat() {
    setMounted(true);
    setOpen(true);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 250);
  }
  function closeChat() {
    setOpen(false);
    setTimeout(() => setMounted(false), 200);
  }
  function toggle() {
    tap();
    open ? closeChat() : openChat();
  }

  function send(text: string) {
    if (!text.trim() || typing) return;
    setMessages((p) => [
      ...p,
      { id: Date.now(), role: "user", text: text.trim() },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: autoReply(text),
        },
      ]);
      setTyping(false);
    }, 750);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}
    >
      {/* panel */}
      {mounted && (
        <div
          className={open ? "chat-enter" : "chat-exit"}
          style={{
            width: "min(340px, calc(100vw - 40px))",
            maxHeight: "min(500px, 72vh)",
            border: "1px solid #1f1f1f",
            borderRadius: 16,
            background: "#0e0e0e",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid #1a1a1a",
              background: "#111",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  border: "1px solid #222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                }}
              >
                🤖
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "#e0e0e0",
                  }}
                >
                  Assistente m-axl
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 1,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      animation: "pulse-dot 2s ease infinite",
                    }}
                  />
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.65rem",
                      color: "#555",
                    }}
                  >
                    online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={closeChat}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid #222",
                background: "none",
                color: "#555",
                cursor: "pointer",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
            >
              ×
            </button>
          </div>

          {/* messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent:
                    m.role === "user"
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "84%",
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                    padding: "9px 13px",
                    borderRadius: 14,
                    ...(m.role === "user"
                      ? {
                          background: "#dc2626",
                          color: "#fff",
                          borderBottomRightRadius: 4,
                        }
                      : {
                          background: "#1a1a1a",
                          color: "#e0e0e0",
                          border: "1px solid #222",
                          borderBottomLeftRadius: 4,
                        }),
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #222",
                    borderRadius: 14,
                    borderBottomLeftRadius: 4,
                    padding: "9px 13px",
                  }}
                >
                  <span style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#555",
                          animation: `pulse-dot 1.2s ease ${i * 0.18}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* FAQ chips */}
          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: "10px 12px",
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              flexShrink: 0,
            }}
          >
            {FAQ.map((f) => (
              <button
                key={f.q}
                onClick={() => send(f.q)}
                className="mono"
                style={{
                  fontSize: "0.65rem",
                  padding: "4px 9px",
                  borderRadius: 20,
                  border: "1px solid #222",
                  background: "none",
                  color: "#555",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "#dc2626";
                  (e.target as HTMLElement).style.color =
                    "#dc2626";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "#222";
                  (e.target as HTMLElement).style.color =
                    "#555";
                }}
              >
                {f.q}
              </button>
            ))}
          </div>

          {/* input */}
          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: "10px 12px",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && send(input)
              }
              placeholder="Escreva uma mensagem…"
              className="field"
              style={{
                fontSize: "0.78rem",
                padding: "8px 12px",
                borderRadius: 8,
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                padding: "8px 13px",
                borderRadius: 8,
                border: "none",
                background: "#dc2626",
                color: "#fff",
                cursor: "pointer",
                opacity: !input.trim() || typing ? 0.35 : 1,
                transition: "opacity 0.15s, background 0.15s",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* bubble */}
      <button
        onClick={toggle}
        aria-label="Abrir assistente"
        className={`bubble-pulse ${tapping ? "anim-tap" : ""}`}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#dc2626",
          border: "none",
          color: "#fff",
          fontSize: "1.3rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(220,38,38,0.35)",
          transition: "background 0.15s, transform 0.15s",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background =
            "#b91c1c";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background =
            "#dc2626";
        }}
      >
        <span
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            display: "block",
          }}
        >
          {open ? "✕" : "💬"}
        </span>
        {unread > 0 && !open && (
          <span
            className="anim-badge mono"
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              color: "#dc2626",
              fontSize: "0.65rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #dc2626",
            }}
          >
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ user }: { user: GHUser | null }) {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          maxWidth: 768,
          margin: "0 auto",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span
          className="mono"
          style={{ fontSize: "0.72rem", color: "#444" }}
        >
          {user?.name ?? "Manoel Edivaldo"} · São Paulo ·{" "}
          {new Date().getFullYear()}
        </span>
        <a
          href={user?.html_url ?? "https://github.com/m-axl"}
          target="_blank"
          rel="noopener noreferrer"
          className="mono"
          style={{
            fontSize: "0.72rem",
            color: "#444",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "#dc2626";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = "#444";
          }}
        >
          github.com/{user?.login ?? "m-axl"}
        </a>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const h = { Accept: "application/vnd.github+json" };
    Promise.all([
      fetch("https://api.github.com/users/m-axl", {
        headers: h,
      }).then((r) => r.json()),
      fetch(
        "https://api.github.com/users/m-axl/repos?sort=pushed&per_page=8",
        { headers: h },
      ).then((r) => r.json()),
    ])
      .then(([u, rs]) => {
        if (u.message) throw new Error(u.message);
        setUser(u as GHUser);
        setRepos(Array.isArray(rs) ? (rs as GHRepo[]) : []);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Background />

        <Nav user={user} />

        {error && (
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: 768,
              margin: "0 auto",
              padding: "24px 20px 0",
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: "0.72rem",
                color: "#dc2626",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 6,
                padding: "8px 14px",
                background: "rgba(220,38,38,0.05)",
              }}
            >
              ⚠ Não foi possível conectar à API do GitHub.
              Verifique sua conexão ou rate-limit.
            </p>
          </div>
        )}

        <Hero user={user} />
        <Repos repos={repos} />
        <Contact user={user} />
        <Budget />
        <Footer user={user} />

        <FloatingChat />
      </div>
      <Analytics />
    </>
  );
}
