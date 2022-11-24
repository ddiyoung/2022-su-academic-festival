from fastapi import Depends

from app.models.UserModel import User
from app.repositories.UserRepository import UserRepository


class UserService:
    UserRepository: UserRepository

    def __init__(self, userRepository: UserRepository = Depends()) -> None:
        self.userRepository = userRepository

    def get(self, user_id: int) -> User:
        return self.userRepository.get(User(u_id=user_id))
