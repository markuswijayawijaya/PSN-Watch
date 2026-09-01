
const projects=[
 {id:"P001",name:"Jalan Tol Sigli – Banda Aceh",sector:"Jalan",province:"Aceh",status:"Berjalan",value:"Rp 16,5 T",target:"2026",role:"KPBU"},
 {id:"P002",name:"Jalan Tol Kayu Agung – Palembang – Betung",sector:"Jalan",province:"Sumatera Selatan",status:"Operasi",value:"Rp 17,3 T",target:"2026",role:"Swasta"},
 {id:"P003",name:"Jalan Tol Serang – Panimbang",sector:"Jalan",province:"Banten",status:"Operasi",value:"Rp 9,9 T",target:"2026",role:"KPBU"},
 {id:"P004",name:"Konstruksi Tangki Penyimpanan LPG (Kupang)",sector:"Energi",province:"Indonesia Timur",status:"Berjalan",value:"Rp 0,32 T",target:"2026",role:"Pemerintah"},
 {id:"P005",name:"Pipa Transmisi Gas Bumi Cirebon – Semarang Tahap II",sector:"Energi",province:"Jawa Barat & Jawa Tengah",status:"Berjalan",value:"Rp 2,79 T",target:"2026",role:"Pemerintah"},
 {id:"P006",name:"Kawasan Industri Tanah Kuning (PT ISI)",sector:"Kawasan",province:"Kalimantan Utara",status:"Berjalan",value:"Rp 55 T",target:"2026",role:"Swasta"},
 {id:"P007",name:"Bendungan Jragung",sector:"Bendungan",province:"Jawa Tengah",status:"Berjalan",value:"Rp 2,8 T",target:"2026",role:"Pemerintah"},
 {id:"P008",name:"SPAM Regional Benteng – Kobema",sector:"Air",province:"Bengkulu",status:"Selesai",value:"Rp 0,9 T",target:"2026",role:"Pemerintah"},
 {id:"P009",name:"Kawasan Industri Kuala Tanjung",sector:"Kawasan",province:"Sumatera Utara",status:"Berjalan",value:"Rp 28,8 T",target:"2026",role:"Swasta"},
 {id:"P010",name:"Kawasan Industri Wiraraja GESEIP",sector:"Kawasan",province:"Kepulauan Riau",status:"Berjalan",value:"Rp 343,79 T",target:"2026",role:"Swasta"}
];
const companies=[
 ["Perusahaan A","Kontraktor","4 proyek"],["Perusahaan B","BUMN","3 proyek"],["Perusahaan C","Operator","2 proyek"],["Perusahaan D","Konsorsium","5 proyek"],
 ["Perusahaan E","Developer","1 proyek"],["Perusahaan F","Kontraktor","2 proyek"],["Perusahaan G","Investor","3 proyek"],["Perusahaan H","Utility","1 proyek"]
];
const people=[
 ["Orang A","Direktur / Komisaris","Perusahaan A · Perusahaan B"],["Orang B","Mantan pejabat publik","Institusi A"],["Orang C","Komisaris","Perusahaan D"],
 ["Orang D","Direktur","Perusahaan G"],["Orang E","Jabatan publik","Institusi B"],["Orang F","Anggota dewan","Perusahaan C"]
];

const esc=s=>(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const $=id=>document.getElementById(id);

function renderProjects(){
 const q=$("projectSearch").value.toLowerCase().trim(), sec=$("sectorFilter").value, st=$("statusFilter").value;
 const items=projects.filter(p=>(!q||[p.name,p.province,p.sector].join(" ").toLowerCase().includes(q))&&(!sec||p.sector===sec)&&(!st||p.status===st));
 $("projectGrid").innerHTML=items.map(p=>`<article class="project-card" data-id="${esc(p.id)}"><span class="tag">${esc(p.sector)}</span><h3>${esc(p.name)}</h3><div class="meta">${esc(p.province)}</div><div class="card-bottom"><span>${esc(p.status)}</span><b>${esc(p.value)}</b></div></article>`).join("")||`<div class="meta">Tidak ada hasil.</div>`;
 document.querySelectorAll(".project-card").forEach(c=>c.addEventListener("click",()=>openProject(c.dataset.id)));
}
function renderCompanies(){ $("companyGrid").innerHTML=companies.map(c=>`<article class="company-card"><div class="company-type">${esc(c[1])}</div><h3>${esc(c[0])}</h3><div class="meta">Entitas demo · belum diverifikasi</div><div class="company-count">${esc(c[2])}</div></article>`).join("");}
function renderPeople(){ $("peopleGrid").innerHTML=people.map(p=>`<article class="person-card"><span class="tag">DEMO</span><h3>${esc(p[0])}</h3><div class="role">${esc(p[1])}</div><div class="linkline">${esc(p[2])}</div></article>`).join("");}

function openProject(id){
 const p=projects.find(x=>x.id===id); if(!p)return;
 $("detailContent").innerHTML=`
 <div class="detail-hero">
   <div><div class="eyebrow">${esc(p.sector)} · ${esc(p.province)}</div><h2>${esc(p.name)}</h2><div class="detail-status">${esc(p.status)}</div></div>
   <div class="detail-side"><small>INDIKASI NILAI</small><strong>${esc(p.value)}</strong><span class="meta">Target ${esc(p.target)} · Skema ${esc(p.role)}</span></div>
 </div>
 <div class="detail-tabs"><button class="detail-tab active">Ringkasan</button><button class="detail-tab">Timeline</button><button class="detail-tab">Pendanaan</button><button class="detail-tab">Perusahaan</button><button class="detail-tab">Regulasi</button><button class="detail-tab">Dokumen</button><button class="detail-tab">Jaringan</button></div>
 <div class="detail-grid">${box("Lokasi",p.province)}${box("Status",p.status)}${box("Target selesai",p.target)}${box("Skema",p.role)}</div>
 <div class="detail-section"><h4>Ringkasan proyek</h4><p class="detail-note">Ini adalah tampilan demo. Pada versi data final, bagian ini akan memuat deskripsi proyek, milestone, instansi penanggung jawab, dan indikator kemajuan dengan evidence.</p></div>
 <div class="detail-section"><h4>Perusahaan terkait</h4><div class="detail-list"><div><b>Perusahaan A</b><span>Kontraktor · DEMO</span></div><div><b>Perusahaan B</b><span>Investor / BUMN · DEMO</span></div><div><b>Perusahaan C</b><span>Operator · DEMO</span></div></div></div>
 <div class="detail-section"><h4>Bukti & sumber</h4><div class="detail-note">Setiap klaim final akan menampilkan dokumen sumber, halaman/section, tanggal, dan status verifikasi di area ini.</div></div>`;
 document.querySelectorAll(".detail-tab").forEach(tab=>tab.addEventListener("click",e=>{document.querySelectorAll(".detail-tab").forEach(x=>x.classList.remove("active"));e.currentTarget.classList.add("active")}));
 $("detailDialog").showModal();
}
function box(a,b){return `<div class="detail-box"><small>${esc(a)}</small>${esc(b)}</div>`}

const nodes=[
 {id:"PX",label:"PROYEK X",type:"project",x:600,y:325},
 {id:"CA",label:"PERUSAHAAN A",type:"company",x:330,y:155},
 {id:"CB",label:"PERUSAHAAN B",type:"company",x:870,y:155},
 {id:"CC",label:"PERUSAHAAN C",type:"company",x:325,y:485},
 {id:"CD",label:"PERUSAHAAN D",type:"company",x:875,y:485},
 {id:"PA",label:"ORANG A",type:"person",x:130,y:325},
 {id:"PB",label:"ORANG B",type:"person",x:1070,y:325},
 {id:"IA",label:"INSTITUSI A",type:"institution",x:125,y:540},
 {id:"IB",label:"INSTITUSI B",type:"institution",x:1075,y:540}
];
const edges=[
 {id:"E1",a:"PX",b:"CA",kind:"project",rel:"kontraktor",note:"Demo relationship untuk desain."},
 {id:"E2",a:"PX",b:"CB",kind:"project",rel:"investor / BUMN",note:"Demo relationship untuk desain."},
 {id:"E3",a:"PX",b:"CC",kind:"project",rel:"operator",note:"Demo relationship untuk desain."},
 {id:"E4",a:"PX",b:"CD",kind:"project",rel:"konsorsium",note:"Demo relationship untuk desain."},
 {id:"E5",a:"CA",b:"PA",kind:"people",rel:"jabatan perusahaan",note:"Pada data final akan ditautkan ke sumber jabatan."},
 {id:"E6",a:"CB",b:"PB",kind:"people",rel:"jabatan perusahaan",note:"Pada data final akan ditautkan ke sumber jabatan."},
 {id:"E7",a:"CC",b:"IA",kind:"corporate",rel:"struktur / hubungan",note:"Jenis relationship akan dijelaskan di evidence."},
 {id:"E8",a:"CD",b:"IB",kind:"corporate",rel:"struktur / hubungan",note:"Jenis relationship akan dijelaskan di evidence."},
];
let scale=1, tx=0, ty=0, drag=null, edgeFilter="all";

function drawGraph(){
 const g=$("graphViewport");
 const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));
 g.innerHTML=`<g id="edges"></g><g id="nodes"></g>`;
 const eg=g.querySelector("#edges"), ng=g.querySelector("#nodes");
 edges.forEach(e=>{
   const a=byId[e.a],b=byId[e.b];
   const line=document.createElementNS("http://www.w3.org/2000/svg","line");
   line.setAttribute("x1",a.x);line.setAttribute("y1",a.y);line.setAttribute("x2",b.x);line.setAttribute("y2",b.y);
   line.setAttribute("class",`edge ${e.kind}`);line.dataset.id=e.id;line.dataset.kind=e.kind;line.addEventListener("click",ev=>{ev.stopPropagation();selectEdge(e.id)});
   eg.appendChild(line);
 });
 nodes.forEach(n=>{
   const group=document.createElementNS("http://www.w3.org/2000/svg","g");
   group.setAttribute("class",`node ${n.type}`);group.dataset.id=n.id;group.setAttribute("transform",`translate(${n.x} ${n.y})`);
   group.innerHTML=`<circle r="${n.type==="project"?52:42}"></circle><text y="4">${esc(n.label)}</text>`;
   group.addEventListener("click",ev=>{ev.stopPropagation();selectNode(n.id)});
   ng.appendChild(group);
 });
 applyTransform();
}
function applyTransform(){ $("graphViewport").setAttribute("transform",`translate(${tx} ${ty}) scale(${scale})`); }
function selectNode(id){
 document.querySelectorAll(".node").forEach(n=>n.classList.toggle("selected",n.dataset.id===id));
 const n=nodes.find(x=>x.id===id);
 $("edgeInspector").innerHTML=`<div class="mini-label">ENTITAS DIPILIH</div><h3>${esc(n.label)}</h3><div class="relation">${esc(n.type)}</div><div class="source-box">Versi final: profil entitas, hubungan, periode, confidence, dan evidence akan muncul di panel ini.</div>`;
}
function selectEdge(id){
 const e=edges.find(x=>x.id===id),a=nodes.find(n=>n.id===e.a),b=nodes.find(n=>n.id===e.b);
 document.querySelectorAll(".node").forEach(n=>n.classList.remove("selected"));
 $("edgeInspector").innerHTML=`<div class="mini-label">HUBUNGAN DIPILIH</div><h3>${esc(e.rel)}</h3><div class="relation">${esc(a.label)} → ${esc(b.label)}</div><p>${esc(e.note)}</p><div class="source-box"><b>Sumber:</b> placeholder demo<br><b>Status:</b> needs review</div>`;
}
function filterEdges(kind){
 edgeFilter=kind;
 document.querySelectorAll(".edge").forEach(e=>e.classList.toggle("dim",kind!=="all"&&e.dataset.kind!==kind));
 document.querySelectorAll("[data-edgefilter]").forEach(x=>x.classList.toggle("active",x.dataset.edgefilter===kind));
}
function resetGraph(){scale=1;tx=0;ty=0;applyTransform();filterEdges("all");document.querySelectorAll(".node").forEach(n=>n.classList.remove("selected"));$("edgeInspector").innerHTML=`<div class="mini-label">DETAIL HUBUNGAN</div><h3>Belum dipilih</h3><p>Klik node atau garis pada jaringan.</p>`}

$("projectSearch").addEventListener("input",renderProjects);$("sectorFilter").addEventListener("change",renderProjects);$("statusFilter").addEventListener("change",renderProjects);
$("closeDialog").addEventListener("click",()=>$("detailDialog").close());
$("detailDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
$("searchOpen").addEventListener("click",()=>{$("searchDialog").showModal();setTimeout(()=>$("globalSearch").focus(),40)});
$("closeSearch").addEventListener("click",()=>$("searchDialog").close());
$("searchDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});

const searchIndex=[
 ...projects.map(p=>({type:"Proyek",name:p.name,meta:`${p.sector} · ${p.province}`,id:p.id})),
 ...companies.map(c=>({type:"Perusahaan",name:c[0],meta:c[1],id:""})),
 ...people.map(p=>({type:"Orang",name:p[0],meta:p[1],id:""})),
 ...[{type:"Aturan",name:"Permenko 16 / 19 / 20 Tahun 2025",meta:"Perubahan dan mekanisme perubahan daftar PSN",id:""}]
];
$("globalSearch").addEventListener("input",()=>{
 const q=$("globalSearch").value.toLowerCase().trim();
 const hits=q?searchIndex.filter(x=>(x.name+" "+x.meta).toLowerCase().includes(q)).slice(0,20):[];
 $("searchResults").innerHTML=hits.length?hits.map(h=>`<div class="result" data-id="${esc(h.id)}"><span>${esc(h.type)}</span><b>${esc(h.name)}</b><span>${esc(h.meta)}</span></div>`).join(""):`<div class="meta">${q?"Tidak ditemukan.":"Ketik proyek, perusahaan, orang, atau aturan."}</div>`;
 document.querySelectorAll(".result").forEach(r=>r.addEventListener("click",()=>{if(r.dataset.id){$("searchDialog").close();openProject(r.dataset.id)}}));
});

document.querySelectorAll("[data-edgefilter]").forEach(b=>b.addEventListener("click",()=>filterEdges(b.dataset.edgefilter)));
$("resetGraph").addEventListener("click",resetGraph);
$("zoomIn").addEventListener("click",()=>{scale=Math.min(2,scale*1.15);applyTransform()});
$("zoomOut").addEventListener("click",()=>{scale=Math.max(.6,scale/1.15);applyTransform()});
$("zoomReset").addEventListener("click",resetGraph);

$("graphSvg").addEventListener("wheel",e=>{e.preventDefault();scale=Math.max(.6,Math.min(2,scale*(e.deltaY<0?1.08:.92)));applyTransform()},{passive:false});
$("graphSvg").addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY,tx,ty};$("graphSvg").classList.add("dragging")});
window.addEventListener("pointermove",e=>{if(!drag)return;tx=drag.tx+(e.clientX-drag.x);ty=drag.ty+(e.clientY-drag.y);applyTransform()});
window.addEventListener("pointerup",()=>{drag=null;$("graphSvg").classList.remove("dragging")});

drawGraph();renderProjects();renderCompanies();renderPeople();
