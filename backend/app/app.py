from fastapi import FastAPI
from app.routers import User


def create_app():
    app = FastAPI()

    app.include_router(User.UserRouter)

    return app
