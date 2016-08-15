---
title: Pattern Builder Importer
---

## Pattern Builder Importer Drupal Module

1. Why
    1. With a library of patterns created in Pattern Builder, we need a method for creating each Drupal admin interface that allow users to enter the data needed for each template.
    2. As a content admin, you may want to create a customizable content type(s) which include entity references to smaller content patterns, such as field collection bundles. These bundles will be built to match the defined components from the Styleguide. This would expose the ability to both create content and control the ordering, layout, and design from within the node editing interface, and would be fully revisionable. Additionally, editors would be able reference & include existing view blocks within the field groups. Editors could then apply data attributes such as layout and theme to these view blocks or field collections.

2. What is it
    1. TL;DR
        1. It takes an external library (of JSON Schemas and Twig templates), and converts the schemas into fields in Drupal as paragraph bundles, and imports the twig templates and converts them to PHP to render the nodes.

    2. Features
        1. Includes support for multiple templates and schemas
            - You can list WebRH as the default library, then your own custom library
            - If templates have namespace collisions…
                1. Check to see what twig.js does (does first or last win)

        2. Automated Tests

3. How
    1. Tech Setup
        1. Install and enable module
        2. Set up the import paths in settings.php in admin config page
            - Go to admin/config/content/patternbuilder
            - Schema directories
                1. sites/all/libraries/{webrh}/dist/library/schemas

            - Template directories
                1. sites/all/libraries/{webrh}/dist/library/templates

        3. Use Drush to run the pattern builder import command
            - If there are new patterns, first rsync webrh
            - SSL into sandbox
            - Run `drush pbi`

        4. View the imported patterns now stored as paragraph bundles
            - Visit admin/structure/paragraphs

        5. Manage Fields on the (new) content type,
            - Add a paragraphs field, choose which patterns you want to make available for content editors
            - Set widget to “Embedded Patterns”

        6. Manage Display: Set the display format on the paragraph field to "Patternbuilder rendered items"
        7. Other Notes:
            - Don’t forget to load the webrh.css via a pre-process function or the style module
            - Optional: Modify the content type node--[type].tpl.php as needed to remove other regions etc
            - To use the test pattern, enabled “Red Hat webrh test” on the modules page: /admin/modules?filter=webrh_test&enabled=1&disabled=1&required=1&unavailable=1 -- it will take a while to import so you have to wait for the page to be done refreshing



    1. Drush Commands
        1. Imports patterns from defined library
            - drush pbi  : Import all schemas.
            - drush pbi --all  :  Force the import of all schemas even if specific schemas are defined.
            - drush pbi band card :  Import only the "band" and "card" schemas.
            - drush pbi --type=layout  : Import only the schemas for the "layout" pattern type.
            - drush pbi -image_box

        2. Remove imported patterns from Drupal
            - drush pbi-remove  : Nothing is removed. This safeguards against accidental commands.
            - drush pbi-remove --all : Removes all schemas.
            - drush pbi-remove band card : Removes only the "band" and "card" schemas.
            - drush pbi-remove --type=layout : Removes only the schemas for the "layout" pattern type.

1. Where
    1. [https://www.drupal.org/project/patternbuilder](https://www.drupal.org/project/patternbuilder)
    2. [https://github.com/PatternBuilder/pattern-builder-lib-php](https://github.com/PatternBuilder/pattern-builder-lib-php)

2. Supported Extensions

The following are optional Drupal modules that are supported natively by the Pattern Builder Importer.

1. Media ([https://www.drupal.org/project/media](https://www.drupal.org/project/media))
    1. Supports: file, image, audio, video
    2. Schema usage: "entity": "file|image|audio|video"

2. Media Internet - Submodule of Media ([https://www.drupal.org/project/media](https://www.drupal.org/project/media))
    1. Supports: internet based files
    2. Schema usage: "entity": "file|image|audio|video"

3. Media YouTube ([https://www.drupal.org/project/media_youtube](https://www.drupal.org/project/media_youtube))
    1. Supports: YouTube videos
    2. Schema usage: "entity": "video"

4. Link ([https://www.drupal.org/project/link](https://www.drupal.org/project/link))
    1. Supports: link fields
    2. Schema usage: "entity": "link"

5. Field Collection ([https://www.drupal.org/project/field_collection](https://www.drupal.org/project/field_collection))
    1. Supports: array of objects imported as a field collection.
    2. Schema usage: array&lt;object&gt;

6. Field Collection Fieldset ([https://www.drupal.org/project/field_collection_fieldset](https://www.drupal.org/project/field_collection_fieldset))
    1. Supports: collapsible array of objects imported to a field collection.
    2. Schema usage: options.collapsed=true, options.disable_collapse=true

7. Field Multiple Extended ([https://www.drupal.org/project/field_multiple_extended](https://www.drupal.org/project/field_multiple_extended))
    1. Supports: Set minimum and maximum items on a property.
    2. Schema usage: minItems: 2, maxItems: 10

1. Future Plans
    1. Use standard Drupal 8 rendering engine
    2. CMI (config mgmt), use schemas to manipulate YML files
