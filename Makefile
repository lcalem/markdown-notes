SERVER_NAME := dummyserver

docker:
	docker build -t $(SERVER_NAME) -f docker/Dockerfile .

up_server: down_server
	docker-compose -f docker/docker-compose.yml up -d

down_server:
	docker-compose -f docker/docker-compose.yml down

.PHONY: docker