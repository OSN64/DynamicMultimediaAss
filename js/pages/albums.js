var albumComponent = require('../components/album');

module.exports = {
    //the Todo class has two properties
    controller: function(args) {
        console.log(args);
        var ctrl = this;
        ctrl.albums = args.albums;

        ctrl.albumOpened = m.prop(false);
        ctrl.album = {
            current: m.prop(0)
        };

        ctrl.openAlbum = function(albumId){
            // console.log('Open album',albumId);
            ctrl.album.current = albumId;
            ctrl.albumOpened(true);
            // mount and initalise album component
            m.mount($('footer')[0],m.component(albumComponent,ctrl.album));
        }
        // if (args.albumId) { // lodash if not undefined
        // ctrl.openAlbum(args.albumId)
        // ctrl.openAlbum(1)
        // }
    },
    view: function(ctrl,args) {
        return m('.albums-view',[
            m('#album-head', [
                m('h1', "titile"),
                m('p', "desctript")
            ]),
            m('#albums-content', [
                m('h1', "destination"),
                m('.divider'),
                m('.albums-items.row', [
                    ctrl.albums.map(function(album){
                        return albumsCard(ctrl.openAlbum,album)
                    }),
                    // ctrl.albumOpened() ? m.component(albumComponent,ctrl.album) : ''
                ])
            ]),
        ]);
    }
};

var albumsCard = function(onclick,album){
    return m('.col.s12.m6.l3',[
        m('.card-image.waves-effect',{onclick: onclick.bind(onclick,album.id)},[
            m('img.responsive-img',{src: "http://lorempicsum.com/up/400/400/6"}),
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
