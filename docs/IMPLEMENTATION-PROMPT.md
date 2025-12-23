# 🚀 Implementation Prompt Templates

Dokumen ini berisi template prompt yang dapat digunakan untuk implementasi fitur-fitur di project Verolux berdasarkan referensi SRM.

---

## 📋 Table of Contents

1. [Master Prompt - Project Context](#master-prompt---project-context)
2. [Phase-Specific Prompts](#phase-specific-prompts)
3. [Feature-Specific Prompts](#feature-specific-prompts)
4. [Utility Prompts](#utility-prompts)

---

## 🎯 Master Prompt - Project Context

**Gunakan prompt ini di awal setiap session untuk memberikan konteks lengkap kepada AI:**

```
Saya sedang mengembangkan Verolux Management System, sebuah platform manajemen workforce terintegrasi untuk divisi Security, Cleaning, dan Driver/Transport.

## Project Context
- Project ini sudah 80% selesai
- Menggunakan FastAPI (Python) untuk backend dan React + TypeScript untuk frontend
- Database: PostgreSQL (production), SQLite (development)
- State Management: Zustand
- Styling: Tailwind CSS

## Reference Documentation
Semua dokumentasi referensi ada di folder `docs/`:

1. `docs/SRM-ARCHITECTURE.md` - Arsitektur lengkap sistem SRM sebagai referensi
2. `docs/IMPLEMENTATION-PHASES.md` - Phase-by-phase implementation plan dengan detail:
   - Database schema untuk setiap phase
   - Files yang perlu dibuat (backend & frontend)
   - API endpoints
   - Acceptance criteria
3. `docs/PHASE-SUMMARY.md` - Ringkasan semua 12 phase implementasi
4. `docs/FEATURE-COMPARISON.md` - Perbandingan fitur SRM vs Verolux (gap analysis)
5. `docs/reference-project/` - Struktur folder untuk screenshot referensi

## Current Task
[SEBUTKAN TASK SPESIFIK DI SINI]

## Instructions
1. Baca dokumentasi yang relevan sebelum implementasi
2. Ikuti struktur dan pattern yang sudah ada di codebase
3. Implementasi sesuai dengan database schema di docs/IMPLEMENTATION-PHASES.md
4. Buat semua files yang diperlukan (models, schemas, services, endpoints, pages)
5. Pastikan code mengikuti best practices dan consistent dengan existing code
```

---

## 📁 Phase-Specific Prompts

### Phase 1: Dashboard Enhancement

```
Berdasarkan dokumentasi di:
- docs/IMPLEMENTATION-PHASES.md (Phase 1: Core Dashboard Enhancement)
- docs/SRM-ARCHITECTURE.md (Section: Live Dashboard Module)

Implementasikan enhancement untuk Dashboard dengan fitur:

1. **Attendance Summary Widget**
   - Total On Duty, Late, Absent, Early Checkout
   
2. **Patrol Status Widget**
   - Routes Completed, In Progress, Pending, Missed Checkpoints

3. **Incident Summary Widget**
   - Open Incidents, In Review, Closed Today, Critical Alerts

4. **Task Completion Widget**
   - Checklist Progress, Overdue Tasks, Completed Today

5. **Filter Controls**
   - Date Range Picker
   - Site Selector (multi-select)
   - Division Filter
   - Shift Filter

Backend files yang perlu dibuat/enhance:
- app/api/v1/endpoints/dashboard.py
- app/schemas/dashboard.py
- app/services/dashboard_service.py

Frontend files:
- src/pages/supervisor/Dashboard/index.tsx
- src/pages/supervisor/Dashboard/components/AttendanceWidget.tsx
- src/pages/supervisor/Dashboard/components/PatrolWidget.tsx
- src/pages/supervisor/Dashboard/components/IncidentWidget.tsx
- src/pages/supervisor/Dashboard/components/TaskWidget.tsx
- src/pages/supervisor/Dashboard/components/DashboardFilters.tsx
- src/pages/supervisor/Dashboard/hooks/useDashboardData.ts

Acceptance Criteria:
- Dashboard loads dalam 2 detik
- Semua widget menampilkan data real-time
- Filter bekerja dengan benar
- Responsive untuk desktop dan tablet
```

---

### Phase 2: Daily Activity Report (DAR)

```
Berdasarkan dokumentasi di:
- docs/IMPLEMENTATION-PHASES.md (Phase 2: Daily Activity Report)
- docs/SRM-ARCHITECTURE.md (Section: 2.1 Daily Activity Report)

Implementasikan sistem Daily Activity Report (DAR) dengan fitur:

## Database Migration
Buat migration untuk tabel:
- daily_activity_reports
- dar_personnel
- dar_activities

Gunakan schema SQL dari docs/IMPLEMENTATION-PHASES.md

## Backend Implementation
Files yang perlu dibuat:
- app/models/dar.py
- app/schemas/dar.py
- app/api/v1/endpoints/dar.py
- app/services/dar_service.py
- app/repositories/dar_repository.py

API Endpoints:
- POST   /api/v1/dar                 - Create DAR
- GET    /api/v1/dar                 - List DAR (with filters)
- GET    /api/v1/dar/{id}            - Get DAR detail
- PUT    /api/v1/dar/{id}            - Update DAR
- DELETE /api/v1/dar/{id}            - Delete DAR
- POST   /api/v1/dar/{id}/submit     - Submit for review
- POST   /api/v1/dar/{id}/approve    - Approve DAR
- POST   /api/v1/dar/{id}/reject     - Reject DAR
- GET    /api/v1/dar/{id}/export-pdf - Export to PDF

## Frontend Implementation
Files yang perlu dibuat:
- src/pages/supervisor/DAR/index.tsx (list page)
- src/pages/supervisor/DAR/DARFormPage.tsx
- src/pages/supervisor/DAR/DARDetailPage.tsx
- src/pages/supervisor/DAR/components/DARTable.tsx
- src/pages/supervisor/DAR/components/DARFilters.tsx
- src/pages/supervisor/DAR/components/DARForm.tsx
- src/pages/supervisor/DAR/components/ActivityList.tsx
- src/pages/supervisor/DAR/hooks/useDAR.ts
- src/services/darService.ts
- src/types/dar.ts

## Form Fields
- Site Selection, Shift, Report Date
- Personnel on Duty (multi-select)
- Weather Condition
- Activities (dynamic list dengan Time, Type, Description, Location, Photo)
- Handover Notes
- Status workflow: DRAFT → SUBMITTED → APPROVED/REJECTED
```

---

### Phase 3: Daily Visitors Report

```
Berdasarkan dokumentasi di:
- docs/IMPLEMENTATION-PHASES.md (Phase 3: Daily Visitors Report)
- docs/SRM-ARCHITECTURE.md (Section: 2.2 Daily Visitors Report)

Implementasikan sistem Visitor Management dengan fitur:

## Database Migration
Buat tabel `visitors` dengan schema dari docs/IMPLEMENTATION-PHASES.md

## Backend Implementation
Files:
- app/models/visitor.py
- app/schemas/visitor.py
- app/api/v1/endpoints/visitors.py
- app/services/visitor_service.py

API Endpoints:
- POST   /api/v1/visitors              - Register visitor
- GET    /api/v1/visitors              - List visitors
- GET    /api/v1/visitors/current      - Currently on-site
- POST   /api/v1/visitors/{id}/checkout - Check out visitor
- GET    /api/v1/visitors/stats        - Statistics

## Frontend Implementation
- Visitor Registration Form dengan camera capture
- Visitor List dengan filter (Date, Site, Status)
- Current Visitors widget
- Check-out modal
- Badge printing

## Key Features
- Quick visitor registration
- Photo capture dari camera
- Check-in/Check-out tracking
- Vehicle info (optional)
- Badge number assignment
```

---

### Phase 4: Patrol Management System

```
Berdasarkan dokumentasi di:
- docs/IMPLEMENTATION-PHASES.md (Phase 4: Patrol Management System)
- docs/SRM-ARCHITECTURE.md (Section: 3. Patrol Module)

Implementasikan sistem Patrol Management lengkap:

## Database Migration
Buat tabel-tabel:
- patrol_routes
- patrol_checkpoints
- patrol_schedules
- patrol_assignments
- patrol_logs
- patrol_reports

## Sub-modules yang perlu diimplementasi:

### 4.1 Patrol Schedule
- Calendar view (monthly/weekly/daily)
- Drag-and-drop scheduling
- Recurring schedule support

### 4.2 Patrol Assignment
- Kanban board view
- Personnel assignment
- Equipment checklist

### 4.3 Security Patrol (Execution)
- Mobile patrol interface
- QR scan at checkpoints
- GPS tracking
- Photo evidence

### 4.4 Joint Patrol
- Multiple personnel selection
- Lead assignment
- Synchronized checkpoints

### 4.5 Patrol Report
- Auto-generated reports
- Time analysis
- Issue documentation

## API Endpoints
Lihat detail lengkap di docs/IMPLEMENTATION-PHASES.md
```

---

### Phase 5: Incident Management System

```
Berdasarkan dokumentasi di:
- docs/IMPLEMENTATION-PHASES.md (Phase 5: Incident Management)
- docs/SRM-ARCHITECTURE.md (Section: 4. Incident Module)

Implementasikan sistem Incident Management:

## Database Migration
Buat tabel-tabel:
- incidents
- incident_parties
- incident_evidence
- incident_bap_records
- incident_lost_items
- incident_actions

## Sub-modules:

### 5.1 LK dan LP
- Form incident dengan parties involved
- Evidence attachment (photos, documents)
- Status workflow

### 5.2 BAP (Berita Acara Pemeriksaan)
- Q&A recording
- Digital signatures
- PDF generation

### 5.3 NO STPLK
- Lost item registration
- Certificate generation dengan QR code

### 5.4 Findings Report
- Risk level (Low/Medium/High/Critical)
- Assignment dan tracking
- Status workflow

### 5.5 Incident Recap
- Dashboard summary
- Charts dan statistics
- Trend analysis
```

---

### Phase 6-12 Summary Prompt

```
Berdasarkan dokumentasi di docs/IMPLEMENTATION-PHASES.md dan docs/SRM-ARCHITECTURE.md, implementasikan Phase [X]:

[PILIH PHASE YANG RELEVAN]

Phase 6: Compliance & Auditor
- Compliance checklists
- Audit scheduling
- Audit execution dengan scoring
- Compliance dashboard

Phase 7: Training Management
- Training plan & scheduling
- Participant enrollment
- Attendance tracking
- Certificate generation

Phase 8: KPI Dashboard & Analytics
- KPI Patrol metrics
- KPI Report metrics
- KPI CCTV monitoring
- KPI Training metrics

Phase 9: Master Data Management
- Worker Data
- Business Unit (hierarchy)
- Department
- Patrol/Guard Points (with map)
- Job Position
- Asset Management
- CCTV Zone

Phase 10: Administrator & Settings
- User Management enhancement
- Permission Matrix
- Incident User Access
- Translation (i18n)

Phase 11: Information Data
- Document Control dengan versioning
- CCTV Status monitoring
- Notification system enhancement

Phase 12: Final Polish
- UI/UX consistency
- Performance optimization
- Testing
- Documentation

Lihat detail lengkap di docs/IMPLEMENTATION-PHASES.md
```

---

## 🔧 Feature-Specific Prompts

### Database Migration Prompt

```
Berdasarkan schema di docs/IMPLEMENTATION-PHASES.md untuk [NAMA_MODULE]:

Buatkan database migration dengan:
1. Tabel-tabel yang diperlukan sesuai schema
2. Foreign key relationships
3. Indexes untuk query optimization
4. Default values dan constraints

Gunakan Alembic untuk migration.
Pastikan migration reversible (ada downgrade).
```

---

### Backend API Prompt

```
Berdasarkan docs/IMPLEMENTATION-PHASES.md dan docs/SRM-ARCHITECTURE.md:

Implementasikan backend API untuk [NAMA_MODULE] dengan:

1. **Models** (app/models/[module].py)
   - SQLAlchemy models sesuai schema
   - Relationships antar tabel

2. **Schemas** (app/schemas/[module].py)
   - Pydantic schemas untuk request/response
   - Create, Update, Response schemas
   - List dengan pagination

3. **Repository** (app/repositories/[module]_repository.py)
   - CRUD operations
   - Filter dan search
   - Pagination

4. **Service** (app/services/[module]_service.py)
   - Business logic
   - Validation
   - Status workflow

5. **Endpoints** (app/api/v1/endpoints/[module].py)
   - REST API endpoints
   - Authentication/Authorization
   - Error handling

Ikuti pattern yang sudah ada di codebase.
Pastikan semua endpoints terproteksi dengan authentication.
```

---

### Frontend Page Prompt

```
Berdasarkan docs/IMPLEMENTATION-PHASES.md dan docs/SRM-ARCHITECTURE.md:

Implementasikan frontend untuk [NAMA_MODULE] dengan:

1. **List Page** (src/pages/supervisor/[Module]/index.tsx)
   - Table dengan data dari API
   - Filters dan search
   - Pagination
   - Actions (view, edit, delete)

2. **Form Page** (src/pages/supervisor/[Module]/[Module]FormPage.tsx)
   - Form create/edit
   - Validation dengan Zod
   - Loading dan error states
   - Submit handling

3. **Detail Page** (src/pages/supervisor/[Module]/[Module]DetailPage.tsx)
   - Display semua data
   - Status badge
   - Actions berdasarkan status

4. **Components**
   - Table component
   - Filter component
   - Form component
   - Modal components

5. **Hooks**
   - useModule.ts (data fetching)
   - useModuleForm.ts (form handling)

6. **Service** (src/services/[module]Service.ts)
   - API calls
   - Type definitions

7. **Types** (src/types/[module].ts)
   - TypeScript interfaces

Gunakan:
- React Hook Form untuk forms
- Zod untuk validation
- Zustand untuk state management jika diperlukan
- Tailwind CSS untuk styling
- Konsisten dengan UI existing
```

---

### Form Implementation Prompt

```
Implementasikan form untuk [NAMA_FORM] dengan fields:

[LIST FIELDS DARI docs/IMPLEMENTATION-PHASES.md]

Requirements:
1. Validation rules sesuai business logic
2. Dynamic fields jika ada (e.g., activities list)
3. File upload untuk photos/documents
4. Date/time pickers
5. Select/multiselect dengan data dari API
6. Error messages yang jelas
7. Loading state saat submit
8. Success/error notification

Form states:
- Create mode
- Edit mode (pre-fill data)
- View mode (read-only)
```

---

### Table/List Implementation Prompt

```
Implementasikan table/list untuk [NAMA_MODULE] dengan:

Columns:
[LIST COLUMNS DARI docs/IMPLEMENTATION-PHASES.md]

Features:
1. Sortable columns
2. Filters:
   - Date range
   - Status
   - Site/Location
   - Search text
3. Pagination (10/25/50 per page)
4. Row actions (view, edit, delete, status change)
5. Bulk actions jika diperlukan
6. Export (CSV/Excel)
7. Empty state
8. Loading state
9. Error state
```

---

## 🛠️ Utility Prompts

### Code Review Prompt

```
Review code yang sudah diimplementasi untuk [NAMA_MODULE]:

Check:
1. Apakah sesuai dengan schema di docs/IMPLEMENTATION-PHASES.md?
2. Apakah semua API endpoints sudah dibuat?
3. Apakah frontend sudah lengkap (list, form, detail)?
4. Apakah validation sudah benar?
5. Apakah error handling sudah proper?
6. Apakah consistent dengan pattern di codebase?
7. Apakah acceptance criteria terpenuhi?

Berikan feedback dan saran improvement.
```

---

### Bug Fix Prompt

```
Ada bug di module [NAMA_MODULE]:

Error message: [ERROR MESSAGE]
Expected behavior: [EXPECTED]
Actual behavior: [ACTUAL]

Referensi:
- docs/IMPLEMENTATION-PHASES.md untuk expected behavior
- docs/SRM-ARCHITECTURE.md untuk arsitektur

Tolong:
1. Identifikasi root cause
2. Berikan fix yang tepat
3. Pastikan tidak break functionality lain
```

---

### Testing Prompt

```
Buatkan test untuk [NAMA_MODULE]:

1. **Unit Tests**
   - Model validation
   - Service logic
   - Utility functions

2. **Integration Tests**
   - API endpoint tests
   - Database operations

3. **Frontend Tests**
   - Component rendering
   - Form validation
   - User interactions

Test scenarios berdasarkan acceptance criteria di docs/IMPLEMENTATION-PHASES.md
```

---

### Documentation Prompt

```
Buatkan dokumentasi untuk [NAMA_MODULE]:

1. **API Documentation**
   - Endpoint descriptions
   - Request/Response examples
   - Error codes

2. **User Guide**
   - Cara menggunakan fitur
   - Screenshots/mockups
   - FAQ

3. **Developer Guide**
   - Code structure
   - How to extend
   - Configuration
```

---

## 📝 Quick Reference

### Saat Memulai Session Baru

```
Baca semua dokumentasi di folder docs/:
- docs/SRM-ARCHITECTURE.md
- docs/IMPLEMENTATION-PHASES.md
- docs/PHASE-SUMMARY.md
- docs/FEATURE-COMPARISON.md

Kemudian implementasikan [TASK SPESIFIK] sesuai dengan dokumentasi tersebut.
```

### Saat Implementasi Fitur Baru

```
Untuk implementasi [NAMA_FITUR]:

1. Lihat docs/IMPLEMENTATION-PHASES.md untuk:
   - Database schema
   - API endpoints
   - Files yang perlu dibuat
   - Acceptance criteria

2. Lihat docs/SRM-ARCHITECTURE.md untuk:
   - Detail fitur
   - Flow diagram
   - UI requirements

3. Implementasikan sesuai dokumentasi
```

### Saat Debug/Troubleshoot

```
Untuk module [NAMA_MODULE]:
- Expected behavior ada di docs/IMPLEMENTATION-PHASES.md
- Architecture reference ada di docs/SRM-ARCHITECTURE.md
- Feature comparison ada di docs/FEATURE-COMPARISON.md

Identifikasi gap antara implementasi current dengan dokumentasi.
```

---

## 🎯 Best Practices

1. **Selalu baca dokumentasi dulu** sebelum implementasi
2. **Implementasi per-phase** untuk tracking yang lebih baik
3. **Test setiap fitur** sebelum lanjut ke fitur berikutnya
4. **Maintain consistency** dengan existing code patterns
5. **Update dokumentasi** jika ada perubahan requirements
6. **Commit regularly** dengan message yang descriptive

---

**Document Version:** 1.0  
**Last Updated:** December 2024
