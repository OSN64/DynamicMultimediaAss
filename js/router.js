var splashPage = require('./pages/splash');
var albumsPage = require('./pages/albums');

var albumComponent = require('./components/album');
// var animateNextRoute = require('./animations').animateNextRoute;

// var albumsRoute = function(){
//
//     return animateNextRoute([
//         Albums.list(),
//         // getPageName
//     ]).spread(function(albums){
//
//         // $('main').html($('<div class="main-container container">'));
//
//         var inject = {
//             albums: albums
//         };
//         m.redraw.strategy("none");
//         m.mount($('main')[0], {
//             view: function(){
//                 return m('container')
//             }
//         })
//
//         // return m.mount($('.main-container')[0], m.component(albumsPage,inject));
//     });
// }
// var routes = {
//     '/': function(){
//         // servise check if logged in
//         // servise get cover img
//         animateNextRoute([])
//         .then(function(data){
//             // console.log(data);
//             // m.mount($('main')[0],splashPage);
//         });
//     },
//     // '/albums': albumsRoute,
//     '/album/:id': function(id){
//         Promise.resolve($('.main-container')[0])
//         .then(function(albumsView){
//
//             if (!albumsView){ // if there is no view
//                 return albumsRoute();
//             }
//
//             return;
//         }).then(function(){
//
//             if ( !isNaN(id) ) { // lodash if not undefined
//
//                 var album = {
//                     id: id
//                 };
//                 // console.log('who');
//                 // event
//                 // window.Observable.trigger('openAlbum',album)
//                 // return m.mount($('footer')[0],m.component(albumComponent,album));
//             }
//         });
//     },
//     '/about': function(){}
// };
var albumComponent = require('./components/album');
// function aroundContainer (component){
//     return {
//         // controller: function () {
//         // },
//         view: function () {
//             // m.redraw.strategy("none");
//             console.log('wtf');
//             return m('.main-container.container',[m.component(component)])
//         }
//     }
// }
m.route.mode = "hash";
m.route( $('main')[0], '/', {
    '/' : splashPage,

    '/albums' : albumsPage,
    '/album/:id' : albumsPage,
    // '/route3' : slidingPage( page3 )
});



// another router for footer

// var router = Router(routes);
// module.exports = {
//     //
//     init: function(){
//         router.init('/');
//         return router;
//     }
// }
