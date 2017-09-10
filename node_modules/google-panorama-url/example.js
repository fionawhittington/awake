var streetview = require('./')
var loadImage = require('img')

var zoom = 3
var url = streetview('dXZfBMex9_L7jO2JW3FTdA', { 
  zoom: zoom,
  x: 1,
  y: 1
})

loadImage(url, function (err, image) {
  if (err) throw err
  document.body.appendChild(image)
})
