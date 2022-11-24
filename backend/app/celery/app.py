from celery import Celery
from app.configs.Environment import get_environment_variables

env = get_environment_variables()

BROKER_URI = env.BROKER_URI
BACKEND_URI = env.BACKEND_URI

app = Celery(
    'celery_app',
    broker=BROKER_URI,
    backend=BACKEND_URI,
    include=['app.celery.tasks']
)
