var progressLoader = require('../components/progressLoader');
var albumComponent = require('../components/album');
var Services = require('../services');
var Models = require('../models');
var Page = Models.Page;
var Album = Models.Album;

module.exports = {
    //     //the Todo class has two properties
    controller: function() {
        // console.log('aaa')
        // var error = m.prop('');
        var page = m.prop({});
        var albums = m.prop([]);
        var visitorsPosts = m.prop([]);
        var albumOpen = m.prop(false);

        var openAlbum = function(id){
            // var route = '/album/' + id;
            //
            // var currRouteIsSame = m.route() == route;
            // // console.log(route,m.route(),currRouteIsSame)
            //
            // if(currRouteIsSame){ // just moved in from route change
            //     albumOpen(true);
            // }
            // else m.route(route);
            m.mount(document.getElementsByTagName('footer')[0],m.component(albumComponent, {id:id}))
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
                Page.getVisitorsPosts()
            ]);
        }).then(function(all){ // set valuse
            page(all[0]);
            albums(all[1]);
            visitorsPosts(all[2]);
        }).then(m.redraw,function(e){

            Services.Popup({text: 'Error Unable to Load Page', timeout: 4000}, function done(){
                m.route('/'); // logout
            });
            console.log('error Token Not Valid', e)
            // 'Unable to Load Please Login again' .. button to home route
            // popup service
            // pop up 'invalid Login token' .. redirect home
            // return m.route('/')
        });
        // redraw stategy div
        // m.redraw.strategy('diff');
        return {
            page: page, // object
            albums: albums, // array
            visitorsPosts: visitorsPosts, //array
            albumOpen: albumOpen, // bool
            openAlbum: openAlbum, // function

            // error: error, // string
            onunload: onunload
        }

    },

    view: function(ctrl) {
        var page = ctrl.page;

        return m('.container', {config: persistent}, [
            !ctrl.albums().length ?  m.component( progressLoader, {id: 'page-load-progress'}) :
            m('.albums-view',[
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
            // ctrl.albumOpen() ? m.component(albumComponent, {id:m.route.param("id")}) : ''
        ]);
    }
};
//a configuration that persists across route changes
function persistent(el, isInit, context) {
    context.retain = true
}
var albumsHead = function(page,posts){
    return m('.row', [
        m('.col.s12.m9.l8',[
            m('h1', page().name),
            m('p', page().description)
        ]),
        m('.col.hide-on-small-only.m3.l4',[
            m('ul.collection.with-header',[
                m('li.collection-header', 'Feed'),

                posts().map(function(post){
                    return m('li.collection-item', [
                        m('p', post.message),
                        m('sub', 'Admin liked this post')
                    ]);
                })
            ])
        ]),
    ]);
}

var albumsCard = function(onclick,album){
    return m('.col.s12.m6.l6',[
        m('.card-image.waves-effect',{onclick: onclick.bind(onclick,album.id)},[
            m('img.responsive-img',{src: album.coverSource, style: { height: '400px'}}),
            m('span.card-title',album.name + ' Likes: ' + album.likes.length)
        ])
    ]);
}

// var ctrlr = this;
// //a running list of todos
// ctrlr.list = new todo.TodoList();
//
// //a slot to store the name of a new todo before it is created
// ctrlr.description = m.prop('');
//
// //adds a todo to the list, and clears the description field for user convenience
// ctrlr.add = function(description) {
//     if (description()) {
//         ctrlr.list.push(new todo.Todo({description: description()}));
//         ctrlr.description("");
//     }
// };

//refactor the binding to a simple helper
// var binds = function(prop) {
//     return {oninput: m.withAttr("value", prop), value: prop()}
// }
//
// //a data store
// var name = m.prop("")
//
// //binding the data store in a view
// m("input", binds(name))
