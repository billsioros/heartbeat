from pydantic import BaseModel, Field

from api.models.heartbeat import (
    ChestPain,
    Sex,
    StSlope,
)


class HeartBeatCreateSchema(BaseModel):
    class Config:
        from_attributes = True

    age: int = Field(..., ge=0, le=130, description="Age of the patient [years]")
    sex: Sex
    chest_pain_type: ChestPain
    fasting_blood_sugar: bool = Field(
        ...,
        description="Fasting blood sugar [1: if FastingBS > 120 mg/dl, 0: otherwise]",
    )
    max_heart_rate: int = Field(
        ...,
        ge=60,
        le=300,
        description="Maximum heart rate achieved [Numeric value between 60 and 202]",
    )
    exercise_angina: bool
    old_peak: float = Field(
        ...,
        ge=-10,
        le=10,
        description="Oldpeak = ST [Numeric value measured in depression]",
    )
    st_slope: StSlope


class HeartBeatSchema(HeartBeatCreateSchema):
    id: str
    heart_disease: bool
