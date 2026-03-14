from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend is working"}

@app.get("/items")
def get_items():
    return {"items": ["apple", "banana"]}

@app.post("/items")
def create_item(name: str):
    return {"message": f"{name} created"}

@app.put("/items/{item_id}")
def update_item(item_id: int, name: str):
    return {"message": f"Item {item_id} updated"}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"message": f"Item {item_id} deleted"}
