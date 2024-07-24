from fastapi import Depends
from fastapi.requests import Request

from heartbeat.bot import Bot
from heartbeat.repositories.heartbeat_repository import HeartBeatRepository
from heartbeat.resources.database import Database
from heartbeat.services.heartbeat_service import HeartBeatService
from heartbeat.settings import Settings


async def get_settings(request: Request):
    return request.app.state.settings


async def get_database(request: Request, settings: Settings = Depends(get_settings)) -> Database:
    return Database(str(settings.database.uri))


async def get_heartbeat_repository(
    request: Request,
    database: Database = Depends(get_database),
) -> HeartBeatRepository:
    return HeartBeatRepository(database)


async def get_bot(request: Request):
    return Bot()


async def get_heartbeat_service(
    request: Request,
    heartbeat_repository: HeartBeatRepository = Depends(get_heartbeat_repository),
    bot: Bot = Depends(get_bot),
) -> HeartBeatService:
    return HeartBeatService(heartbeat_repository, bot)
