import typer

from api.cli.commands.database import group as database
from api.resources.database import Database
from api.settings import Settings

cli: typer.Typer = typer.Typer()


@cli.callback(name="heartbeat")
def main(ctx: typer.Context):
    """HeartBeat CLI."""
    settings = Settings()
    database = Database(str(settings.database.uri))

    ctx.obj = {"settings": settings, "database": database}


cli.add_typer(database, name="database")


if __name__ == "__main__":
    cli()
