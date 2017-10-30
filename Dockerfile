# BASE IMAGE
FROM node:slim

# DEFAULT ENVIRONMENT
ENV API_HOST=0.0.0.0
ENV API_PORT=3000

# COPY APP
WORKDIR /ngx-stack
COPY . /ngx-stack

# REMOVE LOCAL API CONFIG
RUN touch /ngx-stack/apps/api/config/local.yaml
RUN rm /ngx-stack/apps/api/config/local*

# GLOBAL INSTALL
RUN npm install -g lerna pm2

# CLEAN
RUN npm run clean

# PROJECT INSTALL
RUN npm install

# BOOTSTRAP
RUN lerna bootstrap

# BUILD ANGULAR APP
RUN npm run build

# EXPOSE LISTENING PORT
EXPOSE 3000

# START SERVER
CMD ["pm2-docker", "start", "npm", "--", "start"]
