# PSN Watch Indonesia — v0.1

Prototype open-data project untuk memetakan Proyek Strategis Nasional (PSN),
perusahaan, orang, aturan, uang, dan hubungan antar-entitas berbasis evidence.

## Prinsip
1. Source-first: setiap fakta/relationship punya sumber.
2. Primary-source-first: regulasi dan dokumen resmi diprioritaskan.
3. Google/search engine hanya untuk discovery, bukan sumber kebenaran.
4. AI membantu ekstraksi dan pencarian kandidat; publikasi membutuhkan verifikasi.
5. Data historis tidak ditimpa; perubahan dicatat.
6. Fakta, laporan media, dan inferensi dipisahkan.

## Pilot
Versi ini berisi seed 10 proyek untuk pengujian schema. Data yang belum diverifikasi
dibiarkan kosong; jangan mengisi dengan tebakan.

## Struktur
- data/: dataset CSV
- research/: metodologi dan kebijakan sumber
- scripts/: utilitas validasi/import
- website/: placeholder untuk frontend

## Status
MVP data model — belum merupakan database nasional lengkap.

## Important: time-aware PSN list
The pilot uses a 2026-oriented snapshot from Kemenko/KPPIP. Historical changes are
kept separately in `data/historical_projects.csv`. This avoids presenting removed
projects as currently active PSN.
