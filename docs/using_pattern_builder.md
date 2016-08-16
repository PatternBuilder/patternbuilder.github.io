---
title: Using Pattern Builder
---

## Various Scenarios of using pattern builder module

### Add a Pattern Field to a Content Type

1. Create a new content type or use an existing one.
1. Add a paragraphs field with patterns enabled.
    1. Widget: "Embedded Patterns" or "Embedded Patterns with Previewer" (requires patternbuilder_previewer module).
        1. Limit the pattern selection by type ("Pattern", "Components"). These need to be defined in hook_patternbuilder_pattern_types().
        1. Any non-pattern paragraph needs to be explicitly selected in the list of "Allowed paragraph bundles"
    1. Display Formatter: "Patternbuilder rendered items"
        1. Select display mode used to render the embed paragraphs. Defaults to "Full". For Patterns, the formatted values of the paragraph field is sent to the TWIG templates for display.
1. Create content with Patterns!


### Choose a method

1. The whole kit AND kaboodle! (recommended)  Use pattern builder importer to pull in your patterns and schemas from your component library
    1. Build a content type with a Pattern field (see above).
    1. Configure the directories for the JSON schemas and TWIG templates at "admin/config/content/patternbuilder"
    1. Enable the patternbuilder_importer module.
    1. Import the Pattern Schemas to Paragraph bundles:
        1. From the command line, run "drush pbi".
        1. (TODO) From the UI: Pending development.

2. Hybrid:  Map existing Drupal fields to Schema properties
    1. Allows for developers to map data (even from external sources) to the json/twig data.
    1. Good for existing content types.
    1. Not good for complex field setups since hand mapping takes time and is error prone.
    1. How:
        1. Override the node view of a given content type.
        1. Use the existing Drupal fields to build the render object using the PatternBuilder Library.
        1. Set the node view content as the rendered object.

3. (TODO) Component library only, No importer
    1. Build a content type with a Pattern field (see above).
    1. Configure the directories for the JSON schemas and TWIG templates at "admin/config/content/patternbuilder"
    1. Create a paragraph bundle.
    1. (TODO: Pending development) Associate the paragraph bundle with a JSON Schema.
    1. Add a field to the paragraph bundle.
        1. Configure the section "Pattern Builder".
        1. Required: Set the "Property name" of the JSON Schema property that maps to this field.


### Other things to note

1. Your Drupal theme should (only) be responsible for the chrome of the site (header & footer)
