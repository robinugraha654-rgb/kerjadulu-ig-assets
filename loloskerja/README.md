# LolosKerja: konten iklan

Konten iklan Meta Ads untuk app **LolosKerja** (latihan tes pabrik untuk lulusan SMA/SMK).

```
loloskerja/
├── konten/                 ← siap upload ke Ads Manager
│   ├── video/              video 9:16 (1080×1920): hook 1, 7, 12, 13 + angle loker palsu, berkas & orang tua
│   ├── thumbnail/          thumbnail/cover video (1080×1920), 1 per video
│   ├── single-image/       5 gambar 4:5 (1080×1350)
│   ├── carousel/           6 kartu 1:1 (1080×1080), urutan 1 sampai 6
│   └── copy-iklan.md       primary text, headline, deskripsi, CTA
└── project/                ← kode Remotion untuk edit & render ulang
```

## Isi konten

| Format | File | Angle |
|---|---|---|
| Video | `video/loloskerja-hook1.mp4` | "Lulusan SMK, minggu ini ada panggilan tes pabrik?" |
| Video | `video/loloskerja-hook7.mp4` | "Mengapa kami harus memilih Anda?" |
| Video | `video/loloskerja-hook12.mp4` | "Ngebut di awal tes koran justru bisa bikin gugur." |
| Video | `video/loloskerja-hook13.mp4` | Tantangan soal deret "2, 4, 8, 16, 32, ?" |
| Video | `video/loloskerja-angle-lokerpalsu.mp4` | Angle loker palsu: "Diterima, tapi disuruh transfer?" + 5 tanda loker palsu |
| Video | `video/loloskerja-angle-berkas.mp4` | Angle berkas: "Gugur sebelum tes" + 4 kesalahan berkas & perbaikannya |
| Video | `video/loloskerja-angle-orangtua.mp4` | Angle orang tua (target 35–55): "Anak baru lulus SMK?", VO perempuan dewasa |
| Thumbnail | `thumbnail/loloskerja-thumb-hookN.png` | Cover untuk video hook N (1, 7, 12, 13) |
| Thumbnail | `thumbnail/loloskerja-thumb-{lokerpalsu,berkas,orangtua}.png` | Cover untuk 3 video angle |
| Image | `single-image/loloskerja-img-1-panggilan.png` | Panggilan tes pabrik |
| Image | `single-image/loloskerja-img-2-hrd.png` | Pertanyaan HRD + kartu interview |
| Image | `single-image/loloskerja-img-3-ngebut.png` | Grafik per lajur |
| Image | `single-image/loloskerja-img-4-deret.png` | Tantangan soal deret (ajak komentar) |
| Image | `single-image/loloskerja-img-5-kit.png` | Penawaran produk |
| Carousel | `carousel/loloskerja-car-1` sampai `6` | Hook → tes koran → grafik → psikotes → interview → penawaran |

## Edit / render ulang

```bash
cd project
npm install
npx remotion studio
```

Detail lengkapnya ada di `project/README.md`.
