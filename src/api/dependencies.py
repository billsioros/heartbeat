from fastapi import Depends
from fastapi.requests import Request
import joblib
from api.bot import Bot
from api.repositories.heartbeat_repository import HeartBeatRepository
from api.resources.database import Database
from api.services.heartbeat_service import HeartBeatService
from api.settings import Settings


async def get_settings(request: Request):
    return request.app.state.settings


async def get_database(
    request: Request, settings: Settings = Depends(get_settings)
) -> Database:
    return Database(str(settings.database.uri))


async def get_heartbeat_repository(
    request: Request,
    database: Database = Depends(get_database),
) -> HeartBeatRepository:
    return HeartBeatRepository(database)


async def get_bot(request: Request, settings: Settings = Depends(get_settings)):
    model = joblib.load(settings.checkpoint_path)

    return Bot(model)


async def get_heartbeat_service(
    request: Request,
    heartbeat_repository: HeartBeatRepository = Depends(get_heartbeat_repository),
    bot: Bot = Depends(get_bot),
) -> HeartBeatService:
    return HeartBeatService(heartbeat_repository, bot)
