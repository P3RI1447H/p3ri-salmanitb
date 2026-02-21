# Website P3RI 1447H

Repository resmi untuk pengembangan website P3RI (Panitia Pelaksana Program Ramadhan dan Idul Adha) Masjid Salman ITB tahun 1447H.

Website ini berfungsi sebagai pusat informasi kegiatan, pendaftaran program, jadwal imsakiyah/kegiatan, serta portal donasi/infak selama bulan Ramadhan dan Zulhijjah.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

Kita menggunakan teknologi standar industri modern agar performa cepat dan code mudah dikelola oleh staf:

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Icons:** Lucide React
- **Deployment:** Vercel

## Development Environment & Tools

Untuk menjaga konsistensi kode antar anggota tim, harap gunakan tools berikut:

- **IDE:** Visual Studio Code (VS Code)
- **Version Control System (VCS):** Git & GitHub
- **API Testing:** Postman (untuk tes endpoint Supabase jika perlu)
- **AI Tools yang Diperbolehkan:**
  - ChatGPT / Gemini (untuk brainstorming logic & debugging)
  - GitHub Copilot / Cursor (untuk autocomplete code)
  - *Catatan:* Dilarang copy-paste kode AI mentah-mentah tanpa memahami cara kerjanya. Pastikan kode diperiksa ulang.

## Struktur Folder Project

Agar tidak bingung menaruh file, ikuti struktur folder di bawah ini. Struktur ini disusun berdasarkan kebutuhan fitur (Program, Timeline, Live, Infak, Sponsor). Jangan mengubah struktur inti tanpa diskusi dengan tim inti.

```text
p3ri-salmanitb/
├── public/                     # Folder aset statis (Gambar, Logo, Icon)
│   ├── images/
│   │   ├── logo-p3ri.png
│   │   ├── qris-donasi.png     
│   │   ├── footer-bg.png
│   │   └── sponsors/           
│   └── favicon.ico
│
├── src/
│   ├── app/                    # ROUTING (Halaman Website)
│   │   ├── layout.tsx          # Layout Utama (Navbar & Footer nempel disini)
│   │   ├── page.tsx            # Halaman HOME (Landing Page)
│   │   ├── program/            # Fitur Program P3RI
│   │   │   ├── page.tsx        # List semua program (Card view)
│   │   │   └── [slug]/         # Halaman Detail Program (Dinamis)
│   │   ├── timeline/           # Fitur Kalender/Jadwal
│   │   │   └── page.tsx        # Tampilan Kalender ala SIX ITB
│   │   ├── live/               # Fitur Live Streaming
│   │   │   └── page.tsx        # Player YouTube & Playlist
│   │   ├── infak/              # Halaman Donasi/Infak
│   │   │   └── page.tsx        # Info Rekening & QRIS
│   │   └── sponsor/            # Halaman Sponsor
│   │       └── page.tsx        # List sponsor & contact person
│   │
│   ├── components/             # KOMPONEN UI (Reusable)
│   │   ├── layout/             # Komponen Struktur Global
│   │   │   ├── Navbar.tsx      
│   │   │   └── Footer.tsx      
│   │   ├── ui/                 # Komponen Kecil (Atom)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx       
│   │   └── features/           # Komponen Spesifik Fitur
│   │       ├── ProgramCard.tsx 
│   │       ├── CalendarView.tsx
│   │       ├── VideoPlayer.tsx 
│   │       └── SponsorGrid.tsx 
│   │
│   ├── lib/                    # KONFIGURASI & LOGIC
│   │   ├── supabase.ts         # Koneksi ke Database Supabase
│   │   └── utils.ts            # Fungsi bantuan
│   │
│   └── styles/                 
│       └── globals.css         # CSS Global

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Setup Environment Variable

1. Duplicate `.env.example` and rename it to `.env.local`.
2. Ask the Tech Lead (Dimyati) for the Supabase Keys.
3. Fill the file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Workflow & Guidelines (Panduan Kontribusi)

Untuk menjaga kerapihan kode dan memudahkan kolaborasi, setiap anggota tim **wajib** mengikuti aturan berikut.

### 1. Version Control System (VCS)

Kita menggunakan **Git** sebagai sistem pengontrol versi dan **GitHub** sebagai tempat penyimpanan kode (repository).

* **Git** digunakan di laptop masing-masing untuk menyimpan perubahan (save checkpoint).
* **GitHub** digunakan untuk menggabungkan kode antar anggota tim.

### 2. Aturan Branching (Cabang)

Dilarang melakukan coding langsung di branch `main`. Gunakan format penamaan branch berikut:

`tipe/nama-fitur-singkat`

* **feat/** : Untuk fitur baru (contoh: `feat/navbar`, `feat/kalender`)
* **fix/** : Untuk perbaikan bug (contoh: `fix/tombol-error`)
* **style/** : Untuk perbaikan styling/css (contoh: `style/margin-home`)
* **docs/** : Untuk perubahan dokumentasi (contoh: `docs/update-readme`)

**Cara membuat branch:**

```bash
git checkout -b feat/nama-fitur-kamu

```

### 3. Semantic Commit Messages

Pesan commit harus jelas dan mengikuti standar Semantic Commit agar mudah dibaca oleh tim lain.

**Format:** `tipe: deskripsi singkat apa yang dilakukan`

**Daftar Tipe:**

* `feat`: Menambahkan fitur baru.
* `fix`: Memperbaiki bug.
* `docs`: Mengubah dokumentasi (readme, komentar).
* `style`: Mengubah tampilan (spasi, format, css) tanpa mengubah logika.
* `refactor`: Mengubah susunan kodingan tanpa mengubah fitur (bersih-bersih kode).
* `chore`: Tugas-tugas kecil (update package, config).

**Contoh Benar:**

* `feat: menambahkan komponen navbar`
* `fix: memperbaiki error pada tombol donasi`
* `style: merapikan margin halaman home`

**Contoh Salah:**

* `update`
* `benerin bug`
* `final fix banget`

### 4. Pull Request (PR)

Setelah kode selesai di-push ke branch kamu, lakukan Pull Request ke `main` melalui website GitHub.

**Syarat PR:**

1. Berikan judul PR sesuai semantic commit (contoh: `feat: Menambahkan halaman donasi`).
2. Tulis deskripsi singkat apa yang kamu kerjakan.
3. Minimal di-review oleh 1 orang teman tim atau Tech Lead sebelum di-merge.
4. Pastikan tidak ada konflik (conflict) dengan branch `main`.

### Cheat Sheet Git

| Perintah | Fungsi |
| --- | --- |
| `git status` | Mengecek file mana yang berubah |
| `git add .` | Menandai semua file untuk disimpan |
| `git commit -m "pesan"` | Menyimpan perubahan secara lokal |
| `git push` | Mengupload perubahan ke GitHub |
| `git pull` | Mengambil update terbaru dari GitHub (download) |
| `git checkout -b nama` | Membuat cabang/branch baru |
| `git checkout main` | Pindah kembali ke branch utama |
| `git branch` | Melihat daftar branch yang ada |

### Pembagian Fokus Tim

| Tim | Fokus Modul | Komponen Kunci |
| --- | --- | --- |
| **Frontend A** | Layout & Home | Navbar, Footer, HomePage, HeroSection |
| **Frontend B** | Program & Pendaftaran | ProgramCard, DetailProgram, FormPendaftaran |
| **Frontend C** | Timeline (Kalender) | CalendarView, ModalDetail, Logic Fetching Jadwal |
| **Frontend D** | Static Pages | Halaman Infak, Live Stream, Sponsor |
| **Backend** | Database & API | Setup Supabase, Table Structure, Koneksi API |

```