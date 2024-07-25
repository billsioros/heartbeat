from collections.abc import Iterable
from typing import Any

from rich.console import Console
from rich.table import Table

console: Console = Console()
error_console = Console(stderr=True, style="bold red")


def show_table(title: str, rows: Iterable[Any]) -> None:
    table = Table(title)
    for row in rows:
        table.add_row(repr(row))
    console.print(table)


def show_error(error: str):
    error_console.print(error)
