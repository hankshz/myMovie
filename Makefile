build:
	docker build -t mymovie .

start:
	docker rm -f mymovie || true
	docker run -itd --rm --name mymovie mymovie

.PHONY: start
