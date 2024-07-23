from collections.abc import Iterable, Iterator
from contextlib import contextmanager
from typing import Any

from sqlalchemy import create_engine, inspect, orm, sql
from sqlalchemy.orm import Session

from heartbeat.models._model import Model


class Database:
    def __init__(self, uri: str) -> None:
        self._engine = create_engine(uri)
        self._session_factory = orm.scoped_session(
            orm.sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=self._engine,
            ),
        )

    def create_database(self) -> None:
        Model.metadata.create_all(self._engine)

    def drop_all_tables(self) -> Iterable[Exception]:
        for tbl in reversed(Model.metadata.sorted_tables):
            with self.session_factory() as session:
                try:
                    session.execute(tbl.delete())
                    session.commit()
                    tbl.drop(bind=self._engine)
                except Exception as e:
                    yield e
                    continue

    def list_all_tables(self) -> Iterable[tuple[Any, list[Any]]]:
        with self.session_factory() as session:
            inspector = inspect(self._engine)
            tables = [
                table_name
                for table_name in inspector.get_table_names()
                if table_name != "alembic_version"
            ]

            for table_name in tables:
                model_class = None
                for c in Model.registry._class_registry.values():
                    if hasattr(c, "__tablename__") and c.__tablename__ == table_name:
                        model_class = c
                        break

                if model_class:
                    entries = session.query(model_class).all()
                    yield model_class, entries

    @contextmanager
    def session_factory(self) -> Iterator[Session]:
        session: Session = self._session_factory()
        try:
            yield session
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    def health_check(self) -> str | None:
        try:
            with self.session_factory() as session:
                session.execute(sql.text("SELECT 1"))
        except Exception as e:
            return str(e)
