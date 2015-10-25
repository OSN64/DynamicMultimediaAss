var progressLoader = require('../components/progressLoader');
var photosComponent = require('../components/photos');
var Models = require('../models');
var Album = Models.Album;

module.exports = {

    controller: function(args) {
        args = args || {};

        var album = {
            id: args.id, // static
            name: m.prop(''),
            photos: m.prop([])
        };
        console.log('alll')
        var error = m.prop('');

        args.r = function(){
            console.log(args.id, 'child called')
        }

        var loadAlbum = function(id){
            Album.get(id)
            .then(function(iAlbum){

                album.name(iAlbum.name);
                return iAlbum.photos
            }).then(album.photos)//  set as img
            .then(function(photos){
                if(!photos.length) error( 'No photos were found');
                // console.log('redraw')
            }).then(m.redraw, function(e){
                // catch error
                console.log(e);
                error( 'No photos were found');
                m.redraw(true);
            });
        }
                m.redraw.strategy('none');

        loadAlbum(album.id);

        return {
            album: album,

            error: error
        }

    },
    view: function(ctrl,args) {
        var album = ctrl.album;
        console.log('state change',ctrl);
        return m('.album-modal', {class: "modal modal-fixed-footer", config:modalOpen}, [
            m('.modal-content',[
                m('h4', album.name()),
                function checkState(){
                    if (ctrl.error()) return errorView(ctrl.error());
                    // photos component
                    else if (album.photos().length) return m.component( photosComponent, {id: album.id, photos: album.photos()} );
                    // animated progress icon
                    else return m.component( progressLoader, {id: 'album-load-progress'} );
                }(),
            ]),
        ]);
    }
};
//
var modalOpen = function(el, isInit, ctx) {
    // ctx.retain = true;
    if (!isInit) {
        $(el).openModal();
    }
};
var errorView = function(error){
    return m('h2', error)
}
