const state = { projects: [], sources: [], evidence: [] };

async function csv(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Gagal membaca ${path}`);
  return parseCSV(await res.text());
}

function parseCSV(text) {
  const rows=[]; let row=[], cell="", quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c==='"' && quoted && n==='"'){cell+='"';i++}
    else if(c==='"') quoted=!quoted;
    else if(c===',' && !quoted){row.push(cell);cell=""}
    else if((c==='\n'||c==='\r')&&!quoted){
      if(c==='\r'&&n==='\n')i++;
      row.push(cell); if(row.some(v=>v!==""))rows.push(row); row=[];cell="";
    } else cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row)}
  const header=(rows.shift()||[]).map(v=>v.trim());
  return rows.map(r=>Object.fromEntries(header.map((h,i)=>[h,(r[i]??"").trim()])));
}

const esc = (s="") => s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const attr = (s="") => esc(s).replaceAll("'","&#39;");
const val = s => s || "Belum tersedia";

function renderProjects(query=""){
  const q=query.toLowerCase().trim();
  const items=state.projects.filter(p=>[p.name,p.sector,p.province,p.status,p.investment_value].join(" ").toLowerCase().includes(q));
  const grid=document.getElementById("projectGrid");
  document.getElementById("empty").hidden=items.length>0;
  grid.innerHTML=items.map(p=>`
    <article class="card" data-id="${esc(p.project_id)}">
      <span class="tag">${esc(val(p.sector))}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(val(p.province))}</p>
      <div class="card-foot"><span>${esc(val(p.status))}</span><span>${esc(val(p.investment_value))}</span></div>
    </article>`).join("");
  grid.querySelectorAll(".card").forEach(el=>el.addEventListener("click",()=>openDetail(el.dataset.id)));
}

function renderSources(){
  document.getElementById("sourceList").innerHTML=state.sources.map(s=>`
    <a class="source" href="${attr(s.url)}" target="_blank" rel="noopener">
      <div class="source-title">${esc(s.title)}</div>
      <div class="source-meta">${esc(val(s.publisher))} · ${esc(val(s.published_date))}<br>${esc(val(s.tier))} · ${esc(val(s.source_type))}</div>
    </a>`).join("");
}

function box(label,value){return `<div class="detail-box"><small>${esc(label)}</small>${esc(val(value))}</div>`}

function openDetail(id){
  const p=state.projects.find(x=>x.project_id===id); if(!p)return;
  const src=state.sources.find(x=>x.source_id===p.source_id);
  const ev=state.evidence.filter(x=>x.entity_id===id);
  document.getElementById("detailContent").innerHTML=`
    <div class="eyebrow">${esc(val(p.sector))}</div>
    <h2 style="margin-top:10px">${esc(p.name)}</h2>
    <div class="status-pill">${esc(val(p.status))}</div>
    <div class="detail-grid">
      ${box("Lokasi",p.province)}
      ${box("Indikasi investasi",p.investment_value)}
      ${box("Target selesai",p.target_completion)}
      ${box("Mulai",p.start_date)}
    </div>
    <div class="detail-source">
      <b>Source:</b> ${src?`<a href="${attr(src.url)}" target="_blank" rel="noopener">${esc(src.title)}</a>`:"Belum tersedia"}<br>
      ${ev.length?`<br><b>Evidence</b><br>${ev.map(e=>`• ${esc(e.claim)}${e.page_or_section?` <span>(${esc(e.page_or_section)})</span>`:""}`).join("<br>")}`:"<br><b>Evidence</b><br>Belum ada evidence terpisah untuk proyek ini."}
    </div>`;
  document.getElementById("detailDialog").showModal();
}

async function init(){
  try{
    // Dataset saat ini di-upload di root repository, bukan folder data/.
    [state.projects,state.sources,state.evidence]=await Promise.all([
      csv("projects.csv"),csv("sources.csv"),csv("evidence.csv")
    ]);
    document.getElementById("projectCount").textContent=state.projects.length;
    document.getElementById("sectorCount").textContent=new Set(state.projects.map(p=>p.sector).filter(Boolean)).size;
    document.getElementById("sourceCount").textContent=state.sources.filter(s=>s.tier==="Primer").length;
    document.getElementById("verifiedCount").textContent=state.evidence.filter(e=>e.verification_status==="verified").length;
    renderProjects();renderSources();
  }catch(err){
    document.getElementById("projectGrid").innerHTML=`<div class="empty">Data belum terbaca. Pastikan <b>projects.csv</b>, <b>sources.csv</b>, dan <b>evidence.csv</b> berada di root repository. Detail: ${esc(err.message)}</div>`;
    console.error(err);
  }
}

document.getElementById("search").addEventListener("input",e=>renderProjects(e.target.value));
document.getElementById("closeDialog").addEventListener("click",()=>document.getElementById("detailDialog").close());
document.getElementById("detailDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
init();
