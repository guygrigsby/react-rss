release: build
	firebase deploy

serve: build
	firebase serve

build:
	yarn build

.PHONY: release serve build
