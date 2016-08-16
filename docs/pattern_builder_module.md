---
title: Pattern Builder Drupal Module
---

## Pattern Builder Drupal Module


### What is it?

The Pattern Builder Module empowers your team to prototype in a static pattern library and then import the designs and content data model into Drupal with a single drush command.

Need to update your design? No problem! Just update and QA the code in your pattern library and import those changes in seconds.


### Why

1. The Pattern Builder System empowers us to create a design system out of JSON schemas and Twig templates. To do this efficiently we need a tool that allows us to quickly prototype, build and validate our content structure and visual design.

1. It is important that developers and stakeholders have access to the growing design system.


### Where

1. Drupal.org: [https://www.drupal.org/project/patternbuilder](https://www.drupal.org/project/patternbuilder)
1. GitHub: [https://github.com/PatternBuilder/pattern-builder-drupal](https://github.com/PatternBuilder/pattern-builder-drupal)


### How

Good question! It could be:

1. Composer Module
    - Add composer dependency
    - Symlink assets to web/app root (or use custom install location)
    - Create pb_config.yml
        1. Includes paths to schemas/templates/data
        2. Includes paths to js/css to add to preview

1. Git clone
    - Clone repo to root (at least at/above theme)
    - Repo includes
        1. Index.php (index just pulls from app folder)
        2. pb_config.yml
        3. App_folder

1. Grunt Project
    - Clone grunt repo. NPM install, Bower Install, Composer install
    - Use built in yeoman to create templates/schemas
    - Add sass and sample data to component/layout folders
    - Run grunt commands to compile, spin up local php server, lint etc


### JSON Schema Support

1. Property "uniqueId"

    If the schema defines a "uniqueId" property, then the property value is set to the paragraph entity's item id during the rendering process.


### TODO

Install Options: (NEEDS CLEANUP)
install patternbuilder module, composer install in the patternbuilder module folder + install composer_manager

OR

install patternbuilder module, clone patternbuilder-lib-php into libraries and then composer install from there
