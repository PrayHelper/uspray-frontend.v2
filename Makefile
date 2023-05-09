build-dev:
	docker compose -f ./deploy/docker-compose.dev.yml down
	docker compose -f ./deploy/docker-compose.dev.yml up --build -d

build-prod:
	docker compose -f ./deploy/docker-compose.prod.yml down
	docker compose -f ./deploy/docker-compose.prod.yml up --build -d