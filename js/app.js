// domready
$( document ).ready(function(){
    // window.Observable = require('./helper').Observable.call(); // event systsem

    var navbars = require('./components/navbars');
    var albumComponent = require('./components/album');
    require('./settings');
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
    var router = require('./router');
    m.mount(document.getElementsByTagName('header')[0], navbars);

    // m.mount($('footer')[0],albumComponent);

    // router.init();


    //initialize
    // m.mount(document.getElementsByTagName('header')[0], Demo);

});
