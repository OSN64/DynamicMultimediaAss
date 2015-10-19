//
// var router = Router();
//
var progressLoader = require('../components/progressLoader');
var Albums = require('../models/albums');
var albumComponent = require('../components/album');
module.exports = {
    //     //the Todo class has two properties
    controller: function() {
        console.log('aaa')
        var ctrl = this;
        ctrl.albums = m.prop([]);
        ctrl.albumOpen = m.prop(false);

        // m.component( progressLoader, {id: 'page-load-progress'})
        ctrl.onunload = function(){
            console.log('this unloaded');
        }
        ctrl.openAlbum = function(id){
            var route = '/album/' + id;
            // var currRoute = router.getRoute().join('/');

            var currRouteIsSame = m.route() == route;
            console.log(route,m.route(),currRouteIsSame)

            if(currRouteIsSame){ // just moved in from route change
                ctrl.albumOpen(true);
                // console.log('open:',ctrl.albumOpen());
                // m.redraw(true);
            }
            else m.route(route);
            // if (goToRoute == currRoute){
            //     // move bellow lines to mount album funt helper
            //     var album = {
            //         id: albumId
            //     };
            //     // return ;
            //
            // } else return router.setRoute(route);

        }

        var currAlbumId = +m.route.param("id"); // convert to integer

        if(!isNaN(currAlbumId)){
            ctrl.openAlbum(currAlbumId);
        }
        Albums.list()
        .then(ctrl.albums)
        .then(m.redraw);

    },
    view: function(ctrl) {
        // return m.component( progressLoader, {id: 'page-load-progress'});
        return m('.container', [
            !ctrl.albums().length ?  m.component( progressLoader, {id: 'page-load-progress'}) :
            m('.albums-view',[

                m('#album-head', [
                    albumsHead()
                ]),
                m('#albums-content', [
                    m('h1', "destination"),
                    m('.divider'),
                    m('.albums-items.row', [
                        ctrl.albums().map(function(album){
                            return albumsCard(ctrl.openAlbum,album)
                        }),
                    ])
                ]),
                ctrl.albumOpen() ? m.component(albumComponent, {id:m.route.param("id")}) : ''
            ])
        ]);
    }
};
var albumsHead = function(){
    // ge descript
    return [
        m('h1', "titile"),
        m('p', "desctript")
    ]
}

var albumsCard = function(onclick,album){
    return m('.col.s12.m6.l3',[
        m('.card-image.waves-effect',{onclick: onclick.bind(onclick,album.id)},[
            m('img.responsive-img',{src: "/images/placeholder.jpg"}), //http://lorempicsum.com/up/400/400/6
            m('span.card-title',album.name)
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
