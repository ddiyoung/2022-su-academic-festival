from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from app.configs.Database import (
    get_db_connection
)
from app.models.UserModel import User


class UserRepository:
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        self.db = db

    def get(self, user: User) -> User:
        return self.db.get(
            User,
            user.u_id,
        )
