SERVER_NAME := dummyserver

docker:
	docker build -t $(SERVER_NAME) -f docker/Dockerfile .

up_server: down_server
	docker-compose -f docker/docker-compose.yml up -d

down_server:
	docker-compose -f docker/docker-compose.yml down

reload_server: down_server docker up_server

.PHONY: docker