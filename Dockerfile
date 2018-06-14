FROM spearheadea/tsnode:6.9.1-slim-2.1.4

WORKDIR /app
COPY package.json .gitignore .npmignore tsconfig.json /app/
RUN npm i

RUN npm run build
