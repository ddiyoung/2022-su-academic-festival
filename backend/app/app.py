from fastapi import FastAPI
from app.routers import User
from app.routers import Food


def create_app():
    app = FastAPI()

    app.include_router(User.UserRouter)
    app.include_router(Food.FoodRouter)
    return app
