// domready
$( document ).ready(function(){
    // Observable = require('./helper').Observable.call(); // event systsem

    var navbars = require('./components/navbars');
    var albumComponent = require('./components/album');
    var settings = require('./settings'); // load settings
    // router.init();
    // m.route.mode = "hash";
    // m.route(document.getElementsByClassName('main-container')[0] , '/', router.routes);
    // m.route('/')
    // var ss = {
    //     view: function(){
    //         return m('rr',{config:function(el,isInit,context){
    //             console.log('rr,', el,isInit,context)
    //         }})
    //     }
    // }
    // m.mount(document.getElementsByTagName('header')[0],ss);
    // m.computati start
    var router = require('./router');
    m.mount(document.getElementsByTagName('header')[0], navbars);

    // m.mount($('footer')[0],albumComponent);

    // router.init();


    //initialize
    // m.mount(document.getElementsByTagName('header')[0], Demo);

});
