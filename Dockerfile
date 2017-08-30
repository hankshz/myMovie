FROM ubuntu:14.04

copy app /app

RUN apt-get update && apt-get install make

WORKDIR /app

RUN make setup

EXPOSE 80

CMD ["make", "production"]
