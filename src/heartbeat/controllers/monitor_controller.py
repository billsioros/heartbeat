from fastapi import Depends, status

from heartbeat.controllers import Controller, create_controller
from heartbeat.core.error import Error, ErrorEnum
from heartbeat.dependencies import get_database
from heartbeat.resources.database import Database

api: Controller = create_controller(__file__, post_fix=None, tags=["Monitoring"])


@api.get("/database", status_code=status.HTTP_204_NO_CONTENT)
async def database_health_check(
    database: Database = Depends(get_database),
):
    result = database.health_check()

    if result is not None:
        api.abort(Error(error_type=ErrorEnum.INTERNAL, message=result))
