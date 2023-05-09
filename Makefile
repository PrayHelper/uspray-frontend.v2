build-dev:
	docker compose down -f ./deploy/docker-compose.dev.yml
	docker compose up -f ./deploy/docker-compose.dev.yml --build

build-prod:
	docker compose down -f ./deploy/docker-compose.yml
	docker compose up -f ./deploy/docker-compose.yml --build