# Fake Website Detection Web Application

## 📌 Project Overview
The **Fake Website Detection Web Application** is a full-stack cybersecurity tool designed to identify phishing and fraudulent websites in real-time. It utilizes a **hybrid AI + ML approach**, combining structural analysis of URLs with semantic analysis of textual content to provide a comprehensive risk assessment.

The application features a modern, responsive **React** frontend for user interaction and a robust **Flask** backend that orchestrates the detection pipeline.

## ✨ Key Features
*   **Hybrid Detection Engine**: Fuses **Machine Learning** (structural analysis) and **Deep Learning** (semantic analysis) for high accuracy.
*   **Real-Time Analysis**: Provides instant feedback on URL safety with confidence scores.
*   **Risk Level Classification**: clear categorization of websites as **Safe**, **Suspicious**, or **Fake/Phishing**.
*   **Detailed Breakdown**: Displays individual scores from the ML and AI modules for explainability.
*   **Modern UI**: A dark-themed, sleek interface built with React and Vite.

## 🚀 Advantages
*   **Higher Accuracy**: By combining two distinct detection methods, the system reduces false positives compared to single-method approaches.
*   **Explainable AI**: Users can see *why* a site was flagged (e.g., suspicious IP usage vs. urgent request language).
*   **Scalable Architecture**: The decision logic is decoupled, allowing for easy updates to individual models without breaking the system.
*   **Offline Capable (ML)**: The structural analysis module runs locally without needing external APIs.

## 🛠️ Tech Stack

### Frontend
*   **React (Vite)**: For a fast, interactive user interface.
*   **CSS3**: Custom modern styling with responsive design.
*   **Axios**: For handling API requests to the backend.

### Backend
*   **Python Flask**: Lightweight web server for the REST API.
*   **Flask-CORS**: Handles Cross-Origin Resource Sharing.
*   **NumPy**: Efficient numerical operations for score calculation.

### AI & Machine Learning
*   **Scikit-Learn**: Powering the structural analysis module.
*   **Hugging Face Transformers**: Powering the semantic analysis module.
*   **PyTorch**: Deep learning backend for the Transformer model.

## 🤖 AI & ML Models Used

### 1. URL Feature Analysis Module (Machine Learning)
*   **Algorithm**: **Random Forest Classifier**
*   **Purpose**: Analyzes the structure of the URL string itself.
*   **Features Extracted**:
    *   URL Length
    *   Number of Dots and Subdomains
    *   Presence of IP Addresses
    *   HTTPS Usage
    *   Suspicious Characters (`@`, `-`)
*   **Why Random Forest?**: It handles non-linear relationships well and is robust against overfitting on tabular feature data.

### 2. Textual Analysis Module (AI / Deep Learning)
*   **Model**: **DistilBERT (distilbert-base-uncased)**
*   **Purpose**: Analyzes the semantic content and "intent" of the website context.
*   **Method**: Used as a Zero-Shot or Fine-tuned Text Classifier to detect phishing language patterns (urgency, threats, deception).
*   **Why DistilBERT?**: It offers a great balance between performance (speed) and accuracy, retaining 97% of BERT's performance while being 40% smaller and 60% faster—ideal for real-time web applications.

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js & npm
*   Python 3.8+

### Backend Setup
1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the Flask server:
    ```bash
    python app.py
    ```
    *(Note: The first run will download the DistilBERT model)*

### Frontend Setup
1.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🔮 Future Improvements
*   **Browser Extension**: Integrate the API directly into a Chrome/Firefox extension.
*   **Web Scraping**: Automatically fetch and analyze the full HTML content of the target URL.
*   **User Feedback Loop**: Allow users to report false positives/negatives to retrain the models.
