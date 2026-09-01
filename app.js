const state = { projects: [], sources: [], evidence: [] };

async function csv(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Gagal membaca ${path}`);
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i=0; i<text.length; i++) {
    const c = text[i], n = text[i+1];
    if (c === '"' && quoted && n === '"') { cell += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { row.push(cell); cell = ""; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && n === '\n') i++;
      row.push(cell); if (row.some(v => v !== "")) rows.push(row);
      row=[]; cell="";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const header = rows.shift().map(v => v.trim());
  return rows.map(r => Object.fromEntries(header.map((h,i)=>[h,(r[i]??"").trim()])));
}

function fmt(value) { return value || "Belum tersedia"; }

function renderProjects(query="") {
  const q = query.toLowerCase().trim();
  const items = state.projects.filter(p =>
    [p.name,p.sector,p.province,p.status,p.investment_value].join(" ").toLowerCase().includes(q)
  );
  const grid = document.getElementById("projectGrid");
  document.getElementById("empty").hidden = items.length > 0;
  grid.innerHTML = items.map(p => `
    <article class="card" data-id="${escapeHtml(p.project_id)}">
      <span class="tag">${escapeHtml(fmt(p.sector))}</span>
      <h3>${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(fmt(p.province))}</p>
      <div class="card-foot">
        <span>${escapeHtml(fmt(p.status))}</span>
        <span>${escapeHtml(fmt(p.investment_value))}</span>
      </div>
    </article>
  `).join("");
  grid.querySelectorAll(".card").forEach(el => el.addEventListener("click", () => openDetail(el.dataset.id)));
}

function renderSources() {
  const el = document.getElementById("sourceList");
  el.innerHTML = state.sources.map(s => `
    <a class="source" href="${escapeAttr(s.url)}" target="_blank" rel="noopener">
      <div class="source-title">${escapeHtml(s.title)}</div>
      <div class="source-meta">${escapeHtml(fmt(s.publisher))} · ${escapeHtml(fmt(s.published_date))}<br>
      ${escapeHtml(fmt(s.tier))} · ${escapeHtml(fmt(s.source_type))}</div>
    </a>
  `).join("");
}

function openDetail(id) {
  const p = state.projects.find(x => x.project_id === id);
  if (!p) return;
  const src = state.sources.find(x => x.source_id === p.source_id);
  const evidence = state.evidence.filter(x => x.entity_id === id);
  document.getElementById("detailContent").innerHTML = `
    <div class="eyebrow">${escapeHtml(fmt(p.sector))}</div>
    <h2 style="margin-top:10px">${escapeHtml(p.name)}</h2>
    <div class="detail-grid">
      ${box("Lokasi", p.province)}
      ${box("Status", p.status)}
      ${box("Indikasi investasi", p.investment_value)}
      ${box("Target selesai", p.target_completion)}
    </div>
    <div class="detail-source">
      <b>Sumber:</b> ${src ? `<a href="${escapeAttr(src.url)}" target="_blank" rel="noopener">${escapeHtml(src.title)}</a>` : "Belum tersedia"}<br>
      <b>Evidence:</b> ${evidence.length ? evidence.map(e => escapeHtml(e.claim)).join("<br>") : "Belum ada evidence terpisah untuk proyek ini."}
    </div>
  `;
  document.getElementById("detailDialog").showModal();
}

function box(label, value){ return `<div class="detail-box"><small>${escapeHtml(label)}</small>${escapeHtml(fmt(value))}</div>`; }
function escapeHtml(s=""){ return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }
function escapeAttr(s=""){ return escapeHtml(s).replaceAll("'","&#39;"); }

async function init() {
  try {
    [state.projects,state.sources,state.evidence] = await Promise.all([
      csv("data/projects.csv"), csv("data/sources.csv"), csv("data/evidence.csv")
    ]);
    document.getElementById("projectCount").textContent = state.projects.length;
    document.getElementById("sectorCount").textContent = new Set(state.projects.map(p=>p.sector).filter(Boolean)).size;
    document.getElementById("sourceCount").textContent = state.sources.filter(s=>s.tier === "Primer").length;
    document.getElementById("verifiedCount").textContent = state.evidence.filter(e=>e.verification_status === "verified").length;
    renderProjects(); renderSources();
  } catch (err) {
    document.getElementById("projectGrid").innerHTML = `<div class="empty">Gagal memuat data. Pastikan website berada di repository yang sama dengan folder <code>data/</code>.</div>`;
    console.error(err);
  }
}

document.getElementById("search").addEventListener("input", e => renderProjects(e.target.value));
document.getElementById("closeDialog").addEventListener("click", () => document.getElementById("detailDialog").close());
document.getElementById("detailDialog").addEventListener("click", e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
init();
