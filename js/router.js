var splashPage = require('./pages/splash');
var albumsPage = require('./pages/albums');
var Albums = require('./models/albums');
var albumComponent = require('./components/album');
var animateNextRoute = require('./animations').animateNextRoute;

var albumsRoute = function(){

    return animateNextRoute([
        Albums.list(),
        // getPageName
    ]).spread(function(albums){

        $('main').html($('<div class="main-container container">'));

        var inject = {
            albums: albums
        };

        return m.mount($('.main-container')[0], m.component(albumsPage,inject));
    });
}
var routes = {
    '/': function(){
        // servise check if logged in
        // servise get cover img
        animateNextRoute([])
        .then(function(data){
            // console.log(data);
            m.mount($('main')[0],splashPage);
        });
    },
    '/albums': albumsRoute,
    '/album/:id': function(id){
        Promise.resolve($('.main-container')[0])
        .then(function(albumsView){

            if (!albumsView){ // if there is no view
                return albumsRoute();
            }

            return;
        }).then(function(){

            if ( !isNaN(id) ) { // lodash if not undefined

                var album = {
                    id: id
                };
                console.log('who')
                return m.mount($('footer')[0],m.component(albumComponent,album));
            }
        });
    },
    '/about': function(){}
};

var router = Router(routes);
module.exports = {
    //
    init: function(){
        router.init('/');
        return router;
    }
}
