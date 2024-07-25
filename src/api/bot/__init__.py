from api.schemas.heartbeat import HeartBeatCreateSchema


class Bot:
    def predict(self, heartbeat: HeartBeatCreateSchema) -> bool:
        return True
