from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from newspaper import Article
from sentence_transformers import SentenceTransformer, util
import torch

app = FastAPI()

# --- THE FIX: Allow React to talk to Python ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------

model = SentenceTransformer('all-MiniLM-L6-v2')

@app.get("/")
def home():
    return {"message": "AI News Bias Engine is running!"}

@app.get("/compare")
def compare_news(url1: str, url2: str):
    try:
        a1 = Article(url1); a1.download(); a1.parse()
        v1 = model.encode(a1.text, convert_to_tensor=True)

        a2 = Article(url2); a2.download(); a2.parse()
        v2 = model.encode(a2.text, convert_to_tensor=True)

        score = util.cos_sim(v1, v2).item()

        return {
            "similarity_score": round(score, 4),
            "is_same_story": score > 0.8,
            "title1": a1.title,
            "title2": a2.title
        }
    except Exception as e:
        return {"error": str(e)}