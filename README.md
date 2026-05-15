# GlobalTNA Service Request Board

A full-stack mini service request platform built for the Full-Stack Developer Intern Technical Assessment at GlobalTNA.

Users can:
- Create service requests
- Browse all requests
- Filter by category and status
- Update request status
- Delete requests

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Features

- Create new job requests
- View all jobs
- Filter by category
- Filter by status
- View job details
- Update job status
- Delete job requests
- Form validation
- REST API integration

---

# Project Structure

```txt
project/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── ...
```

---

# Environment Variables

## Backend `.env`

```env
MONGO_URI=mongodb+srv://virajithajayathilaka:virajithadilshan@cluster0.sz1ju3t.mongodb.net/crm_db?retryWrites=true&w=majority
PORT=5000
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# API Endpoints

## Get all jobs

```http
GET /api/jobs
```

## Get single job

```http
GET /api/jobs/:id
```

## Create job

```http
POST /api/jobs
```

## Update job status

```http
PATCH /api/jobs/:id
```

## Delete job

```http
DELETE /api/jobs/:id
```

---

# Deployment

## Frontend
Deployed using Vercel
```http
https://service-req-app.vercel.app/
````

## Backend
Deployed using Render

---

# Author

Virajitha Dilshan Jayathilaka

BSc(Hons) Applied Science in Computing  
University of Jaffna
