<h1 align="center">HeartBeat <span style='font-size:40px;'>&#128147;</span></h1>

<p align="center"><em>A heart failure detection system</em></p>

<p align="center">
  <a href="https://github.com/billsioros/heartbeat/actions/workflows/cd.yml">
    <img
      src="https://github.com/billsioros/heartbeat/actions/workflows/cd.yml/badge.svg"
      alt="CD"
    />
  </a>
  <a href="https://results.pre-commit.ci/latest/github/billsioros/heartbeat/master">
    <img
      src="https://results.pre-commit.ci/badge/github/billsioros/heartbeat/master.svg"
      alt="pre-commit.ci status"
    />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img
      src="https://img.shields.io/badge/license-MIT-green"
      alt="PyPI - License"
    />
  </a>
  <a href="https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/billsioros/heartbeat">
    <img
      src="https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode"
      alt="Open in GitHub Codespaces"
    />
  </a>
  <a href="https://github.com/billsioros/heartbeat">
    <img
      src="https://img.shields.io/badge/cookiecutter-template-D4AA00.svg?style=flat&logo=cookiecutter"
      alt="Cookiecutter Template">
  </a>
  <a href="https://app.renovatebot.com/dashboard#github/billsioros/heartbeat">
    <img
      src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat&logo=renovatebot"
      alt="Renovate - Enabled">
  </a>
  <a href="https://github.com/billsioros/heartbeat/actions/workflows/dependency_review.yml">
    <img
      src="https://github.com/billsioros/heartbeat/actions/workflows/dependency_review.yml/badge.svg"
      alt="Dependency Review"
    />
  </a>
</p>

## :rocket: Running the project

> [!IMPORTANT]
> The following instructions assume you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Clone the repository** and navigate to the project directory.

    ```shell
    git clone https://github.com/billsioros/heartbeat
    cd heartbeat
    ```

2. **Edit the `.env` file**.

    ```shell
    POSTGRES_DB='heartbeat'
    POSTGRES_USER='guest'
    POSTGRES_PASSWORD=')M8z*yss$cRxw7(&'

    BACKEND_DATABASE__URI = 'postgresql://guest:)M8z*yss$cRxw7(&@database:5432/heartbeat'
    ```

3. **Build and start the services** using Docker Compose.

    ```shell
    docker-compose up --build
    ```

> The frontend and the backend should be now available at [`http://localhost:80`](http://localhost:80) and [`http://localhost:8000`](http://localhost:8000), respectively.

### Troubleshooting

- To view the logs of a specific service, run:

    ```shell
    docker-compose logs <service_name>
    ```

- To stop the services, run:

    ```shell
    docker-compose down
    ```

- To remove the volumes along with stopping the services, run:

    ```shell
    docker compose down -v
    ```

### Running the services outside of Docker

> [!IMPORTANT]
> Ensure PostgreSQL is set up before running the project by using `docker compose up database --d`. Afterward, run `poe manage database create` to create the actual database. To tear down PostgreSQL, use `docker compose down database -v`.

Running the backend:

```shell
export BACKEND_DATABASE__URI='postgresql://guest:)M8z*yss$cRxw7(&@localhost:5432/heartbeat'
poetry env use 3.11
poetry install
python src/api/app.py
```

> [!NOTE]
> We use the [Poetry](https://python-poetry.org/) Python package manager. [Having installed Poetry](https://python-poetry.org/docs/#installing-with-the-official-installer) you may now create a brand new [virtual environment](https://docs.python.org/3/tutorial/venv.html) and install the project's dependencies.

Running the frontend:

```shell
cd src/web
nvm use 20
npm install
npm run dev -- --host --port 80
```

> [!NOTE]
> [nvm](https://github.com/nvm-sh/nvm) enables you to quickly install and switch between different versions of Node.js via the command line. Ensure you install nvm, then install Node.js 20 by running `nvm install 20`.

## :computer: Deploying to production

## Deploying to Production

Deploying to production involves several crucial steps, including setting up a server, configuring DNS, and managing SSL certificates. [`Traefik`](https://github.com/traefik/traefik) simplifies many of these tasks, acting as a powerful reverse proxy and load balancer. For a comprehensive guide on deploying your FastAPI application with Traefik, read the full article [here](https://github.com/tiangolo/blog-posts/blob/master/deploying-fastapi-apps-with-https-powered-by-traefik/README.md).

## :bookmark_tabs: Contributing

In order to locally set up the project first clone the repository:

```shell
git clone https://github.com/billsioros/heartbeat
```

Optionally, you can install [pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#installation) to easily install Python 3.11:

```bash
pyenv install 3.11.4
pyenv local 3.11.4
```

### Installing pre-commit hooks

Git hooks are scripts that run automatically to perform tasks like linting and formatting code at different stages of the development process. [pre-commit](https://pre-commit.com/) is a tool designed to manage and share these hooks across projects easily. Having created a virtual environment and installed the required dependencies, you may run `pre-commit install --install-hooks` to install the [git hook scripts](https://github.com/billsioros/heartbeat/blob/master/.pre-commit-config.yaml).


### Performing development operations via `poethepoet`

We are using [poethepoet](https://github.com/nat-n/poethepoet), to perform various development oriented tasks. Formatting, type-checking, as well as a few other operations, can be performed by running `poe <task>`. Please run `poe --help` (or `poetry run poe --help`), to list all available operations.

### Writing your commit message

The project's version number and [Changelog](https://github.com/billsioros/heartbeat/blob/master/CHANGELOG.md), depend on a consistent commit history. As a result, your commit message's format is extremely important. Before opening a pull request, please make sure that your commits strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

## :label: Credits

This project was generated with [`billsioros/heartbeat`](https://github.com/billsioros/heartbeat) cookiecutter template.
