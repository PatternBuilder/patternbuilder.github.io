---
title: Pattern Builder Schema Importer Drupal Module
---

## Pattern Builder Schema Importer Drupal Module

### TL;DR

It converts an library of JSON Schemas into Drupal paragraph bundles, and the JSON schema properties are converted into Drupal fields.


### Why

1. With a library of patterns created in Pattern Builder, we need a method for creating each Drupal admin interface that allow users to enter the data needed for each template.

1. As a content admin, you may want to create a customizable content type(s) which include entity references to smaller content patterns, such as field collection bundles. These bundles will be built to match the defined components from the Styleguide. This would expose the ability to both create content and control the ordering, layout, and design from within the node editing interface, and would be fully revisionable. Additionally, editors would be able reference & include existing view blocks within the field groups. Editors could then apply data attributes such as layout and theme to these view blocks or field collections.


### Where

1. Drupal: [https://www.drupal.org/project/patternbuilder](https://www.drupal.org/project/patternbuilder)
1. GitHub: [https://github.com/PatternBuilder/pattern-builder-drupal](https://github.com/PatternBuilder/pattern-builder-drupal)


### How

1. Tech Setup
    1. Install and enable module
    1. Set up the import paths
        - Visit **admin/config/content/patternbuilder**
        - Schema directories
        - Template directories

    1. Use Drush to run the pattern builder import command
        - If there are new patterns, first rsync webrh
        - SSL into sandbox
        - Run `drush pbi`

    1. View the imported patterns now stored as paragraph bundles
        - Visit admin/structure/paragraphs

    1. Manage Fields on the (new) content type,
        - Add a paragraphs field, choose which patterns you want to make available for content editors
        - Set widget to “Embedded Patterns”

    1. Manage Display: Set the display format on the paragraph field to "Patternbuilder rendered items"
    1. Other Notes:
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

    1. Remove imported patterns from Drupal
        - drush pbi-remove  : Nothing is removed. This safeguards against accidental commands.
        - drush pbi-remove --all : Removes all schemas.
        - drush pbi-remove band card : Removes only the "band" and "card" schemas.
        - drush pbi-remove --type=layout : Removes only the schemas for the "layout" pattern type.


### JSON Schema Support

The schema used by Pattern Builder is based on [JSON Schema](http://json-schema.org/) with customizations for the Drupal importer.

1. Property Types:

    - Primitive types: "boolean", "integer", "number", "string", "text", "textarea".
    - Single level group of properties: "object".
    - Multiple values with the same object properties: "array".

1. Hidden on the edit form

    - Schema: `"options: { "hidden": true }`
    - Drupal configuration: Field instance setting.

1. Read-only on the edit form

    - Schema: `"readonly": true `
    - Drupal configuration: Field instance setting.

1. Non-imported properties:

    If a property does not need to be imported as a Drupal field, then it can be flagged to not import it with:

    - Schema: `"options: { "import": false }`
    - Drupal configuration: None

1. Textarea

    Textareas are imported to a Drupal field type of "text_long". A schema property is consider to be a textarea if one of the following is true:

    - Schema: `"format": "textarea"` OR `"format": "html"`
    - Drupal configuration: Field type.

1. WYSIWYG / Filtered text

    Filter text in Drupal provides the user with the Input Format selector. These commonly are configured to use a WYSIWYG editor.
    A schema property is determined to allow filtered text if the following is set:

    - Schema: `"format": "html"`
    - Drupal configuration: Field instance setting.

1. Collapsible Field Groups and Field Collections

    The [field_group](https://www.drupal.org/project/field_group) module is required by the importer in order to provide basic single level grouping. The schema can control the collapsibility of a group of properties with the following:

    - Schema:

        ```
        "options": {
          "collapsed": true,
          "disable_collapse": false
        }
        ```

    - Drupal configuration: Field group setting, Field Collecton Fieldset widget.

1. Form Grid Layout

    This provides the ability to display grid style form elements.

    - Global config: "admin/config/content/patternbuilder"
        - Row class: The class for the row container in the grid layout.
        - Column class prefix: The number of columns will be appended to the column class prefix. Example: "grid-columns-" results in "grid-columns-4".

    - Schema:

        ```
        "options": {
          "grid_columns": 2
        },
        "items": {
          "format": "grid"
        }
        ```

    - Drupal configuration: Field instance setting.

1. Paragraphs preview display view mode

    The importer can automatically setup up the "Paragraphs Editor Preview" view mode if the property is configured as "preview".  The importer has some default formatters for some common fields (text, image). Refer to the patternbuilder_importer.api.php for hooks that allow setting custom formatters for the preview view mode.

    - Schema: `"options: { "preview": true }`
    - Drupal configuration: Field display view mode settings.


### Optional Drupal Extensions

The following are optional Drupal modules that are supported natively by the Pattern Builder Importer.  If these modules are enabled on the site, then the magic happens automatically.

1. Media ([https://www.drupal.org/project/media](https://www.drupal.org/project/media))
    1. Supports: file, image, audio, video
    2. Schema usage: "entity": "file|image|audio|video"

1. Media Internet - Submodule of Media ([https://www.drupal.org/project/media](https://www.drupal.org/project/media))
    1. Supports: internet based files
    1. Schema usage: "entity": "file|image|audio|video"

1. Media YouTube ([https://www.drupal.org/project/media_youtube](https://www.drupal.org/project/media_youtube))
    1. Supports: YouTube videos
    1. Schema usage: "entity": "video"

1. Link ([https://www.drupal.org/project/link](https://www.drupal.org/project/link))
    1. Supports: link fields
    1. Schema usage: "entity": "link"

1. Field Collection ([https://www.drupal.org/project/field_collection](https://www.drupal.org/project/field_collection))
    1. Supports: array of objects imported as a field collection.
    1. Schema usage: "type": "array", "items": { Each item object definition }

1. Field Collection Fieldset ([https://www.drupal.org/project/field_collection_fieldset](https://www.drupal.org/project/field_collection_fieldset))
    1. Supports: collapsible array of objects imported to a field collection.
    1. Schema usage: "options": {"collapsed": true/false, "disable_collapse": true/false}

1. Field Multiple Extended ([https://www.drupal.org/project/field_multiple_extended](https://www.drupal.org/project/field_multiple_extended))
    1. Supports: Set minimum and maximum items on a property.
    1. Schema usage: "type": "array", "minItems": 2, "maxItems": 10


### Future Plans

1. Use standard Drupal 8 rendering engine.
1. CMI (config mgmt), use schemas to manipulate YML files.
