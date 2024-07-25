import subprocess
import webbrowser

import typer

from api.cli.commands.database import group as database
from api.resources.database import Database
from api.settings import Settings

cli: typer.Typer = typer.Typer()


@cli.callback(name="heartbeat")
def main(ctx: typer.Context):
    """NotOnMyWatch CLI."""
    settings = Settings()
    database = Database(str(settings.database.uri))

    ctx.obj = {"settings": settings, "database": database}


cli.add_typer(database, name="database")


@cli.command()
def serve(port: int = 8000, build: bool = False):
    """Serve the application on localhost."""
    cmd = ["docker-compose", "up", "--force-recreate", "-d"]
    if build:
        cmd = ["docker-compose", "up", "--force-recreate", "--build", "-d"]

        try:
            subprocess.run(cmd, check=False)
        except subprocess.CalledProcessError as e:
            raise typer.Exit(code=e.returncode)

    webbrowser.open(f"http://localhost:{port}")


if __name__ == "__main__":
    cli()
