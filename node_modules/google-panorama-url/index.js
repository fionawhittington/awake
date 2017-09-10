module.exports = streetViewUrl
function streetViewUrl (panoId, opt) {
  opt = opt || {}
  var x = opt.x || 0
  var y = opt.y || 0
  var zoom = opt.zoom || 0
  // alternative:
  // return 'https://cbks2.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&panoid=' + id + '&output=tile&zoom=' + zoom + '&x=' + x + '&y=' + y + '&' + Date.now()
  return 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&panoid=' + panoId + '&output=tile&x=' + x + '&y=' + y + '&zoom=' + zoom + '&nbt&fover=2'
}
