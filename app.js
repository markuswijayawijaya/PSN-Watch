const demoProjects = [
  {id:"P001",name:"Jalan Tol Sigli – Banda Aceh",sector:"Jalan",province:"Aceh",status:"Berjalan",value:"Rp 16,5 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P002",name:"Jalan Tol Kayu Agung – Palembang – Betung",sector:"Jalan",province:"Sumatera Selatan",status:"Operasi",value:"Rp 17,3 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P003",name:"Jalan Tol Serang – Panimbang",sector:"Jalan",province:"Banten",status:"Operasi",value:"Rp 9,9 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P004",name:"Konstruksi Tangki Penyimpanan LPG (Kupang)",sector:"Energi",province:"Indonesia Timur",status:"Berjalan",value:"Rp 0,32 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P005",name:"Pipa Transmisi Gas Bumi Cirebon – Semarang Tahap II",sector:"Energi",province:"Jawa Barat & Jawa Tengah",status:"Berjalan",value:"Rp 2,79 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P006",name:"Kawasan Industri Tanah Kuning (PT ISI)",sector:"Kawasan",province:"Kalimantan Utara",status:"Berjalan",value:"Rp 55 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P007",name:"Bendungan Jragung",sector:"Bendungan",province:"Jawa Tengah",status:"Berjalan",value:"Rp 2,8 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P008",name:"SPAM Regional Benteng – Kobema",sector:"Air",province:"Bengkulu",status:"Selesai",value:"Rp 0,9 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P009",name:"Kawasan Industri Kuala Tanjung",sector:"Kawasan",province:"Sumatera Utara",status:"Berjalan",value:"Rp 28,8 T",target:"2026",source:"Snapshot pemerintah 2026"},
  {id:"P010",name:"Kawasan Industri Wiraraja GESEIP",sector:"Kawasan",province:"Kepulauan Riau",status:"Berjalan",value:"Rp 343,79 T",target:"2026",source:"Snapshot pemerintah 2026"}
];

const demoCompanies = [
  ["Company A","Kontraktor","4 projects"],["Company B","BUMN","3 projects"],["Company C","Operator","2 projects"],["Company D","Konsorsium","5 projects"],
  ["Company E","Developer","1 project"],["Company F","Kontraktor","2 projects"],["Company G","Investor","3 projects"],["Company H","Utility","1 project"]
];

const demoPeople = [
  ["Person A","Director / Commissioner","Company A · Company B"],["Person B","Former public official","Institution A"],["Person C","Commissioner","Company D"],["Person D","Director","Company G"],["Person E","Public office","Institution B"],["Person F","Board member","Company C"]
];

function esc(s=""){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}
function renderProjects(){
  const q=(document.getElementById("projectSearch").value||"").toLowerCase();
  const sector=document.getElementById("sectorFilter").value, status=document.getElementById("statusFilter").value, prov=document.getElementById("provinceFilter").value;
  const items=demoProjects.filter(p=>(!q||[p.name,p.sector,p.province].join(" ").toLowerCase().includes(q))&&(!sector||p.sector===sector)&&(!status||p.status===status)&&(!prov||p.province===prov));
  document.getElementById("projectGrid").innerHTML=items.map(p=>`
    <article class="project-card" data-id="${esc(p.id)}"><span class="tag">${esc(p.sector)}</span>
      <h3>${esc(p.name)}</h3><div class="meta">${esc(p.province)}</div>
      <div class="card-bottom"><span>${esc(p.status)}</span><span>${esc(p.value)}</span></div>
    </article>`).join("") || `<div class="meta">Tidak ada hasil yang cocok.</div>`;
  document.querySelectorAll(".project-card").forEach(el=>el.addEventListener("click",()=>openProject(el.dataset.id)));
}
function renderCompanies(){
  document.getElementById("companyGrid").innerHTML=demoCompanies.map(c=>`<div class="company-card"><div class="company-type">${esc(c[1])}</div><h3>${esc(c[0])}</h3><div class="meta">Demo entity · belum diverifikasi</div><div class="count">${esc(c[2])}</div></div>`).join("");
}
function renderPeople(){
  document.getElementById("peopleGrid").innerHTML=demoPeople.map(p=>`<div class="person-card"><span class="tag">DEMO</span><h3>${esc(p[0])}</h3><div class="person-role">${esc(p[1])}</div><div class="connection">${esc(p[2])}</div></div>`).join("");
}
function openProject(id){
  const p=demoProjects.find(x=>x.id===id); if(!p)return;
  document.getElementById("detailContent").innerHTML=`
    <div class="eyebrow">${esc(p.sector)} · DEMO</div><h2 style="margin:10px 0 0">${esc(p.name)}</h2>
    <div class="detail-grid">
      ${box("Lokasi",p.province)}${box("Status",p.status)}${box("Indikasi investasi",p.value)}${box("Target",p.target)}
    </div>
    <div class="detail-source"><b>Data note</b><br>Ini adalah data contoh untuk menguji tampilan. Source final dan evidence akan dimasukkan pada fase verifikasi.</div>`;
  document.getElementById("detailDialog").showModal();
}
function box(a,b){return `<div class="detail-box"><small>${esc(a)}</small>${esc(b)}</div>`}

const searchIndex=[
  ...demoProjects.map(p=>({type:"Project",name:p.name,meta:`${p.sector} · ${p.province}`,id:p.id})),
  ...demoCompanies.map(c=>({type:"Company",name:c[0],meta:c[1],id:""})),
  ...demoPeople.map(p=>({type:"Person",name:p[0],meta:p[1],id:""}))
];
function renderGlobalSearch(){
  const q=(document.getElementById("globalSearch").value||"").toLowerCase().trim();
  const hits=searchIndex.filter(x=>(x.name+" "+x.meta).toLowerCase().includes(q)).slice(0,20);
  document.getElementById("searchResults").innerHTML=(q?hits.map(h=>`<div class="result" data-id="${esc(h.id)}"><span>${esc(h.type)}</span><b>${esc(h.name)}</b><span>${esc(h.meta)}</span></div>`).join(""):`<div class="meta">Ketik minimal satu kata untuk mencari.</div>`) || `<div class="meta">Tidak ditemukan.</div>`;
  document.querySelectorAll(".result").forEach(el=>el.addEventListener("click",()=>{if(el.dataset.id){document.getElementById("searchDialog").close();openProject(el.dataset.id)}}));
}

document.querySelectorAll(".node").forEach(n=>n.addEventListener("click",()=>{
  const name=n.dataset.node;
  document.getElementById("nodeInspector").innerHTML=`<div class="mini-label">SELECTED NODE</div><b>${esc(name)}</b><p>Demo node. Pada versi data final, panel ini akan menampilkan tipe entitas, relationship, periode, confidence, dan evidence.</p>`;
}));
["projectSearch","sectorFilter","statusFilter","provinceFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="projectSearch"?"input":"change",renderProjects));
document.getElementById("searchOpen").addEventListener("click",()=>{document.getElementById("searchDialog").showModal();setTimeout(()=>document.getElementById("globalSearch").focus(),40)});
document.getElementById("closeSearch").addEventListener("click",()=>document.getElementById("searchDialog").close());
document.getElementById("closeDialog").addEventListener("click",()=>document.getElementById("detailDialog").close());
document.getElementById("globalSearch").addEventListener("input",renderGlobalSearch);
document.getElementById("detailDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.getElementById("searchDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
renderProjects();renderCompanies();renderPeople();
