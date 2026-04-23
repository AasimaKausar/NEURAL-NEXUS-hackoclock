#  Echo-Breaker
**Personalized News Digest with Bias Exposure** *Built for Neural Nexus at Hack0Clock 2026*

## The Problem
Algorithms prioritize engagement over truth, creating "Filter Bubbles" where users only see news that confirms their existing beliefs. This leads to extreme social polarization and a loss of shared reality.

## Our Solution
Echo-Breaker is a semantic search engine and personalized news digest. It tracks a user's reading habits and intentionally exposes them to opposing biases. Using AI, it finds two articles with high factual similarity but opposing political framing, displaying them side-by-side in a "Perspective Bridge."

## Tech Stack
* **Frontend:** React 19, Tailwind CSS, Lucide-React
* **Backend:** Python, FastAPI, Uvicorn
* **AI & NLP:** Sentence-Transformers (`all-MiniLM-L6-v2`), NLTK
* **Live Scraping:** GNews, Newspaper3k

---

##  How to Run Locally (Run Instructions)

To run this project on your local machine, you will need **Node.js** and **Python 3.9+** installed. You will need to open two separate terminal windows: one for the backend, and one for the frontend.

### Step 1: Clone the Repository
```bash
git clone [https://github.com/AasimaKausar/NEURAL-NEXUS-hackoclock.git](https://github.com/AasimaKausar/NEURAL-NEXUS-hackoclock.git)
cd NEURAL-NEXUS-hackoclock
Step 2: Start the AI Backend (Terminal 1)
The backend handles the live news scraping and semantic vector math.

Bash

cd backend

# Create and activate a virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Install the required Python libraries
pip install -r requirements.txt

# Download required NLP data
python -c "import nltk; nltk.download('punkt_tab'); nltk.download('stopwords')"

# Start the FastAPI server
python -m uvicorn main:app --reload
The backend will now be running at http://127.0.0.1:8000

Step 3: Start the Frontend UI (Terminal 2)
The frontend is the React application containing the dynamic dashboard.

Bash

cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
The frontend will provide a local host link (usually http://localhost:5173). Click it to view the app!
