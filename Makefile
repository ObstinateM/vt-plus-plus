VERSION=$(shell npm pkg get version | sed 's/\"//g')
APPNAME=$(shell npm pkg get name | sed 's/\"//g')

# Import the .env
dpl ?= .env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

.PHONY: help

help: ## Show the helper
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: ## Build the version image
	@echo "Building docker image..."
	docker build -t $(DOCKER_REPO)/$(APPNAME) .
	@echo "Docker image builded"

tag-latest: ## Rename the docker version image to latest
	docker tag $(DOCKER_REPO)/$(APPNAME):$(VERSION) $(DOCKER_REPO)/$(APPNAME):latest

login: ## Login to the docker registry
	# " on the password prevent some characters to escape the field
	docker login -u $(DOCKER_USERNAME) -p "$(DOCKER_PASSWORD)" $(DOCKER_REPO)

publish: build login ## Publish the actual version
	docker push $(DOCKER_REPO)/$(APPNAME):$(VERSION) 

publish-lastest: publish tag-latest ## Publish the actual version and the latest
	docker push $(DOCKER_REPO)/$(APPNAME):latest

run: ## Run the container (make sure to build before)
	docker-compose up -d

stop: ## Stop the container
	docker-compose stop

restart: stop run ## Restart the container
