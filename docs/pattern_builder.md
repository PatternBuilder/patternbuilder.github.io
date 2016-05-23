---
title: Pattern Builder
---

## Pattern Builder

1. Why
    1. The Pattern Builder System empowers us to create a design system out of JSON schemas and Twig templates. To do this efficiently we need a tool that allows us to quickly prototype, build and validate our content structure and visual design.
    2. It is also important that developers and stakeholders have access to the growing design system.

2. What is it?
    1. Pattern Builder is an application that lets us preview our library of templates and manipulate their content by interacting with a form built from the schemas.
    2. It is both a development tool and a public facing pattern library.

3. How
    1. Good question! It could be:
        1. Composer Module
            - Add composer dependency
            - Symlink assets to web/app root (or use custom install location)
            - Create pb_config.yml
                1. Includes paths to schemas/templates/data
                2. Includes paths to js/css to add to preview

        2. Git clone
            - Clone repo to root (at least at/above theme)
            - Repo includes
                1. Index.php (index just pulls from app folder)
                2. pb_config.yml
                3. App_folder

        3. Grunt Project
            - Clone grunt repo. NPM install, Bower Install, Composer install
            - Use built in yeoman to create templates/schemas
            - Add sass and sample data to component/layout folders
            - Run grunt commands to compile, spin up local php server, lint etc


Install Options: (NEEDS CLEANUP)
install patternbuilder module, composer install in the patternbuilder module folder + install composer_manager

OR

install patternbuilder module, clone patternbuilder-lib-php into libraries and then composer install from there
