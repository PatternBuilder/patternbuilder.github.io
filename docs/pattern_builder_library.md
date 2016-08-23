---
title: Pattern Builder PHP Library
---

## Pattern Builder PHP Library

### What is it?

1. TLDR; It lets you take data from anywhere and sets it up to work with Twig rendering.
1. The library is a Symfony based PHP library that contains classes for setting data in the appropriate object layout for consumption and rendering by the Twig layer.
1. The Drupal Pattern Builder module uses this library to render the patterns while using Drupal to store the user entered data.


### Where

1. GitHub: [https://github.com/PatternBuilder/pattern-builder-lib-php](https://github.com/PatternBuilder/pattern-builder-lib-php)


### Install

- Add the **latest release** of Pattern Builder library to your composer.json: `"require": {"pattern-builder/pattern-builder": "v1.1.0"}`
- Run `composer install`
- Drupal:
    The Drupal [Pattern Builder module](https://www.drupal.org/project/patternbuilder) includes a composer.json with the library. The module is maintained to be compatible with library.


### Rendering a Schema

The following details how to render an example JSON schema named "band".

The Drupal Pattern Builder module automatically does all this through Drupal field storage, field widgets, and field formatters.

#### Example JSON Schema: band

```javascript
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Band",
    "description": "A Band pattern",
    "type": "object",
    "properties": {
        "name": {
          "type": "string",
          "enum": ["band"],
          "options": {
            "hidden": true
          }
        },
        "background": {
          "title": "Background Options",
          "type": "object",
          "format": "grid",
          "properties": {
            "color": {
                "type": "string",
                "enum": ["white", "gray", "black", "rich-black", "red", "transparent"]
            },
            "isFixed" :{
                "title": "Fixed Background Option",
                "type": "boolean",
                "default": true
            }
          }
        },
        "header": {
          "title": "Header",
          "type": "object",
          "format": "grid",
          "properties": {
            "theme": {
                "type": "string",
                "enum": ["light", "dark"],
                "default": "light"
            },
            "content": {
              "type": "array",
              "maxItems": 1,
              "items": {
                  "title": "Header Item",
                  "oneOf": [
                      {"$ref": "band_header.json"}
                  ]
              }
            }
          }
        },
        "content": {
            "title": "Content Items",
            "type": "array",
            "minItems": 1,
            "items": {
                "oneOf": [
                    {"$ref": "card.json"}
                ]
            }
        }
    }
}
```

- - -

#### Create a Schema Factory

###### Drupal Pattern Builder Module

```php
    $schema_factory = patternbuilder_get();
```

###### Standalone Library

```php
    // Twig setup.
    $twig_loader = new \Twig_Loader_Filesystem(array(
        '/path/to/my/templates',
    ));
    $twig = new \Twig_Environment($twig_loader);

    // Logger: MyLogger extends \Psr\Log\AbstractLogger
    $logger = new MyLogger();

    // JSON Schema setup.
    $retriever = new \JsonSchema\Uri\UriRetriever();
    $resolver = new \JsonSchema\RefResolver($retriever);

    // Pattern Builder.
    $configuration = new \PatternBuilder\Configuration\Configuration($logger, $twig, $resolver);
    $schema_factory = new \PatternBuilder\Schema\Schema($configuration);
```

- - -

#### Set Schema Values

```php
    // Load the band header schema and set values.
    $band_header = $schema_factory->load('band_header')
      ->set('title', 'My Awesome Band')
      ->set('headline', 'New content, new markup, new everything!');

    // Create a card schema and set values.
    $card = $schema_factory->load('card')
      ->set('title', 'Card 1')
      ->set('background', array('color' => 'white'))
      ->set('image', array('src' => 'http://example.com/cool-image.jpg'));

    // Load the band schema and set values.
    $band = $schema_factory->load('band')
        ->set('background', array('color' => 'black'))
        ->set('header', array(
          'theme' => 'dark',
          'content' => $band_header
        ))
        ->set('content', $card);
```

- - -

#### Render the Schema


```php
    // Render the entire band - all the nested schemas and their TWIG templates.
    $band_markup = $band->render();
```
