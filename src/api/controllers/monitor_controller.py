from fastapi import Depends, status

from api.controllers import Controller, create_controller
from api.core.error import Error, ErrorEnum
from api.dependencies import get_database
from api.resources.database import Database

api: Controller = create_controller(__file__, post_fix=None, tags=["Monitoring"])


@api.get("/", status_code=status.HTTP_204_NO_CONTENT)
async def database_health_check(
    database: Database = Depends(get_database),
):
    result = database.health_check()

    if result is not None:
        api.abort(Error(error_type=ErrorEnum.INTERNAL, message=result))
