FROM node:12 as build-stage

WORKDIR /app

COPY client/ /app/

RUN npm install

RUN if [ "$NODE_ENV" != "development" ]; \
	then npm run-script build; \
	fi

FROM nginx:1.17 as nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx/ufopensource.club.conf /etc/nginx/conf.d/default.conf
