import uvicorn
from fastapi import APIRouter, FastAPI

from heartbeat.controllers.heartbeat_controller import api as heartbeat_controller
from heartbeat.controllers.monitor_controller import api as monitor_controller
from heartbeat.settings import Settings


def initialize_api() -> FastAPI:
    return FastAPI(
        title="HeartBeat",
        description="A heart failure detection system",
        version="1.0.0",
        contact={
            "name": "Vassilis Sioros",
            "email": "billsioros97@gmail.com",
        },
        docs_url="/",
    )


def register_configuration(app: FastAPI) -> FastAPI:
    app.state.settings = Settings()

    return app


def register_controllers(app: FastAPI, prefix: str = "") -> FastAPI:
    api = APIRouter(prefix=f"/api{prefix}")

    api.include_router(heartbeat_controller)
    api.include_router(monitor_controller)

    app.include_router(api)

    return app


def register_events(app: FastAPI) -> FastAPI:
    return app


def create_app() -> FastAPI:
    app = initialize_api()
    app = register_configuration(app)
    app = register_events(app)
    app = register_controllers(app)

    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
