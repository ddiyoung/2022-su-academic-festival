import redis
from app.configs.Environment import get_environment_variables

env = get_environment_variables()

My_Redis = redis.StrictRedis(host=env.REDIS_HOST, port=env.REDIS_PORT, db=0)

