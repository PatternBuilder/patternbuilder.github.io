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
        - If there are new patterns, then sync changes to the patternbuilder schema and template directories.
        - Run `drush pbi`

    1. View the imported patterns now stored as paragraph bundles
        - Visit admin/structure/paragraphs

    1. Manage Fields on the (new) content type,
        - Add a paragraphs field, choose which patterns you want to make available for content editors
        - Set widget to “Embedded Patterns”

    1. Manage Display: Set the display format on the paragraph field to "Patternbuilder rendered items"
    1. Other Notes:
        - Optional: Modify the content type node--[type].tpl.php as needed to remove other regions etc.

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


### Troubleshooting

After any import, check the logs to verify that there were no issues during the import. All errors and warnings are logged via the Drupal watchdog() function.
One of the following modules should be enabled on the site:

- Database logging (dblog):
    - Drupal configuration: "/admin/config/development/logging"
    - View logs: "/admin/reports/dblog", filter by type = "patternbuilder_importer"
- Syslog (syslog):
    - Drupal configuration: "/admin/config/development/logging"
    - View logs: Logs are available in the server log files, search for logs with "patternbuilder_importer". Actual location depends on the server's config for syslog.


#### Log Messages

**WARNING: "There were no schema files found to import."**

The Pattern Builder module scans the schema directory for files with the .json extension. This message is logged if no schema files were found.

- Check that the schema directories are configured correctly at "admin/config/content/patternbuilder".
- Verify that there are schema files in the directories.

- - -

**WARNING: 'There were no schema files found for the following: schema01, schema02.'**

This message is logged when importing specific schemas and the importer cannot find the schema files.

Example: "drush pbi schema01 schema02"

The files schema01.json and schema02.json cannot be found in the schema directories configured at "admin/config/content/patternbuilder".

- - -

**WARNING: 'The schema file does not exist: "file:///path/to/schemas/schema01.json"'**

This message is logged if the schema file was registered but the file could not be found when attempting to load it.

- - -

**WARNING: 'The schema file name contains an invalid hyphen: "file:///path/to/schemas/schema01.json"'**

The schema file names cannot contain a hyphen. The file name is used for the pattern's machine name and paragraph bundle name. The hyphens are replaced with underscores when using it as a paragraph bundle, therefore if the name has a hyphen then it would not be reversible in this replacement. See paragraphs_bundle_load().

- - -

**WARNING: 'The schema file is empty:  "file:///path/to/schemas/schema01.json"'**

This message is logged when the loaded file is empty.

- - -

**WARNING: 'The schema file could not be decoded: "file:///path/to/schemas/schema01.json". The most common cause of this error is malformed JSON in the schema file.'**

This message is logged when attempting to JSON decode the contents of the file. The most common cause of this error is malformed JSON in the schema file.

- - -

**WARNING: 'The schema file "file:///path/to/schemas/schema01.json" could not be loaded.'**

An unknown error occurred that prevented the schema file from being loaded and decoded.

Please open a new issue on the patternbuilder module's [drupal.org issue queue](https://www.drupal.org/project/issues/patternbuilder) and attached the schema file that will not import.

- - -

**WARNING: 'Meta type not found for "someProperty" of type "not_found".'**

This occurs when the property type cannot be mapped to an importer meta type. See section "Property Types" above for available types.

- - -

**WARNING: 'Meta type handler could not be loaded for "someProperty" of type "object".'**

This occurs for the following:
- The property type could not be mapped to an import handler class.
- The dependencies were not met for the found import handler class.

- - -

**WARNING: 'Meta type not found for reference "someRefProperty".'**

This message is logged when the importer meta type could not be be determined for the referenced property.  The importer's factory will attempt to resolve the reference using a field reference and a field group reference resolver.

This could occur if the field or field group has not been created yet.  If the referenced property is defined in another schema, then care should be take to ensure the import order - referenced property schema first, then the schema referencing it.
The order can be controlled with pattern types (see hook_patternbuilder_pattern_types) or the file names in the directory.

- - -

**WARNING: 'Base field creation failed for @field'**

The importer could not create the base field. Check the logs for other Drupal errors that occurred during the creation attempt.

- - -

**WARNING: 'Missing base field definition for @field'**

The importer reached a scenario where it is attempting to create a field instance but there is not field base created yet.

This is an edge case. If encountered, please open an issue on the patternbuilder module's [drupal.org issue queue](https://www.drupal.org/project/issues/patternbuilder).


- - -

**ERROR: 'field_123_text (text => text_long): Cannot change an existing field's type.'**

This error occurs when the field type determine from the property's schema is different than the existing field's type in Drupal.

The patternbuilder.install provides a helper function to convert text fields.  This should be added to an update function before the fields are imported.

```php
function mymodule_update_7123() {
  $pattern_name = 'awesome_pattern';
  $property_name = 'text';
  $field_type_new = 'text_long';

  $instance = patternbuilder_field_info_property_instance($pattern_name, array($property_name));
  if (!empty($instance['field_name'])) {
    module_load_install('patternbuilder');
    $converted = patternbuilder_convert_text_field($field_name, $new_type);
    if ($converted) {
      // Import schema to allow the importer to set any customizations for the
      // field and instances.
      patternbuilder_importer_import_schemas(array($pattern_name));
    }
    else {
      $t = get_t();
      $error_message = $t('@pattern @property could not be converted.', array(
        '@pattern' => $pattern_name,
        '@property' => implode('.', $property_names),
      ));

      if ($converted === FALSE) {
        // Hard fail.
        throw new DrupalUpdateException($error_message);
      }
      else {
        // Soft fail for incomplete data or conversion not allowed.
        watchdog('mymodule_update_7123', $error_message);
      }
    }
  }
}
```

Allowed conversions:

- 'text' TO 'text_long' or 'text_with_summary'.
- 'text_long' TO 'text_with_summary'
- 'text_with_summary' TO 'text_long': The 'summary' column is kept.


- - -

**ERROR: 'The property references a schema that is not imported due to the status "inactive": "schema_really_old.json#/properties/display_title"'**

This message is logged if the referenced property's schema has never been imported and there is a property referencing it.

A referenced Drupal field cannot be found if the schema was never imported to a paragraph bundle.

- - -

**WARNING: 'The property references a schema that is not creatable due to the status "deprecated": "schema_old.json#/properties/display_title"'**

This message is logged if the referenced property's schema is not creatable and there is a property referencing it.

- - -

**WARNING: 'The paragraphs field @field_name references a schema that is not imported due to the status "inactive", schema: schema_really_old.json'**

The allowed schemas references a schema that is not imported based on the pattern's status. The "inactive" status is provided by the patternbuilder module.

In Drupal, this refers to the pargraphs field's allowed bundles (schemas) which must be available on the site. This is a WARNING since this only reduces the allowed bundle options and does not block the import.

- - -

**WARNING: 'The paragraphs field @field_name references a schema that is not creatable due to the status "deprecated", schema: schema_old.json'**

The allowed schemas references a schema that is not creatable based on the pattern's status. The "inactive" and "deprecated" statuses are provided by the patternbuilder module.

In Drupal, this refers to the pargraphs field's allowed bundles (schemas) which must be allowed to be created on the site. This is a WARNING since this only reduces the allowed bundle options and does not block the import.

- - -

**WARNING: 'Child fields could not be created for field collection field_124_some_collection'**

This is logged in the Field Collection import handler when the field collection field instance was not created. The field collection field must be created before attached fields to the field collection entity bundle.
