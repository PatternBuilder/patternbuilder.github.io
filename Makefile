.PHONY: build
build:
	@rm docs/pattern_kit.md
	@echo "---" > docs/pattern_kit.md
	@echo "title: Pattern Kit" >> docs/pattern_kit.md
	@echo "---" >> docs/pattern_kit.md
	@echo "INFO - Downloading Pattern Kit README.md ..."
	@curl --progress-bar -L "https://raw.githubusercontent.com/PatternBuilder/pattern-kit/master/README.md" >> docs/pattern_kit.md
	@mkdocs build --clean

.PHONY: deploy
deploy:
	@read -p "This will deploy your current code to http://patternbuilder.github.io/. Press ENTER to continue..."
	@make build
	@mkdocs gh-deploy -b master
