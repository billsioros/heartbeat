from enum import IntEnum, auto

from sqlalchemy import Boolean, Column, Enum, Float, Integer
from sqlalchemy.orm import Mapped

from api.models._model import PkModel


class Sex(IntEnum):
    MALE = auto()
    FEMALE = auto()


class ChestPain(IntEnum):
    TYPICAL_ANGINA = auto()
    ATYPICAL_ANGINA = auto()
    NON_ANGINAL_PAIN = auto()
    ASYMPTOMATIC = auto()


class StSlope(IntEnum):
    UP = auto()
    FLAT = auto()
    DOWN = auto()


class HeartBeatModel(PkModel):
    __tablename__ = "heartbeats"

    age: Mapped[int] = Column(Integer, nullable=False)
    sex: Mapped[Sex] = Column(Enum(Sex), nullable=False)
    chest_pain_type: Mapped[ChestPain] = Column(Enum(ChestPain), nullable=False)
    fasting_blood_sugar: Mapped[bool] = Column(Boolean, nullable=False)
    max_heart_rate: Mapped[int] = Column(Integer, nullable=False)
    exercise_angina: Mapped[bool] = Column(Boolean, nullable=False)
    old_peak: Mapped[float] = Column(Float, nullable=False)
    st_slope: Mapped[StSlope] = Column(Enum(StSlope), nullable=False)
    heart_disease: Mapped[bool] = Column(Boolean, nullable=False)

    def __repr__(self) -> str:
        return f"<HeartBeatModel(id={self.id}, heart_disease={self.heart_disease})>"
