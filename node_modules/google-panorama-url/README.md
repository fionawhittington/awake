# google-panorama-url

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Returns a raw street view URL from a panorama ID, tile position, and zoom level. This is an undocumented entry point from Google Maps, and best suited for experiments and artistic exploration.

## Example

An example in the browser:

```js
var streetview = require('google-panorama-url')
var loadImage = require('img')

var url = streetview('dXZfBMex9_L7jO2JW3FTdA')
loadImage(url, function (err, image) {
  if (err) throw err
  document.body.appendChild(image)
})
```

## Usage

[![NPM](https://nodei.co/npm/google-panorama-url.png)](https://www.npmjs.com/package/google-panorama-url)

#### `url = streetviewUrl(panoId, [opt])`

Gets a URL for the StreetView panorama. Options:

- `x` the X tile position, default 0
- `y` the Y tile position, default 0
- `zoom` the zoom level, default 0

## See Also

- [google-panorama-equirectangular](https://github.com/mattdesl/google-panorama-equirectangular)
- [google-panorama-zoom-level](https://github.com/Jam3/google-panorama-zoom-level)
- [google-panorama-by-id](https://github.com/Jam3/google-panorama-by-id)
- [google-panorama-by-location](https://github.com/Jam3/google-panorama-by-location)
- [google-panorama-tiles](https://github.com/Jam3/google-panorama-tiles)
- [awesome-streetview](https://github.com/Jam3/awesome-streetview)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/google-panorama-url/blob/master/LICENSE.md) for details.
