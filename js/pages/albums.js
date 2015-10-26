var progressLoader = require('../components/progressLoader');
var albumComponent = require('../components/album');
var Services = require('../services');
var Models = require('../models');
var Page = Models.Page;
var Album = Models.Album;

module.exports = {
    //  mithril object has two properties controller and view
    controller: function() {
        var page = m.prop({});
        var albums = m.prop([]);
        var visitorsPosts = m.prop([]);
        var ready = m.prop(false);

        var openAlbum = function(id){
            m.mount(document.getElementsByTagName('footer')[0],m.component(albumComponent, {id:id}));
        }

        var currAlbumId = +m.route.param("id"); // convert to integer

        if(!isNaN(currAlbumId)){
            openAlbum(currAlbumId);
        }

        Services.FB.isLoggedIn().then(function(valid){
            if(!valid) return Promise.reject('Token Not Valid');

            return Promise.all([
                Page.getDetails(),
                Album.getAll(),
                Page.getVisitorsPosts(),
                Promise.delay(2000)
            ]);
        },function (e) {

            Services.Popup({text: 'Error not logged in. Redirecting...', timeout: 4000}, function done(){
                m.route('/logout'); // logout
            });
        }).then(function(all){ // set valuse
            page(all[0]);
            albums(all[1]);
            visitorsPosts(all[2]);
            ready(true);

        }).then(m.redraw,function(e){
            Services.Popup({text: 'Error Unable to Load Page'});
        });

        return {
            page: page, // object
            albums: albums, // array
            visitorsPosts: visitorsPosts, //array
            ready: ready, // bool
            openAlbum: openAlbum, // function

            // clears album view when route change from albums to any other route
            onunload: function(){
                m.mount(document.getElementsByTagName('footer')[0],null)
            }
        }
    },

    view: function(ctrl) {
        var page = ctrl.page;

        return m('.container', [
            !ctrl.ready() ?  m.component( progressLoader, {id: 'page-load-progress'}) :
            m('.albums-view', {config: fadeIn}, [
                m('#album-head', [
                    albumsHead(page,ctrl.visitorsPosts)
                ]),
                m('#albums-content', [
                    m('h1', "Top Australia Destinations"),
                    m('.divider'),
                    m('.albums-items.row', [
                        ctrl.albums().length ?
                        ctrl.albums().map(function(album){
                            return albumsCard(ctrl.openAlbum,album)
                        }) :
                        p('h1', 'No Destinations Found')
                        ,
                    ])
                ]),
            ]),
        ]);
    }
};

function fadeIn(el, isInit, context) {
    if (!isInit) {
        $(el).hide().fadeIn();
    }
}
var albumsHead = function(page,posts){
    return m('.row', [
        m('.col.s12.m9.l8',[
            m('h1', page().name),
            m(".card.blue-grey.darken-1", [
                m(".card-content.white-text", [
                    m('p', page().description)
                ])
            ])
        ]),
        m('.col.hide-on-small-only.m3.l4',[
            m('h1', 'Feed'),
            m('ul#feed.collection.with-header.white-text',[
                posts().map(function(post){
                    return m('li.collection-item', [
                        m('.row', [
                            m('.col.s12',[
                                m('blockquote', post.message),
                                m('sub', 'Admin liked this post')
                            ])
                        ])
                    ]);
                })
            ])
        ]),
    ]);
}

var albumsCard = function(onclick,album){
    return m('.album-container.s12.m6.l6',[
        m('.card', [
            m('.card-image.waves-effect',{onclick: onclick.bind(onclick,album.id)},[
                m('img.responsive-img.hoverable.image-load',{config: loadImage, src: album.coverSource, style: { height: '400px'}}),

                m('span.card-title',album.name || '')
            ])
        ])
    ]);
}

var loadImage = function (el,isInit,ctx) {
    if(!isInit){
        $(el).load(function(){
            $(el).addClass('opacity-one');
        })
    }
}
