FROM node:14
ARG UMI_ENV=dev
WORKDIR /app
COPY . .

RUN export NODE_OPTIONS=--max_old_space_size=4096
RUN echo $UMI_ENV
RUN yarn install &&\ 
    UMI_ENV=$UMI_ENV yarn build

CMD ["yarn", "serve"]

