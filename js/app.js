// domready
$( document ).ready(function(){
    var router = require('./router').init();
    var navbars = require('./components/navbars');
    // router.init();
    // m.route.mode = "hash";
    // m.route(document.getElementsByClassName('main-container')[0] , '/', router.routes);
    // m.route('/')

    m.mount(document.getElementsByTagName('header')[0],navbars)
});
