from collections.abc import Iterator
from typing import Any

from sqlalchemy import exc

from api.models.heartbeat import HeartBeatModel
from api.repositories import Repository
from api.resources.database import Database


class HeartBeatRepository(Repository):
    class NotFoundException(Repository.NotFoundException):
        def __init__(self, **kwargs: dict[str, Any]) -> None:
            super().__init__(HeartBeatModel, **kwargs)

    class ConflictException(Repository.ConflictException):
        def __init__(self, **kwargs: dict[str, Any]) -> None:
            super().__init__(HeartBeatModel, **kwargs)

    def __init__(self, database: Database) -> None:
        self.session_factory = database.session_factory

    def get_all(self) -> Iterator[HeartBeatModel]:
        with self.session_factory() as session:
            return session.query(HeartBeatModel).all()

    def get_by_id(self, id: str) -> HeartBeatModel:
        with self.session_factory() as session:
            heartbeat = (
                session.query(HeartBeatModel)
                .filter(HeartBeatModel.id == id)
                .one_or_none()
            )
            if not heartbeat:
                raise HeartBeatRepository.NotFoundException(id=id)

            return heartbeat

    def create(
        self,
        heartbeat: HeartBeatModel,
    ) -> HeartBeatModel:
        try:
            with self.session_factory() as session:
                session.add(heartbeat)
                session.commit()
                session.refresh(heartbeat)

                return heartbeat
        except exc.IntegrityError as exception:
            raise HeartBeatRepository.ConflictException(
                id=heartbeat.id,
            ) from exception
