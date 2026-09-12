const projects=[
["P001","Jalan Tol Sigli – Banda Aceh","Jalan","Aceh","Berjalan","Rp 16,5 T","proyek-serang-panimbang.html"],
["P002","Jalan Tol Kayu Agung – Palembang – Betung","Jalan","Sumatera Selatan","Operasi","Rp 17,3 T","proyek-serang-panimbang.html"],
["P003","Jalan Tol Serang – Panimbang","Jalan","Banten","Operasi","Rp 9,9 T","proyek-serang-panimbang.html"],
["P004","Konstruksi Tangki Penyimpanan LPG (Kupang)","Energi","Indonesia Timur","Berjalan","Rp 0,32 T","proyek-serang-panimbang.html"],
["P005","Pipa Transmisi Gas Bumi Cirebon – Semarang Tahap II","Energi","Jawa Barat & Jawa Tengah","Berjalan","Rp 2,79 T","proyek-serang-panimbang.html"],
["P006","Kawasan Industri Tanah Kuning (PT ISI)","Kawasan","Kalimantan Utara","Berjalan","Rp 55 T","proyek-serang-panimbang.html"],
["P007","Bendungan Jragung","Bendungan","Jawa Tengah","Berjalan","Rp 2,8 T","proyek-serang-panimbang.html"],
["P008","SPAM Regional Benteng – Kobema","Air","Bengkulu","Selesai","Rp 0,9 T","proyek-serang-panimbang.html"],
["P009","Kawasan Industri Kuala Tanjung","Kawasan","Sumatera Utara","Berjalan","Rp 28,8 T","proyek-serang-panimbang.html"],
["P010","Kawasan Industri Wiraraja GESEIP","Kawasan","Kepulauan Riau","Berjalan","Rp 343,79 T","proyek-serang-panimbang.html"]
];
const esc=s=>(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
function renderProjects(){
 const q=document.getElementById("projectSearch").value.toLowerCase().trim(), sec=document.getElementById("sectorFilter").value, st=document.getElementById("statusFilter").value;
 const items=projects.filter(p=>(!q||[p[1],p[2],p[3]].join(" ").toLowerCase().includes(q))&&(!sec||p[2]===sec)&&(!st||p[4]===st));
 document.getElementById("projectGrid").innerHTML=items.map(p=>`<a class="project-card" href="${p[6]}"><span class="tag">${esc(p[2])}</span><h3>${esc(p[1])}</h3><div class="meta">${esc(p[3])}</div><div class="card-bottom"><span>${esc(p[4])}</span><b>${esc(p[5])}</b></div></a>`).join("")||'<div class="meta">Tidak ada proyek yang cocok.</div>';
}
document.getElementById("projectSearch").addEventListener("input",renderProjects);
document.getElementById("sectorFilter").addEventListener("change",renderProjects);
document.getElementById("statusFilter").addEventListener("change",renderProjects);
document.getElementById("searchOpen").addEventListener("click",()=>{document.getElementById("searchDialog").showModal();setTimeout(()=>document.getElementById("globalSearch").focus(),40)});
document.getElementById("closeSearch").addEventListener("click",()=>document.getElementById("searchDialog").close());
document.getElementById("searchDialog").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
const searchIndex=projects.map(p=>({type:"Proyek",name:p[1],meta:`${p[2]} · ${p[3]}`,url:p[6]})).concat([
{type:"Aturan",name:"Permenko 16 / 19 / 20 Tahun 2025",meta:"Perubahan dan mekanisme perubahan daftar PSN",url:"#aturan"},
{type:"Perusahaan",name:"Perusahaan A",meta:"Demo · belum diverifikasi",url:"#perusahaan"},
{type:"Orang",name:"Orang A",meta:"Demo · belum diverifikasi",url:"#orang"}]);
document.getElementById("globalSearch").addEventListener("input",()=>{
 const q=document.getElementById("globalSearch").value.toLowerCase().trim(); const hits=q?searchIndex.filter(x=>(x.name+" "+x.meta).toLowerCase().includes(q)).slice(0,15):[];
 document.getElementById("searchResults").innerHTML=hits.length?hits.map(h=>`<a class="result" href="${h.url}"><span>${esc(h.type)}</span><b>${esc(h.name)}</b><span>${esc(h.meta)}</span></a>`).join(""):'<div class="meta">Ketik proyek, perusahaan, orang, atau aturan.</div>';
});
renderProjects();