from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import Food


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    app.include_router(Food.FoodRouter)

    return app
