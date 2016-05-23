.PHONY: deploy
deploy:
	@read -p "This will deploy your current code to http://patternbuilder.github.io/. Press ENTER to continue..."

	@mkdocs gh-deploy -b master
