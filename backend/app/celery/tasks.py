from celery import Task
from app.celery.app import app

class PredictTask(Task):

    abstract = True

    def __init__(self):
        super().__init__()
        self.model = None

    def __call__(self, *args, **kwargs):
        """
        Load model on first call (i.e. first task processed)
        Avoids the need to load model on each task request
        """

@app.task(
    ignore_result=False,
    bind=True,
    base=PredictTask,
    path=('app.ml.load.LogisticModel1', 'LogisticModel')
)
def predict_logistic_single(self, data):
    pred_array = self.model.predict([data])
