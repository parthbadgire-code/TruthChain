from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import verify, passport

app = FastAPI(
    title="TruthChain API",
    description="AI + Web3 Fake News Defense Network",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verify.router, tags=["Verification"])
app.include_router(passport.router, tags=["Passport"])


@app.get("/")
async def root():
    return {"message": "TruthChain API is running 🔗", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}
