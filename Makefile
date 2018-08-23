.PHONY: help 

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup:  ## installs nodejs, npm, typescript
	brew install npm node typescript

info: ## show versions
	node -v
	npm -v
	tsc -v

test: ## run test
	npm test

fmt: ## runs code formatter
	npm fmt

lint: ## run python code analysis on rules
	npm lint

dist: ## create a distribution
	npm build

clean: ## remove all build artifacts
	rm -rf node_modules
