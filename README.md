# Welcome to MkDocs

For full documentation visit [mkdocs.org](http://mkdocs.org).

## Installation

* Follow installation steps at [mkdocs.org](http://mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs help` - Print this help message.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

## Developing the site

* Ensure mkdocs is installed. See above.
* Checkout the latest *dev* branch.
* From the commandline, run `make build` or `make build pkit=0`
    - Builds the site at "./site"
    - If pkit is not provided OR pkit=1, then the latest Pattern Kit's README.md is downloaded to pattern_kit.md.

## Deploying the site

* Ensure mkdocs is installed. See above.
* Checkout the latest *dev* branch.
* From the commandline, run `make deploy`
    - Downloads the latest files - Example: Pattern Kit's README.md.
    - This will build the *dev* branch in the *master* branch.
* Push changes to this repository.
* Changes should be seen on [patternbuilder.github.io](http://patternbuilder.github.io).
