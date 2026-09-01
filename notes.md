# PSN Watch Data Schema v1.0

## Tujuan
Schema ini membuat website menjadi lapisan tampilan di atas database yang dapat tumbuh dari 1 proyek menjadi seluruh PSN.

## Entity
- `projects`: proyek fisik/spesifik.
- `programs`: program/umbrella PSN.
- `companies`: badan usaha.
- `people`: orang.
- `institutions`: institusi/pemerintah.
- `regulations`: aturan.
- `sources`: sumber asal.
- `evidence`: bukti/claim yang ditautkan ke sumber.
- `relationships`: edge antar-entitas.
- `observations`: nilai/fakta yang berubah menurut waktu.

## Prinsip inti
1. Satu entitas satu record canonical.
2. Fakta yang berubah disimpan di `observations`, bukan ditimpa.
3. Relationship selalu punya sumber/evidence bila memungkinkan.
4. `source` ≠ `evidence`: source adalah dokumen; evidence adalah klaim/bagian yang mendukung.
5. Status verifikasi harus eksplisit.
6. Klaim, fakta, dan analisis tidak boleh dicampur.
7. Search/news automation hanya menghasilkan kandidat update; publikasi membutuhkan review.

## Status yang disarankan
- `documented` = didukung sumber yang sudah ditinjau.
- `pending` = kandidat/struktur ada tetapi belum cukup bukti.
- `disputed` = terdapat pertentangan/klaim berbeda yang perlu ditampilkan apa adanya.
- `placeholder` = desain/test data; jangan dipakai sebagai fakta publik.

## Contoh
Nilai investasi proyek dapat punya dua observation:
- KPPIP: Rp9,934 T.
- SIMPUL: Rp8,57 T.

Keduanya tetap berada di database karena definisi/konteks sumber berbeda.

## Roadmap
1. Isi seluruh daftar PSN minimal.
2. Lengkapi P001 sebagai benchmark.
3. Ganti placeholder company/person dengan entity nyata setelah verifikasi.
4. Bangun importer agar website membaca CSV.
5. Tambahkan automated update feed.
