from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from app.configs.Environment import get_environment_variables

# Runtime Environment Configuration
env = get_environment_variables()

# Generate Database URL
DATABASE_URL = f"{env.DATABASE_DIALECT}://{env.DATABASE_USERNAME}:{env.DATABASE_PASSWORD}@{env.DATABASE_HOSTNAME}:{env.DATABASE_PORT}/{env.DATABASE_NAME}"

# Create Database Engine
Engine = create_engine(
    DATABASE_URL, echo=env.DEBUG_MODE, future=True, pool_size=10, max_overflow=20
)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=True, bind=Engine
)


def get_db_connection():
    db = scoped_session(SessionLocal)
    try:
        yield db
    finally:
        db.close()
