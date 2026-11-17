# LolosKerja app (Cloudflare Pages)

App latihan LolosKerja Kit di https://loloskerja.pages.dev, dengan kode akses per pembeli.

| Path | Isi |
|---|---|
| `public/` | Halaman app (`index.html`), service worker offline (`sw.js`), manifest, ikon, dan halaman admin (`admin/`). |
| `functions/` | Logika server: aktivasi kode (`api/activate.js`), isi app untuk HP yang sudah aktif (`api/kit.js`), admin kode (`api/admin/codes.js`). `_kit.js` berisi seluruh soal dan panduan. |
| `build/` | Sumber halaman app (`app.head.html`, `app.script.html`, `gate.js`), Modul 0 (`modul0.py`), perakit halaman (`make.py`), dan deploy (`deploy.py`). |

## Ubah lalu deploy

```bash
python3 build/make.py build/app.head.html build/app.script.html build/install.js public/index.html build/gate.js
python3 build/deploy.py main
```

`deploy.py` membuat `dist/` (aset + `_worker.js` hasil bundel `functions/`) lalu mengunggahnya lewat API Cloudflare.

## Rahasia

`TOKEN_SECRET` dan `ADMIN_KEY` tersimpan sebagai secret di proyek Pages `loloskerja`. Salinan lokal ada di `.secrets.local` (tidak di-commit).
