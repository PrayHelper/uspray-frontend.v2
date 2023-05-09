build-dev:
	docker compose down -f ./deploy/docker-compose.dev.yml
	docker compose up -f ./deploy/docker-compose.dev.yml --build -d

build-prod:
	docker compose down -f ./deploy/docker-compose.prod.yml
	docker compose up -f ./deploy/docker-compose.prod.yml --build -d