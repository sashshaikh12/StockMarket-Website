from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyBFPrrH-qrwMchu-1Cw_Ezz1z4DywKUymc")
model = genai.GenerativeModel('gemini-1.5-pro-latest')

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chat history for each user session (use DB for real app)
chat_sessions = {}
class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    session_id = request.session_id

    if session_id not in chat_sessions:
        chat_sessions[session_id] = model.start_chat(history=[])

    response = chat_sessions[session_id].send_message(request.message)
    return {"reply": response.text}
