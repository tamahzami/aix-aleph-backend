from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext

app = FastAPI()

# Passwort-Hashing-Kontext mit bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Datenmodell für Login-Daten
class UserLogin(BaseModel):
    username: str
    password: str

# Beispiel-In-Memory-Datenbank mit gehashtem Passwort
registered_users = {
    "user1": {
        "hashed_password": pwd_context.hash("Secret123"),
        "email": "user1@example.com"
    }
}

# Funktion zur Überprüfung des Passworts
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Login-Endpunkt
@app.post("/login")
async def login(user: UserLogin):
    stored_user = registered_users.get(user.username)
    if not stored_user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    if not verify_password(user.password, stored_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Falsches Passwort")
    # Optional: JWT-Token generieren und zurückgeben (hier nur als Platzhalter)
    return {
        "message": f"Willkommen zurück, {user.username}!",
        "token": "fake-jwt-token"
    }