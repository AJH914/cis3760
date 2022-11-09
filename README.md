# CIS3760 - Group 203

test

# **You can access our production server at https://35.237.83.181**

## Overview

Our scheduler app allows the user to create a class schedule using data sourced from UofG's WebAdvisor. It is a work-in-progress.

## Tech

**Frontend**

- React
- Bootstrap
- Axios
- Hosted behind NGINX

**Backend**

- Flask (used as REST API)
- Hosted behind Gunicorn

## Running locally

In order to run the stack locally, you must have Docker and docker-compose installed and configured.

If you are on a modern flavor of Linux, you can run the `install.sh` script in the project base. This will install and configure Docker + docker-compose.

**To bring up the project, run:**

```
docker-compose up
```

This will build the `app` and `api` containers, and run them in the foreground (you can append the `-d` flag to run in daemon mode)

You can access the frontend at https://localhost. The Flask API can be reached at https://localhost/api.

**To bring down the project, run:**

```
docker-compose down
```

If the stack is running in the foreground, Ctrl+C will work as well.

**To rebuild the project, run:**

```
docker-compose build
```

## Production Environment

<img src="docs/infra_cropped.png" alt="infrastructure diagram" width="600" style="display: block; margin: auto;" />

Our app is externally hosted using Google Cloud Platform's Kubernetes Engine. We also utilize GitLab Runners to build and package our images, and move them to Container Registry for storage. From there, the deployment is triggered by a GitLab pipeline task and the Kube master node automatically revises the cluster.

You can access our production server at https://35.237.83.181
