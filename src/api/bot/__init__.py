from api.schemas.heartbeat import HeartBeatCreateSchema
from sklearn.pipeline import Pipeline
import pandas as pd


class Bot(object):
    def __init__(self, model: Pipeline) -> None:
        self._model = model

    def predict(self, heartbeat: HeartBeatCreateSchema) -> bool:
        payload = {
            "Age": heartbeat.age,
            "Sex": heartbeat.sex,
            "ChestPain": heartbeat.chest_pain_type,
            "FastingBS": heartbeat.fasting_blood_sugar,
            "MaxHR": heartbeat.max_heart_rate,
            "ExerciseAngina": heartbeat.exercise_angina,
            "Oldpeak": heartbeat.old_peak,
            "ST_Slope": heartbeat.st_slope,
        }

        return self._model.predict(pd.DataFrame([payload]))[0]
