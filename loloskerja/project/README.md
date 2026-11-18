# LolosKerja: video iklan (Remotion)

> Hasil render baru masuk ke `out/` (tidak di-commit). Salin file yang sudah final ke `../konten/`.

Video iklan 9:16 (1080×1920, 30fps) untuk app **LolosKerja**. Ada 4 varian hook dengan isi video yang sama, untuk A/B test di Meta Ads.

## Video jadi (`../konten/video/`)

| File | Hook | Durasi |
|---|---|---|
| `../konten/video/loloskerja-hook1.mp4` | "Lulusan SMK, minggu ini ada panggilan tes pabrik? Berhenti scroll dulu!" | 30,5 dtk |
| `../konten/video/loloskerja-hook7.mp4` | "Mengapa kami harus memilih Anda?" (simulasi interview HRD) | 33,2 dtk |
| `../konten/video/loloskerja-hook12.mp4` | "Ngebut di awal tes koran… justru bisa bikin kamu gugur." (grafik per lajur) | 35,8 dtk |
| `../konten/video/loloskerja-hook13.mp4` | Tantangan soal deret "2, 4, 8, 16, 32… ?" dengan countdown | 39,6 dtk |

Isi video yang dipakai bersama semua varian:
1. **Masalah**: "Banyak yang gugur bukan karena nggak pintar, tapi karena kaget sama soalnya."
2. **Demo tes koran**: animasi per lajur dengan timer.
3. **Reveal**: logo LolosKerja dan HP berisi layar tes koran asli.
4. **Fitur**: 150 soal psikotes + pembahasan, 40 pertanyaan HRD + contoh jawaban.
5. **CTA**: Rp49.000 sekali bayar, tanpa kuota, garansi 7 hari, "Cek link di bio".

## Single image ads (`../konten/single-image/`), 1080×1350 (4:5 feed)

| File | Angle |
|---|---|
| `loloskerja-img-1-panggilan.png` | "Minggu ini ada panggilan tes pabrik?" + layar tes koran |
| `loloskerja-img-2-hrd.png` | "Mengapa kami harus memilih Anda?" Kamu jawab apa? + contoh pertanyaan HRD |
| `loloskerja-img-3-ngebut.png` | "Ngebut di awal justru bisa bikin gugur." + grafik per lajur |
| `loloskerja-img-4-deret.png` | Tantangan soal deret "2, 4, 8, 16, 32, ?" (ajak komentar) |
| `loloskerja-img-5-kit.png` | Penawaran produk: 3 layar app + fitur + harga |

Kode desainnya ada di `src/stills/Ads.tsx`. Render ulang: `npx remotion still Img-1-Panggilan out/images/loloskerja-img-1-panggilan.png` (ganti ID-nya untuk gambar lain: `Img-2-HRD`, `Img-3-Ngebut`, `Img-4-Deret`, `Img-5-Kit`).

## Carousel ads (`../konten/carousel/`), 1080×1080 (1:1), 6 kartu

Urutan kartu: `car-1-hook`, `car-2-koran`, `car-3-grafik`, `car-4-psikotes`, `car-5-interview`, `car-6-offer`. Kode desainnya ada di `src/stills/Carousel.tsx`, dengan ID composition `Car-1-Hook` sampai `Car-6-Offer`.

## Struktur

```
src/
  Composition.tsx        # Daftar varian (Hook1/7/12/13) + susunan adegan isi video
  theme.ts               # Warna app, font, helper animasi
  common.tsx             # Background, grain, Phone mockup, Chip, Logo, Sfx, dll.
  scenes/
    S1Hook.tsx           # Hook #1
    S7HookHRD.tsx        # Hook #7
    S12HookNgebut.tsx    # Hook #12
    S13HookDeret.tsx     # Hook #13
    S2Problem.tsx … S6Cta.tsx   # Isi video yang dipakai semua varian
public/
  vo/      # Voice over ElevenLabs (suara "Finn"). vo.mp3 = Hook1 + isi; vo-hookN.mp3 = hook N + isi
  shots/   # Screenshot asli dari app loloskerja.pages.dev
  sfx/     # Efek suara (dibuat dengan ffmpeg)
  fonts/   # Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono, Caveat (lokal, supaya render tidak butuh internet)
```

Waktu tiap adegan disinkronkan dengan timestamp per kata dari VO. Kalau VO diganti, angka `at={…}` di adegan terkait juga harus disesuaikan.

## Menjalankan

```bash
npm install
npx remotion studio                 # preview & edit di browser
npx remotion render Hook1 out/loloskerja-hook1.mp4 --codec=h264 --crf=18
npx remotion render Hook7 out/loloskerja-hook7.mp4 --codec=h264 --crf=18
npx remotion render Hook12 out/loloskerja-hook12.mp4 --codec=h264 --crf=18
npx remotion render Hook13 out/loloskerja-hook13.mp4 --codec=h264 --crf=18
```

## Menambah varian hook baru

1. Buat VO hook dengan suara yang sama, lalu gabungkan dengan bagian isi dari `vo.mp3` (mulai detik 4,45).
2. Buat adegan baru di `src/scenes/`, export komponen dan durasinya.
3. Tambahkan satu baris di `VARIANTS` dalam `src/Composition.tsx`.
