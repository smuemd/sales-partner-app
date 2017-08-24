# SUIT CSS utilities: sampleUtility

[![Build Status](https://travis-ci.org/suitcss/utils-link.svg?branch=master)](https://travis-ci.org/suitcss/utils-link)

SUIT CSS sampleUtility utilities.

Read more about [SUIT CSS's design principles](https://github.com/suitcss/suit/).

## Installation

* [npm](http://npmjs.org/): `npm install suitcss-utils-link`
* Download: [zip](https://github.com/suitcss/utils-link/releases/latest)

## Available classes

* `u-sampleUtilityBlock` - Block-level link with no `text-decoration` for any state.

* `u-sampleUtilityClean` - A link without no `text-decoration` for any state.

* `u-sampleUtilityComplex` - Limit a link's interactive `text-decoration` underline to a
  sub-section of the link text.

    ```html
    <a class="u-sampleUtilityComplex" href="{url}">
      sampleUtility complex
      <span class="u-sampleUtilityComplexTarget">target</span>
    </a>
    ```

## Usage

Please refer to the README for [SUIT CSS utils](https://github.com/suitcss/utils/)

## Testing

[//]: # (TODO: Proper testing instructions needed. See: https://github.com/suitcss/utils-link/)
[TODO]

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+
