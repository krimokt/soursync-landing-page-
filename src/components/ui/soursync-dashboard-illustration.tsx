"use client";

import React from "react";

export const SourSyncDashboardIllustration = () => {
  return (
    <svg
      viewBox="0 0 1200 720"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0f7aff" />
        </linearGradient>
        <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#162032" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f7aff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f7aff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="30%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="screenClip">
          <rect x="0" y="0" width="1200" height="720" rx="12" />
        </clipPath>
      </defs>

      <g clipPath="url(#screenClip)">
        {/* Background */}
        <rect width="1200" height="720" fill="url(#bgGrad)" />

        {/* Subtle grid */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`vg-${i}`}
            x1={i * 52}
            y1="0"
            x2={i * 52}
            y2="720"
            stroke="#1e293b"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`hg-${i}`}
            x1="0"
            y1={i * 54}
            x2="1200"
            y2={i * 54}
            stroke="#1e293b"
            strokeWidth="0.5"
            opacity="0.4"
          />
        ))}

        {/* ─── SIDEBAR ─── */}
        <rect x="0" y="0" width="220" height="720" fill="#0d1b2e" />
        <rect x="219" y="0" width="1" height="720" fill="#1e3a5f" opacity="0.5" />

        {/* Logo in sidebar */}
        <text x="24" y="38" fill="#06b6d4" fontSize="13" fontWeight="700" letterSpacing="0.5">
          SourSync
        </text>
        <circle cx="12" cy="34" r="6" fill="none" stroke="#06b6d4" strokeWidth="2" />
        <line x1="8" y1="34" x2="16" y2="34" stroke="#06b6d4" strokeWidth="2" />

        {/* Sidebar nav items */}
        {[
          { label: "Dashboard", y: 74, active: true, icon: "◈" },
          { label: "Quotations", y: 108, active: false, icon: "◉" },
          { label: "Purchase Orders", y: 142, active: false, icon: "◎" },
          { label: "Suppliers", y: 176, active: false, icon: "◍" },
          { label: "Shipments", y: 210, active: false, icon: "◌" },
          { label: "Client Portal", y: 244, active: false, icon: "◆" },
          { label: "Analytics", y: 278, active: false, icon: "◇" },
        ].map((item) => (
          <g key={item.label}>
            {item.active && (
              <rect x="0" y={item.y - 14} width="220" height="28" fill="#06b6d4" fillOpacity="0.12" rx="4" />
            )}
            {item.active && (
              <rect x="0" y={item.y - 14} width="3" height="28" fill="#06b6d4" rx="1" />
            )}
            <text
              x="20"
              y={item.y + 4}
              fill={item.active ? "#06b6d4" : "#64748b"}
              fontSize="11"
              fontWeight={item.active ? "600" : "400"}
            >
              {item.icon}
            </text>
            <text
              x="38"
              y={item.y + 4}
              fill={item.active ? "#e2e8f0" : "#64748b"}
              fontSize="11"
              fontWeight={item.active ? "600" : "400"}
            >
              {item.label}
            </text>
          </g>
        ))}

        {/* Sidebar divider */}
        <line x1="20" y1="310" x2="200" y2="310" stroke="#1e3a5f" strokeWidth="1" />

        {/* Sidebar bottom user */}
        <circle cx="36" cy="340" r="12" fill="#1e3a5f" />
        <text x="36" y="344" fill="#06b6d4" fontSize="9" fontWeight="700" textAnchor="middle">KR</text>
        <text x="56" y="337" fill="#94a3b8" fontSize="10" fontWeight="500">Krimo</text>
        <text x="56" y="350" fill="#475569" fontSize="9">Admin</text>

        {/* AI badge in sidebar */}
        <rect x="16" y="680" width="188" height="28" rx="6" fill="#0f7aff" fillOpacity="0.15" stroke="#0f7aff" strokeOpacity="0.3" strokeWidth="1" />
        <text x="110" y="698" fill="#7dd3fc" fontSize="10" fontWeight="600" textAnchor="middle">✦ AI Sourcing Agent Active</text>

        {/* ─── TOP BAR ─── */}
        <rect x="220" y="0" width="980" height="52" fill="#0d1b2e" />
        <line x1="220" y1="52" x2="1200" y2="52" stroke="#1e3a5f" strokeWidth="1" />

        <text x="240" y="30" fill="#e2e8f0" fontSize="14" fontWeight="700">Overview</text>
        <text x="240" y="46" fill="#475569" fontSize="9">Last updated: 2 min ago</text>

        {/* Search bar */}
        <rect x="600" y="14" width="220" height="26" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="616" y="31" fill="#475569" fontSize="10">⌕  Search suppliers, orders...</text>

        {/* Top bar actions */}
        <rect x="840" y="14" width="70" height="26" rx="6" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="1" />
        <text x="875" y="31" fill="#06b6d4" fontSize="10" fontWeight="600" textAnchor="middle">+ New RFQ</text>

        <circle cx="940" cy="27" r="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="940" y="31" fill="#64748b" fontSize="9" textAnchor="middle">🔔</text>
        <circle cx="948" cy="19" r="4" fill="#06b6d4" />

        <circle cx="970" cy="27" r="12" fill="#1e3a5f" />
        <text x="970" y="31" fill="#06b6d4" fontSize="8" fontWeight="700" textAnchor="middle">KR</text>

        {/* ─── STAT CARDS ROW ─── */}
        {[
          { label: "Active RFQs", value: "47", sub: "+12 this week", color: "#06b6d4", x: 240, trend: "↑" },
          { label: "Open POs", value: "23", sub: "$184K total value", color: "#0f7aff", x: 488, trend: "↑" },
          { label: "In Transit", value: "8", sub: "3 arriving soon", color: "#8b5cf6", x: 736, trend: "→" },
          { label: "Avg Lead Time", value: "14d", sub: "↓2d vs last month", color: "#10b981", x: 984, trend: "↓" },
        ].map((card) => (
          <g key={card.label}>
            <rect x={card.x} y="66" width="220" height="90" rx="10" fill="url(#cardGrad1)" stroke="#1e3a5f" strokeWidth="1" />
            <rect x={card.x} y="66" width="3" height="90" rx="2" fill={card.color} />
            <text x={card.x + 16} y="88" fill="#64748b" fontSize="10" fontWeight="500">{card.label}</text>
            <text x={card.x + 16} y="120" fill={card.color} fontSize="32" fontWeight="800" filter="url(#glow)">{card.value}</text>
            <text x={card.x + 16} y="144" fill="#475569" fontSize="9">{card.sub}</text>
            <circle cx={card.x + 198} cy={86} r="16" fill={card.color} fillOpacity="0.1" />
            <text x={card.x + 198} y={91} fill={card.color} fontSize="12" textAnchor="middle">{card.trend}</text>
          </g>
        ))}

        {/* ─── CHART + TABLE SECTION ─── */}
        {/* Chart card */}
        <rect x="240" y="172" width="490" height="240" rx="10" fill="url(#cardGrad1)" stroke="#1e3a5f" strokeWidth="1" />
        <text x="258" y="196" fill="#e2e8f0" fontSize="12" fontWeight="600">Sourcing Volume</text>
        <text x="258" y="210" fill="#475569" fontSize="9">RFQs & POs — last 6 months</text>

        {/* Chart legend */}
        <rect x="590" y="188" width="8" height="8" rx="2" fill="#06b6d4" />
        <text x="602" y="196" fill="#64748b" fontSize="8">RFQs</text>
        <rect x="630" y="188" width="8" height="8" rx="2" fill="#0f7aff" />
        <text x="642" y="196" fill="#64748b" fontSize="8">POs</text>

        {/* Bar chart */}
        {[
          { label: "Dec", rfq: 65, po: 45 },
          { label: "Jan", rfq: 82, po: 58 },
          { label: "Feb", rfq: 70, po: 52 },
          { label: "Mar", rfq: 95, po: 70 },
          { label: "Apr", rfq: 88, po: 65 },
          { label: "May", rfq: 110, po: 82 },
        ].map((bar, i) => {
          const bx = 268 + i * 70;
          const maxH = 140;
          const rfqH = (bar.rfq / 130) * maxH;
          const poH = (bar.po / 130) * maxH;
          return (
            <g key={bar.label}>
              <rect x={bx} y={375 - rfqH} width="22" height={rfqH} rx="3" fill="url(#barGrad)" />
              <rect x={bx + 26} y={375 - poH} width="22" height={poH} rx="3" fill="url(#barGrad2)" />
              <text x={bx + 23} y="390" fill="#475569" fontSize="9" textAnchor="middle">{bar.label}</text>
            </g>
          );
        })}

        {/* Chart Y axis labels */}
        {[0, 50, 100].map((v, i) => (
          <g key={v}>
            <text x="260" y={375 - (v / 130) * 140 + 4} fill="#334155" fontSize="8" textAnchor="end">{v}</text>
            <line x1="265" y1={375 - (v / 130) * 140} x2="710" y2={375 - (v / 130) * 140} stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3,3" />
          </g>
        ))}

        {/* Trend line overlay */}
        <polyline
          points="279,298 349,270 419,284 489,249 559,256 629,224"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeDasharray="none"
          filter="url(#glow)"
        />
        {[279, 349, 419, 489, 559, 629].map((px, i) => {
          const py = [298, 270, 284, 249, 256, 224][i];
          return <circle key={i} cx={px} cy={py} r="3.5" fill="#06b6d4" filter="url(#glow)" />;
        })}

        {/* Active Quotations table */}
        <rect x="748" y="172" width="436" height="240" rx="10" fill="url(#cardGrad1)" stroke="#1e3a5f" strokeWidth="1" />
        <text x="766" y="196" fill="#e2e8f0" fontSize="12" fontWeight="600">Active Quotations</text>
        <rect x="1130" y="182" width="40" height="18" rx="4" fill="#06b6d4" fillOpacity="0.15" />
        <text x="1150" y="194" fill="#06b6d4" fontSize="8" fontWeight="600" textAnchor="middle">View all</text>

        {/* Table header */}
        <rect x="748" y="208" width="436" height="24" fill="#0f172a" />
        {["Supplier", "Item", "Qty", "Status", "Due"].map((h, i) => {
          const xs = [766, 860, 980, 1040, 1130];
          return (
            <text key={h} x={xs[i]} y="224" fill="#475569" fontSize="9" fontWeight="600" style={{ textTransform: "uppercase" }}>
              {h}
            </text>
          );
        })}

        {/* Table rows */}
        {[
          { sup: "Shenzhen Mfg Co.", item: "PCB Assembly v3", qty: "500 pcs", status: "Reviewing", statusC: "#f59e0b", due: "May 20" },
          { sup: "Guangzhou Parts", item: "Aluminum Housing", qty: "1,200 u", status: "Sent", statusC: "#06b6d4", due: "May 22" },
          { sup: "Yiwu Exports Ltd", item: "Packaging Set", qty: "2,000 u", status: "Accepted", statusC: "#10b981", due: "May 25" },
          { sup: "Foshan Metal Co.", item: "Steel Brackets", qty: "800 pcs", status: "Reviewing", statusC: "#f59e0b", due: "May 28" },
          { sup: "HK Electronics", item: "OLED Displays", qty: "300 u", status: "Sent", statusC: "#06b6d4", due: "Jun 2" },
        ].map((row, i) => {
          const ry = 240 + i * 32;
          return (
            <g key={i}>
              {i % 2 === 0 && <rect x="748" y={ry} width="436" height="32" fill="#0f172a" fillOpacity="0.4" />}
              <text x="766" y={ry + 20} fill="#94a3b8" fontSize="10">{row.sup}</text>
              <text x="860" y={ry + 20} fill="#e2e8f0" fontSize="10" fontWeight="500">{row.item}</text>
              <text x="980" y={ry + 20} fill="#64748b" fontSize="9">{row.qty}</text>
              <rect x="1040" y={ry + 8} width="60" height="16" rx="8" fill={row.statusC} fillOpacity="0.15" />
              <text x="1070" y={ry + 20} fill={row.statusC} fontSize="9" fontWeight="600" textAnchor="middle">{row.status}</text>
              <text x="1130" y={ry + 20} fill="#475569" fontSize="9">{row.due}</text>
            </g>
          );
        })}

        {/* ─── BOTTOM ROW ─── */}
        {/* Shipment tracker */}
        <rect x="240" y="428" width="330" height="260" rx="10" fill="url(#cardGrad1)" stroke="#1e3a5f" strokeWidth="1" />
        <text x="258" y="452" fill="#e2e8f0" fontSize="12" fontWeight="600">Shipment Tracker</text>

        {[
          { id: "SS-4821", from: "Shenzhen", to: "Paris", pct: 78, color: "#06b6d4" },
          { id: "SS-4806", from: "Guangzhou", to: "NYC", pct: 45, color: "#0f7aff" },
          { id: "SS-4798", from: "Yiwu", to: "Dubai", pct: 92, color: "#10b981" },
        ].map((ship, i) => {
          const sy = 470 + i * 72;
          return (
            <g key={ship.id}>
              <text x="258" y={sy} fill="#64748b" fontSize="9" fontWeight="600">{ship.id}</text>
              <text x="350" y={sy} fill="#475569" fontSize="9">{ship.from} → {ship.to}</text>
              <text x="530" y={sy} fill={ship.color} fontSize="9" fontWeight="700" textAnchor="end">{ship.pct}%</text>
              <rect x="258" y={sy + 8} width="272" height="8" rx="4" fill="#1e293b" />
              <rect x="258" y={sy + 8} width={272 * ship.pct / 100} height="8" rx="4" fill={ship.color} fillOpacity="0.85" />
              {/* Dot indicator */}
              <circle cx={258 + 272 * ship.pct / 100} cy={sy + 12} r="5" fill={ship.color} filter="url(#glow)" />

              {/* Mini status row */}
              {["Picked up", "In Transit", "Customs", "Delivered"].map((step, si) => {
                const stepPct = [0, 33, 66, 100][si];
                const done = ship.pct >= stepPct;
                return (
                  <g key={step}>
                    <circle cx={258 + si * 91} cy={sy + 36} r="5" fill={done ? ship.color : "#1e293b"} stroke={done ? ship.color : "#334155"} strokeWidth="1" />
                    <text x={258 + si * 91} y={sy + 52} fill={done ? "#94a3b8" : "#334155"} fontSize="7" textAnchor="middle">{step}</text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* AI Insight card */}
        <rect x="586" y="428" width="320" height="260" rx="10" fill="#05131f" stroke="#0f7aff" strokeOpacity="0.3" strokeWidth="1" />
        <rect x="586" y="428" width="320" height="3" rx="10" fill="url(#cyanGrad)" />
        <text x="604" y="452" fill="#7dd3fc" fontSize="10" fontWeight="700">✦ AI Sourcing Agent</text>
        <circle cx="888" cy="444" r="5" fill="#10b981" />
        <text x="895" y="448" fill="#10b981" fontSize="8">live</text>

        {/* AI messages */}
        {[
          { msg: "Found 3 new suppliers for PCB Assembly matching your specs", time: "2m ago", c: "#06b6d4" },
          { msg: "Guangzhou Parts quote 8% below avg — recommend accepting", time: "5m ago", c: "#10b981" },
          { msg: "SS-4798 cleared customs in Dubai ahead of schedule", time: "12m ago", c: "#8b5cf6" },
          { msg: "Lead time alert: HK Electronics showing 4-day delay risk", time: "18m ago", c: "#f59e0b" },
        ].map((msg, i) => (
          <g key={i}>
            <rect x="604" y={466 + i * 52} width="284" height="42" rx="6" fill="#0d1e35" />
            <rect x="604" y={466 + i * 52} width="2" height="42" rx="1" fill={msg.c} />
            <text x="614" y={466 + i * 52 + 16} fill="#94a3b8" fontSize="9" style={{ whiteSpace: "pre-wrap" }}>
              {msg.msg.length > 44 ? msg.msg.slice(0, 44) + "…" : msg.msg}
            </text>
            {msg.msg.length > 44 && (
              <text x="614" y={466 + i * 52 + 28} fill="#64748b" fontSize="9">
                {msg.msg.slice(44, 80)}
              </text>
            )}
            <text x="880" y={466 + i * 52 + 28} fill="#334155" fontSize="8" textAnchor="end">{msg.time}</text>
          </g>
        ))}

        {/* Client portal mini card */}
        <rect x="922" y="428" width="262" height="260" rx="10" fill="url(#cardGrad1)" stroke="#1e3a5f" strokeWidth="1" />
        <text x="940" y="452" fill="#e2e8f0" fontSize="12" fontWeight="600">Client Portal</text>

        {/* Mini donut chart */}
        <circle cx="1053" cy="535" r="50" fill="none" stroke="#1e293b" strokeWidth="18" />
        <circle cx="1053" cy="535" r="50" fill="none" stroke="#06b6d4" strokeWidth="18"
          strokeDasharray="188 126" strokeDashoffset="0" strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "1053px 535px" }}
        />
        <circle cx="1053" cy="535" r="50" fill="none" stroke="#0f7aff" strokeWidth="18"
          strokeDasharray="75 239" strokeDashoffset="-188" strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "1053px 535px" }}
        />
        <circle cx="1053" cy="535" r="50" fill="none" stroke="#8b5cf6" strokeWidth="18"
          strokeDasharray="51 263" strokeDashoffset="-263" strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "1053px 535px" }}
        />
        <text x="1053" y="528" fill="#e2e8f0" fontSize="18" fontWeight="800" textAnchor="middle">47</text>
        <text x="1053" y="542" fill="#64748b" fontSize="8" textAnchor="middle">orders</text>

        {/* Legend */}
        {[
          { label: "Approved", color: "#06b6d4", pct: "60%" },
          { label: "Pending", color: "#0f7aff", pct: "24%" },
          { label: "Review", color: "#8b5cf6", pct: "16%" },
        ].map((l, i) => (
          <g key={l.label}>
            <rect x="930" y={598 + i * 22} width="8" height="8" rx="2" fill={l.color} />
            <text x="942" y={608 + i * 22} fill="#94a3b8" fontSize="9">{l.label}</text>
            <text x="1170" y={608 + i * 22} fill={l.color} fontSize="9" fontWeight="600" textAnchor="end">{l.pct}</text>
          </g>
        ))}

        {/* Bottom glow ambient */}
        <ellipse cx="600" cy="720" rx="500" ry="60" fill="#06b6d4" fillOpacity="0.04" />

        {/* Top bar subtle glow line */}
        <rect x="220" y="51" width="980" height="1" fill="url(#cyanGrad)" opacity="0.3" />
      </g>
    </svg>
  );
};
