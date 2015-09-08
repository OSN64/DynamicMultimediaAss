var splashPage = require('./pages/splash');
var albumsPage = require('./pages/albums');
var Albums = require('./models/albums');
var animateNextRoute = require('./animations').animateNextRoute;

var pageContainer = $('main')[0];
var routes = {
    '/': function(){
        // servise check if logged in
        // servise get cover img
        animateNextRoute([])
        .then(function(data){
            console.log(data);
            m.mount($('main')[0],splashPage);
        });
    },
    '/albums': function(){

        animateNextRoute([
            Albums.list()
        ]).spread(function(albums){

            var inject = {
                albums: albums
            }

            $('main').html($('<div class="main-container container">'))

            m.mount($('.main-container')[0], m.component(albumsPage,inject));
        });
    },
    '/album/:id': function(id){
        console.log(id)
    },
    '/about': function(){
        // animateNextRoute([3])
        // .spread(function(num){
        //     var inject = {}
        //
        //     $('main').html($('<div class="main-container container">'));
        //
        //     m.mount( $('.main-container')[0], m.component( albumsPage, inject ) );
        // });
    }
};
var router = Router(routes);
module.exports = {
    //
    init: function(){
        router.init('/');
        return router;
    }
}
