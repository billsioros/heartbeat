from typing import TYPE_CHECKING

import typer

from heartbeat.cli.utils.gui import show_error, show_table

if TYPE_CHECKING:
    from heartbeat.resources.database import Database

group: typer.Typer = typer.Typer()


@group.callback()
def db():
    """Database related commands."""


@group.command()
def create(ctx: typer.Context):
    """Create the database."""
    db: Database = ctx.obj["database"]

    db.create_database()


@group.command()
def show(ctx: typer.Context):
    """List all the tables."""
    db: Database = ctx.obj["database"]

    for model_class, entries in db.list_all_tables():
        show_table(model_class.__name__, entries)


@group.command()
def drop(ctx: typer.Context):
    """Drop all the tables."""
    db: Database = ctx.obj["database"]

    answer = typer.prompt(f"Drop all tables in '{db._engine.url}' (yes/no) ?")

    if answer.lower() == "yes":
        for error in db.drop_all_tables():
            show_error(error)
