from enum import Enum as _Enum

from sqlalchemy import Boolean, Column, Enum, Float, Integer
from sqlalchemy.orm import Mapped

from heartbeat.models._model import PkModel


class Sex(_Enum):
    M = "M"
    F = "F"


class ChestPainType(_Enum):
    TA = "TA"
    ATA = "ATA"
    NAP = "NAP"
    ASY = "ASY"


class RestingECG(_Enum):
    Normal = "Normal"
    ST = "ST"
    LVH = "LVH"


class ExerciseAngina(_Enum):
    Y = "Y"
    N = "N"


class ST_Slope(_Enum):
    Up = "Up"
    Flat = "Flat"
    Down = "Down"


class HeartBeatModel(PkModel):
    __tablename__ = "heartbeats"

    age: Mapped[int] = Column(Integer, nullable=False)
    sex: Mapped[Sex] = Column(Enum(Sex), nullable=False)
    chest_pain_type: Mapped[ChestPainType] = Column(Enum(ChestPainType), nullable=False)
    resting_bp: Mapped[int] = Column(Integer, nullable=False)
    cholesterol: Mapped[int] = Column(Integer, nullable=False)
    fasting_bs: Mapped[bool] = Column(Boolean, nullable=False)
    resting_ecg: Mapped[RestingECG] = Column(Enum(RestingECG), nullable=False)
    max_hr: Mapped[int] = Column(Integer, nullable=False)
    exercise_angina: Mapped[ExerciseAngina] = Column(Enum(ExerciseAngina), nullable=False)
    oldpeak: Mapped[float] = Column(Float, nullable=False)
    st_slope: Mapped[ST_Slope] = Column(Enum(ST_Slope), nullable=False)
    heart_disease: Mapped[bool] = Column(Boolean, nullable=False)
