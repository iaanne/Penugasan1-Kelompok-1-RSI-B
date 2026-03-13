from fastapi import FASTAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ini adalah fastapi"}
