const projects = [
  ["P001","Jalan Tol Sigli – Banda Aceh","Jalan","Aceh","Berjalan","Rp 16,5 T"],
  ["P002","Jalan Tol Kayu Agung – Palembang – Betung","Jalan","Sumatera Selatan","Operasi","Rp 17,3 T"],
  ["P003","Jalan Tol Serang – Panimbang","Jalan","Banten","Operasi","Rp 9,9 T"],
  ["P004","Konstruksi Tangki Penyimpanan LPG (Kupang)","Energi","Indonesia Timur","Berjalan","Rp 0,32 T"],
  ["P005","Pipa Transmisi Gas Bumi Cirebon – Semarang Tahap II","Energi","Jawa Barat & Jawa Tengah","Berjalan","Rp 2,79 T"],
  ["P006","Kawasan Industri Tanah Kuning (PT ISI)","Kawasan","Kalimantan Utara","Berjalan","Rp 55 T"],
  ["P007","Bendungan Jragung","Bendungan","Jawa Tengah","Berjalan","Rp 2,8 T"],
  ["P008","SPAM Regional Benteng – Kobema","Air","Bengkulu","Selesai","Rp 0,9 T"],
  ["P009","Kawasan Industri Kuala Tanjung","Kawasan","Sumatera Utara","Berjalan","Rp 28,8 T"],
  ["P010","Kawasan Industri Wiraraja GESEIP","Kawasan","Kepulauan Riau","Berjalan","Rp 343,79 T"]
];
const companies = [
  ["Perusahaan A","Kontraktor","4 proyek"],["Perusahaan B","BUMN","3 proyek"],["Perusahaan C","Operator","2 proyek"],["Perusahaan D","Konsorsium","5 proyek"],
  ["Perusahaan E","Developer","1 proyek"],["Perusahaan F","Kontraktor","2 proyek"],["Perusahaan G","Investor","3 proyek"],["Perusahaan H","Utility","1 proyek"]
];
const people = [
  ["Orang A","Direktur / Komisaris","Perusahaan A · Perusahaan B"],["Orang B","Mantan pejabat publik","Institusi A"],["Orang C","Komisaris","Perusahaan D"],
  ["Orang D","Direktur","Perusahaan G"],["Orang E","Jabatan publik","Institusi B"],["Orang F","Anggota dewan","Perusahaan C"]
];
const searchIndex = [
  ...projects.map(p=>({type:"Proyek",name:p[1],meta:`${p[2]} · ${p[3]}`,id:p[0]})),
  ...companies.map(c=>({type:"Perusahaan",name:c[0],meta:c[1],id:""})),
  ...people.map(p=>({type:"Orang",name:p[0],meta:p[1],id:""}))
];

const esc = (s="") => s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const box = (a,b)=>`<div class="detail-box"><small>${esc(a)}</small>${esc(b)}</div>`;

function renderProjects(){
  const q=(document.getElementById("projectSearch").value||"").toLowerCase().trim();
  const sector=document.getElementById("sectorFilter").value;
  const status=document.getElementById("statusFilter").value;
  const items=projects.filter(p=>
    (!q || p[1].toLowerCase().includes(q) || p[3].toLowerCase().includes(q)) &&
    (!sector || p[2]===sector) &&
    (!status || p[4]===status)
  );
  document.getElementById("projectGrid").innerHTML=items.map(p=>`
    <article class="project-card" data-id="${esc(p[0])}">
      <span class="tag">${esc(p[2])}</span>
      <h3>${esc(p[1])}</h3>
      <div class="meta">${esc(p[3])}</div>
      <div class="card-bottom"><span>${esc(p[4])}</span><b>${esc(p[5])}</b></div>
    </article>`).join("") || `<div class="meta">Tidak ada proyek yang cocok.</div>`;
  document.querySelectorAll(".project-card").forEach(el=>el.addEventListener("click",()=>openProject(el.dataset.id)));
}
function renderCompanies(){
  document.getElementById("companyGrid").innerHTML=companies.map(c=>`
    <article class="company-card"><div class="company-type">${esc(c[1])}</div><h3>${esc(c[0])}</h3>
    <div class="meta">Entitas demo · belum diverifikasi</div><div class="company-count">${esc(c[2])}</div></article>`).join("");
}
function renderPeople(){
  document.getElementById("peopleGrid").innerHTML=people.map(p=>`
    <article class="person-card"><span class="tag">DEMO</span><h3>${esc(p[0])}</h3>
    <div class="role">${esc(p[1])}</div><div class="linkline">${esc(p[2])}</div></article>`).join("");
}
function openProject(id){
  const p=projects.find(x=>x[0]===id); if(!p)return;
  document.getElementById("detailContent").innerHTML=`
    <div class="eyebrow">${esc(p[2])} · DEMO</div><h2 style="margin:10px 0">${esc(p[1])}</h2>
    <div class="detail-grid">${box("Lokasi",p[3])}${box("Status",p[4])}${box("Indikasi nilai",p[5])}${box("ID proyek",p[0])}</div>
    <div class="detail-source"><b>Halaman proyek</b><br>
    Pada versi final halaman ini akan memuat timeline, pendanaan, perusahaan, regulasi, dokumen, dan jaringan beserta evidence.</div>`;
  document.getElementById("detailDialog").showModal();
}
function renderGlobalSearch(){
  const q=(document.getElementById("globalSearch").value||"").toLowerCase().trim();
  if(!q){document.getElementById("searchResults").innerHTML=`<div class="meta">Ketik proyek, perusahaan, orang, atau aturan.</div>`;return;}
  const hits=searchIndex.filter(x=>(x.name+" "+x.meta).toLowerCase().includes(q)).slice(0,20);
  document.getElementById("searchResults").innerHTML=hits.length?hits.map(h=>`
    <div class="result" data-id="${esc(h.id)}"><span>${esc(h.type)}</span><b>${esc(h.name)}</b><span>${esc(h.meta)}</span></div>`).join(""):`<div class="meta">Tidak ditemukan.</div>`;
  document.querySelectorAll(".result").forEach(el=>el.addEventListener("click",()=>{
    if(el.dataset.id){document.getElementById("searchDialog").close();openProject(el.dataset.id);}
  }));
}

document.querySelectorAll(".node").forEach(n=>n.addEventListener("click",()=>{
  const name=n.dataset.node;
  document.getElementById("nodeInspector").innerHTML=`<div class="mini-label">ENTITAS DIPILIH</div><b>${esc(name)}</b><p>Demo node. Pada versi data final, panel ini akan menampilkan tipe hubungan, periode, confidence, sumber, dan evidence.</p>`;
}));
document.querySelectorAll(".chip").forEach(c=>c.addEventListener("click",()=>{
  const parent=c.parentElement;
  parent.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
  c.classList.add("active");
}));
["projectSearch"].forEach(id=>document.getElementById(id).addEventListener("input",renderProjects));
["sectorFilter","statusFilter"].forEach(id=>document.getElementById(id).addEventListener("change",renderProjects));
document.getElementById("searchOpen").addEventListener("click",()=>{document.getElementById("searchDialog").showModal();setTimeout(()=>document.getElementById("globalSearch").focus(),40)});
document.getElementById("closeSearch").addEventListener("click",()=>document.getElementById("searchDialog").close());
document.getElementById("closeDialog").addEventListener("click",()=>document.getElementById("detailDialog").close());
document.getElementById("globalSearch").addEventListener("input",renderGlobalSearch);
document.getElementById("detailDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.getElementById("searchDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
document.querySelectorAll(".map-dot").forEach(n=>n.addEventListener("click",()=>alert(`Wilayah: ${n.dataset.name}\nVersi final: titik proyek akan bisa diklik dari peta.`)));
renderProjects();renderCompanies();renderPeople();
