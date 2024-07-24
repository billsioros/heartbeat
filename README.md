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
  <a href="https://github.com/billsioros/cookiecutter-pypackage">
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

## :cd: Running the project

```bash
docker compose up
```

In order to locally set up the project please follow the instructions below:

```shell
# Set up the GitHub repository
git clone https://github.com/billsioros/heartbeat

# Create a virtual environment using poetry and install the required dependencies
poetry shell
poetry install

# Install pre-commit hooks
pre-commit install --install-hooks
```

## :label: Credits

This project was generated with [`billsioros/cookiecutter-pypackage`](https://github.com/billsioros/cookiecutter-pypackage) cookiecutter template.
