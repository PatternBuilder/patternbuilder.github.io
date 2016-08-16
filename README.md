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

## Deploying the site

* Ensure mkdocs is installed. See above.
* Checkout the latest *dev* branch.
* From the commandline, run `make deploy` - This will build the *dev* branch in the *master* branch.
* Push changes to this repository.
* Changes should be seen on [patternbuilder.github.io](http://patternbuilder.github.io).
