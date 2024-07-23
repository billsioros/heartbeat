FROM python:3.11-slim-buster as python-base

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl

FROM python-base as poetry-base

ENV PYTHONFAULTHANDLER=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME=/opt/poetry \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=0 \
    POETRY_VERSION=1.2.2

ENV POETRY_CACHE_DIR=${POETRY_HOME}/.cache \
    PATH=${POETRY_HOME}/bin:${PATH}

RUN curl -sSL https://install.python-poetry.org | python3 -

RUN mkdir -p ${POETRY_CACHE_DIR}/virtualenvs

FROM poetry-base as build-base

ENV USER=app \
    GROUP=app

ENV HOME=/home/${USER}
ENV WORKSPACE=${HOME}/app/

COPY --from=poetry-base ${POETRY_HOME} ${POETRY_HOME}

RUN mkdir -p ${WORKSPACE}

WORKDIR ${WORKSPACE}

COPY pyproject.toml poetry.lock ${WORKSPACE}

RUN poetry install --no-dev --no-root

FROM build-base as build

ENV PORT=8000

COPY --from=build-base ${WORKSPACE} ${WORKSPACE}

COPY src ${WORKSPACE}

EXPOSE ${PORT}

RUN adduser ${USER} && \
    chown -R ${USER}:${GROUP} ${HOME}

USER ${USER}

CMD poetry run gunicorn \
    --bind 0.0.0.0:${PORT} \
    --access-logfile - \
    --graceful-timeout 10 \
    --keep-alive 10 \
    --log-file - \
    --timeout 30 \
    --worker-tmp-dir /dev/shm \
    --worker-class uvicorn.workers.UvicornWorker \
    notonmywatch.app:app
