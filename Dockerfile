FROM node:18

WORKDIR /usr/src/app

COPY ./app/* ./
COPY ./docker_run_script.mjs ./

RUN curl https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz --output mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz
RUN tar -xvf mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz && mv mongodb-atlas-cli_1.3.0_linux_x86_64 atlas_cli
RUN chmod +x atlas_cli/bin/atlas
RUN mv atlas_cli/bin/atlas /usr/bin/

RUN npm install -g zx
RUN npm install

EXPOSE 3000

CMD ["./docker_run_script.mjs"]