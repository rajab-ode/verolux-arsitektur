# 📸 Reference Project Screenshots - SRM (Security Risk Management)

Folder ini berisi screenshot dari project yang sudah jadi (SRM) sebagai referensi untuk implementasi Verolux Management System.

## 📁 Struktur Folder

```
reference-project/
├── sidebar/              # Screenshot menu sidebar
├── dashboard/            # Halaman dashboard & overview
├── reporting/            # Module reporting
│   ├── dar/              # Daily Activity Report
│   ├── visitors/         # Daily Visitors Report
│   ├── intelligence/     # Laporan Intelligent
│   └── compliance/       # Compliance And Auditor
├── patrol/               # Module patrol
│   ├── schedule/         # Patrol Schedule
│   ├── assignment/       # Patrol Assignment
│   ├── security-patrol/  # Security Patrol
│   ├── joint-patrol/     # Joint Patrol
│   └── report/           # Patrol Report
├── incident/             # Module incident
│   ├── lk-lp/            # LK dan LP
│   ├── bap/              # BAP
│   ├── stplk/            # NO STPLK
│   ├── findings/         # Findings Report
│   └── recap/            # Incident Recap
├── training/             # Module training
│   ├── plan/             # Training Plan
│   └── participant/      # Training Participant
├── kpi/                  # Module KPI
│   ├── patrol/           # KPI Patrol
│   ├── report/           # KPI Report
│   ├── cctv/             # KPI CCTV
│   └── training/         # KPI Training
├── master-data/          # Master data management
│   ├── worker/           # Worker Data
│   ├── business-unit/    # Business Unit
│   ├── department/       # Department
│   ├── guard-points/     # Patrol and Guard Points
│   ├── job-position/     # Job Position
│   ├── asset/            # Asset Management
│   └── cctv-zone/        # CCTV Zone
├── administrator/        # Admin settings
│   ├── user-management/  # User Management
│   ├── user-access/      # User Access
│   └── translation/      # Translation/i18n
├── forms/                # Screenshot form pages (create/edit)
├── lists/                # Screenshot list/table pages
└── details/              # Screenshot detail pages
```

## 📝 Cara Menggunakan

### 1. Upload Screenshot
Masukkan screenshot ke folder yang sesuai dengan kategorinya.

### 2. Penamaan File
Gunakan format penamaan yang deskriptif:
```
[module]-[page]-[state].png

Contoh:
- patrol-schedule-list.png
- patrol-schedule-form-create.png
- patrol-schedule-form-edit.png
- incident-lk-detail.png
- dashboard-overview.png
```

### 3. Screenshot yang Dibutuhkan per Module

Untuk setiap module, idealnya capture:
- [ ] **List Page** - Halaman daftar/tabel
- [ ] **Form Create** - Form tambah data baru
- [ ] **Form Edit** - Form edit data (jika berbeda)
- [ ] **Detail Page** - Halaman detail
- [ ] **Filter/Search** - Fitur filter dan search
- [ ] **Modal/Dialog** - Pop-up atau dialog jika ada

## 📊 Checklist Screenshot

### Sidebar & Navigation
- [ ] Full sidebar menu (collapsed)
- [ ] Full sidebar menu (expanded)
- [ ] Mobile navigation (if any)

### Dashboard
- [ ] Main dashboard overview
- [ ] Dashboard widgets/cards
- [ ] Dashboard charts/graphs

### Reporting Module
- [ ] Daily Activity Report - List
- [ ] Daily Activity Report - Form
- [ ] Daily Activity Report - Detail
- [ ] Daily Visitors Report - List
- [ ] Daily Visitors Report - Form
- [ ] Laporan Intelligent - List
- [ ] Laporan Intelligent - Form
- [ ] Compliance And Auditor - List
- [ ] Compliance And Auditor - Form

### Patrol Module
- [ ] Patrol Schedule - Calendar/List view
- [ ] Patrol Schedule - Create/Edit
- [ ] Patrol Assignment - List
- [ ] Patrol Assignment - Form
- [ ] Security Patrol - List
- [ ] Security Patrol - Detail
- [ ] Joint Patrol - List
- [ ] Joint Patrol - Form
- [ ] Patrol Report - List
- [ ] Patrol Report - Detail

### Incident Module
- [ ] LK dan LP - List
- [ ] LK dan LP - Form
- [ ] BAP - List
- [ ] BAP - Form
- [ ] NO STPLK - List
- [ ] NO STPLK - Form
- [ ] Findings Report - List
- [ ] Findings Report - Form
- [ ] Incident Recap - Dashboard/Summary

### Training Module
- [ ] Training Plan - List
- [ ] Training Plan - Form
- [ ] Training Participant - List
- [ ] Training Participant - Form

### KPI Module
- [ ] KPI Patrol - Dashboard
- [ ] KPI Report - Charts
- [ ] KPI CCTV - Metrics
- [ ] KPI Training - Summary

### Master Data
- [ ] Worker Data - List & Form
- [ ] Business Unit - List & Form
- [ ] Department - List & Form
- [ ] Patrol and Guard Points - List & Form
- [ ] Job Position - List & Form
- [ ] Asset Management - List & Form
- [ ] Asset Category - List & Form
- [ ] CCTV Zone - List & Form

### Administrator
- [ ] User Management - List & Form
- [ ] User Access - Permission matrix
- [ ] Incident User Access - Settings
- [ ] Translation - Language management

## 🔗 Setelah Upload Selesai

Setelah semua screenshot diupload, berikan prompt ke AI Cursor:

```
Analisa semua foto di folder docs/reference-project/ dan buatkan dokumentasi phase-by-phase untuk implementasi ke project Verolux
```

## 📌 Notes

- Screenshot dengan resolusi yang jelas lebih baik
- Capture full page jika memungkinkan
- Jika ada state berbeda (loading, error, empty), capture juga
- Screenshot mobile view jika ada responsive design
