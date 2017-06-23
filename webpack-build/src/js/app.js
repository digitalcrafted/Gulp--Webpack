
/*!
entry file
*/

const jQuery = require('jquery');
window.jQuery = jQuery;
window.$ = jQuery;
require('../scss/app.scss'); //You may need an appropriate loader to handle this file type.
require('./foundation-js-components');
const instagram = require('./instagram');
$(document).ready(function () {
    $(document).foundation();
    instagram();
})

