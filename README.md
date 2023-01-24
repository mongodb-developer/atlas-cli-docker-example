# MongoDB Atlas CLI with Docker Example

An example project demonstrating how to create a MongoDB Atlas cluster, database, and collection with proper network rules and access rules using Docker and the Atlas CLI.

## Instructions

**NOTE: This project was intended to be used in a local development environment. Using this project for production will introduce potential risks and should ultimately be avoided.**

To sample this project, perform the following steps:

1. Clone the repository to your local computer.
2. Rename the **docker-compose.yml.example** file to **docker-compose.yml** for use with Docker Compose.
3. Populate the environment variables in the **docker-compose.yml** file to use your desired MongoDB Atlas values.
4. Execute `docker-compose up --build` from the command line at the root of the project to build an image and deploy the container.

If the `CLEANUP_ONDESTROY` variable is true, any database or collection created by the container will be dropped when the container stops.

## Learning Content

- Written Tutorial TBD
- Video Tutorial TBD

## Contributors

- [Nic Raboy](https://www.nraboy.com), Staff Developer Advocate at MongoDB