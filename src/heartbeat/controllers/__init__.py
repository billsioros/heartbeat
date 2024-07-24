from collections.abc import Sequence
from http import HTTPStatus
from pathlib import Path
from typing import TypeVar

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends

from heartbeat.core.error import Error, ErrorEnum

T = TypeVar("T", bound="Controller")


class Controller(APIRouter):
    _ERROR_TO_HTTP_CODE = {
        ErrorEnum.INVALID: HTTPStatus.BAD_REQUEST,
        ErrorEnum.CONFLICT: HTTPStatus.CONFLICT,
        ErrorEnum.UNAUTHORIZED: HTTPStatus.UNAUTHORIZED,
        ErrorEnum.NOT_FOUND: HTTPStatus.NOT_FOUND,
        ErrorEnum.INTERNAL: HTTPStatus.INTERNAL_SERVER_ERROR,
    }

    def abort(self: T, error: Error) -> None:
        raise HTTPException(
            status_code=self._ERROR_TO_HTTP_CODE[error.error_type],
            detail=error.message,
        )


def create_controller(
    filename: str,
    mount: str | None = None,
    post_fix: str | None = "s",
    tags: list[str] | None = None,
    dependencies: Sequence[Depends] | None = None,
) -> Controller:
    if post_fix is None:
        post_fix = ""

    stem = Path(filename).stem.replace("_controller", post_fix)

    if tags is None:
        tags = [stem.title()]

    prefix = stem
    if mount is not None:
        prefix = mount

    return Controller(prefix=f"/{prefix}", tags=tags, dependencies=dependencies)
