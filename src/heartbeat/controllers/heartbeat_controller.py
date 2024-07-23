from fastapi import Depends, status

from heartbeat.controllers import Controller, create_controller
from heartbeat.dependencies import get_heartbeat_service
from heartbeat.schemas.heartbeat import HeartBeatCreateSchema, HeartBeatSchema
from heartbeat.services.heartbeat_service import HeartBeatService

api: Controller = create_controller(__file__)


@api.get(
    "/",
    response_model=list[HeartBeatSchema],
)
async def get_all(
    heartbeat_service: HeartBeatService = Depends(get_heartbeat_service),
):
    heartbeat_result = heartbeat_service.get_all()

    if not heartbeat_result:
        api.abort(heartbeat_result.error)

    return heartbeat_result.payload


@api.get("/{id}", response_model=HeartBeatSchema)
async def get_by_id(
    id: str,
    heartbeat_service: HeartBeatService = Depends(get_heartbeat_service),
):
    heartbeat_result = heartbeat_service.get_by_id(id)

    if not heartbeat_result:
        api.abort(heartbeat_result.error)

    return heartbeat_result.payload


@api.post(
    "/",
    response_model=HeartBeatSchema,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    heartbeat_create: HeartBeatCreateSchema,
    heartbeat_service: HeartBeatService = Depends(get_heartbeat_service),
):
    heartbeat_result = heartbeat_service.create(heartbeat_create)

    if not heartbeat_result:
        api.abort(heartbeat_result.error)

    return heartbeat_result.payload
