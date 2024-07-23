from heartbeat.models.heartbeat import (
    ChestPainType,
    ExerciseAngina,
    RestingECG,
    Sex,
    ST_Slope,
)
from heartbeat.schemas import Schema


class HeartBeatSchema(Schema):
    class Config:
        from_attributes = True

    id: str
    age: int
    sex: Sex
    chest_pain_type: ChestPainType
    resting_bp: int
    cholesterol: int
    fasting_bs: bool
    resting_ecg: RestingECG
    max_hr: int
    exercise_angina: ExerciseAngina
    oldpeak: float
    st_slope: ST_Slope
    heart_disease: bool


class HeartBeatCreateSchema(Schema):
    class Config:
        from_attributes = True

    age: int
    sex: Sex
    chest_pain_type: ChestPainType
    resting_bp: int
    cholesterol: int
    fasting_bs: bool
    resting_ecg: RestingECG
    max_hr: int
    exercise_angina: ExerciseAngina
    oldpeak: float
    st_slope: ST_Slope
