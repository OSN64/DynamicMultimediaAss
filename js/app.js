// domready
$( document ).ready(function(){
    // Observable = require('./helper').Observable.call(); // event systsem

    var navbars = require('./components/navbars');
    var albumComponent = require('./components/album');
    var settings = require('./settings'); // load settings

    // m.computati start
    var router = require('./router');
    m.mount(document.getElementsByTagName('header')[0], navbars);

    // m.mount($('footer')[0],albumComponent);

});
