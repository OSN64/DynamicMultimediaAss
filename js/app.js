// domready
$( document ).ready(function(){

    require('./helper');
    var navbars = require('./components/navbars');
    var router = require('./router');
    m.mount(document.getElementsByTagName('header')[0], navbars);
});
