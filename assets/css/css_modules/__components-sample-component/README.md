# components-sample-component

[![Build Status](https://travis-ci.org/suitcss/components-button.svg?branch=master)](https://travis-ci.org/suitcss/components-button)

A SUIT CSS component that provides a structural UI SampleComponent template to be extended with modifiers. 

Read more about [SUIT CSS's design principles](https://github.com/suitcss/suit/).

## Installation

[//]: # (Proper installation example needed)
* [npm](http://npmjs.org/): `npm install suitcss-components-button`
* Download: [zip](https://github.com/suitcss/components-button/releases/latest)

## Available classes

* `SampleComponent` - [core] The core SampleComponent component
* `is-disabled` - [state] For disabled-state SampleComponent styles (themes)

N.B. You must also include the `disabled` attribute on `SampleComponent` elements. For
`a` elements, you should prevent JavaScript event handlers from firing.

## Configurable variables

* `--SampleComponent-border-width`
* `--SampleComponent-border-color`
* `--SampleComponent-color`
* `--SampleComponent-font`
* `--SampleComponent-padding`
* `--SampleComponent-disabled-opacity`

## Use

Examples:

```html
<a class="SampleComponent" href="{{url}}">Sign up</a>

<button class="SampleComponent SampleComponent--default is-disabled" type="button">Close</button>
```

### Theming / extending

The CSS is focused on common structural requirements for SampleComponents. 
You can build your application-specific theme styles in your app. 
For example:

```css
@import "components-SampleComponent";

/**
 * Modifier: default SampleComponents
 */

.SampleComponent--default {
  background-color: #eee;
  color: #444;
  border-color: #d9d9d9 #d9d9d9 #ccc;
  border-radius: 2px;
}

.SampleComponent--default:hover,
.SampleComponent--default:focus,
.SampleComponent--default:active,
.SampleComponent--default.is-pressed {
  background-color: #f5f5f5;
  color: #222;
  border-color: #c6c6c6 #c6c6c6 #bbb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.SampleComponent--default:focus {
  border-color: #069;
  outline: 0;
}

.SampleComponent--default:active,
.SampleComponent--default.is-pressed {
  background-color: #ccc;
  box-shadow: inset 0 1px 2px rgba(0,0,0, 0.2);
}

/**
 * Modifier: large SampleComponents
 */

.SampleComponent--large {
  font-size: 1.5em;
  padding: 0.75em 1.5em;
}
```

## Testing

[//]: # (TODO: Proper testing instructions needed. See: https://github.com/suitcss/components-button/)
[TODO]

## Browser support

* Google Chrome
* Firefox
* Opera
* Safari
* Internet Explorer 9+
