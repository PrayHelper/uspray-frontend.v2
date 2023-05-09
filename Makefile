build-dev:
        docker compose -p frontend-dev -f ./deploy/docker-compose.dev.yml down
        docker compose -p frontend-dev -f ./deploy/docker-compose.dev.yml up --build -d

build-prod:
        docker compose -p frontend-prod -f ./deploy/docker-compose.prod.yml down
        docker compose -p frontend-prod -f ./deploy/docker-compose.prod.yml up --build -d
