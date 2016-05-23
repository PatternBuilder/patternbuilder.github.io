---
title: Using Pattern Builder
---

## Various Scenarios of using pattern builder module

### Choose a method

1. The whole kit AND kaboodle! (recommended)  Use pattern builder importer to pull in your patterns and schemas from your component library
    1. Example: our FTS content type
    2. Create a new content type with basic Drupal fields like title, taxonomy terms, etc
    3. Add patterns to your content type.
        1. For example, our FTS content type has one hard-coded hero pattern, and every other pattern is optional
            1. Field_pattern_components
                1. Allowed paragraph bundle types: patterns

    4. Utilizes style module to remove existing CSS

2. Hybrid:  Map existing drupal fields to WebRH templates
    1. Example: Our Country page content type Redhat_www_type_country_module
    2. Allows for developers to map data (even from external sources) to the json/twig data.
    3. Good for existing content types
    4. Not good for complex field setups since hand mapping takes time and is error prone.

3. Basic Approach: No component library
    1. Example:
    2. Install module
    3. Build out patterns and templates in paragraphs?

 **

### Other things to note

1. Your Drupal theme should (only) be responsible for the chrome of the site (header & footer)
