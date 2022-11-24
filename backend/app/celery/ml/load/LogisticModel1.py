from joblib import load
from app.configs.Environment import get_environment_variables
import pandas as pd

env = get_environment_variables()

MODEL_PATH = env.MODEL_PATH


class LogisticModel:

    def __init__(self):
        self.model = self._load_model_from_path(MODEL_PATH)

    @staticmethod
    def _load_model_from_path(path):
        model = load(path)
        return model

    def predict(self, data):
        df = pd.DataFrame(data)

