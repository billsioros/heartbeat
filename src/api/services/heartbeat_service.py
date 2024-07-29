from collections.abc import Iterator

from api.bot import Bot
from api.core.service_result import ServiceResult
from api.models.heartbeat import HeartBeatModel
from api.repositories.heartbeat_repository import HeartBeatRepository
from api.schemas.heartbeat import HeartBeatCreateSchema
from api.services import Service


class HeartBeatService(Service):
    def __init__(
        self,
        heartbeat_repository: HeartBeatRepository,
        bot: Bot,
    ) -> None:
        self._heartbeat_repository: HeartBeatRepository = heartbeat_repository
        self._bot = bot

    def get_all(self) -> ServiceResult[Iterator[HeartBeatModel]]:
        return ServiceResult.ok(self._heartbeat_repository.get_all())

    def get_by_id(self, id: str) -> ServiceResult[HeartBeatModel]:
        try:
            return ServiceResult.ok(self._heartbeat_repository.get_by_id(id))
        except HeartBeatRepository.NotFoundException as exception:
            return ServiceResult.not_found(exception.message)

    def create(
        self, heartbeat_create: HeartBeatCreateSchema
    ) -> ServiceResult[HeartBeatModel]:
        try:
            heartbeat = HeartBeatModel(
                age=heartbeat_create.age,
                sex=heartbeat_create.sex,
                chest_pain_type=heartbeat_create.chest_pain_type,
                fasting_blood_sugar=heartbeat_create.fasting_blood_sugar,
                max_heart_rate=heartbeat_create.max_heart_rate,
                exercise_angina=heartbeat_create.exercise_angina,
                old_peak=heartbeat_create.old_peak,
                st_slope=heartbeat_create.st_slope,
                heart_disease=self._bot.predict(heartbeat_create),
            )

            heartbeat = self._heartbeat_repository.create(heartbeat)

            return ServiceResult.ok(heartbeat)
        except HeartBeatRepository.ConflictException as exception:
            return ServiceResult.conflict(exception.message)
