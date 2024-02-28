import jQuery from "jquery"
window.$ = jQuery
window.jquery = jQuery

import "@claviska/jquery-minicolors/jquery.minicolors"

$(function() {
  $('.minicolors').minicolors()
})
