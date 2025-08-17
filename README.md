# 🧠 Brain Tumor Detection

A **full-stack web application** for **Brain Tumor MRI Classification** using **Transfer Learning (ResNet18)** and **Custom CNN models**.  
This project provides an **end-to-end solution** for uploading MRI scans, running **AI-powered tumor detection**, and viewing predictions with **confidence scores**.

---

## 🚀 Features

- 📤 Upload brain MRI images (**JPEG, PNG, TIFF**)
- 🤖 Deep learning–based tumor detection
- 🔄 Supports **Transfer Learning (ResNet18)** & **Custom CNN**
- ⚡ Backend powered by **FastAPI**
- 🌐 Frontend built with **Next.js**
- 🔌 REST API for easy integration

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TailwindCSS  
- **Backend:** FastAPI, Uvicorn  
- **AI Model:** PyTorch (ResNet18 + Custom CNN)  
- **Deployment:** Vercel (frontend) & Render/Railway/AWS (backend)  

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Python **3.10+**  
- Node.js **18+**  
- npm or yarn  
- [pip](https://pip.pypa.io/en/stable/)  

---

### 🔧 Backend Setup

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Run backend server

cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

```
---

### 🔧 Backend Setup

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Install dependencies
cd frontend
npm install

# Run the app
npm run dev

```
---


### 📂 Project Structure

```bash
backend/
  main.py
  model/
    loader.py
    predictor.py
    brain_tumor_model.pth
  utils/
    image.py

frontend/
  app/
    detect/
      page.tsx
  components/
    ui/
      skeleton.jsx
```
---


## 📡 API Usage

### 🔹 Endpoint  
**POST** `/detect`

### 🔹 Request Body  
- **Content-Type:** `multipart/form-data`  
- **Field:** `file` → MRI image (`.jpg`, `.png`, `.tiff`)  

### 🔹 Example Response  
```json
{
  "predicted_class": "Tumor Detected",
  "confidence_score": 0.92
}

