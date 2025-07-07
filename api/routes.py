from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

fake_users = {}

class User(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: User):
    if user.email in fake_users:
        raise HTTPException(status_code=400, detail="Benutzer existiert bereits.")
    fake_users[user.email] = user.password
    return {"message": "Registrierung erfolgreich"}