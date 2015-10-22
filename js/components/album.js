var progressLoader = require('../components/progressLoader');
var photosComponent = require('../components/photos');
var Models = require('../models');
var Album = Models.Album;

module.exports = {
    //the Todo class has two properties

    controller: function(args) {
        args = args || {};

        var album = {
            id: args.id, // static
            name: m.prop(''),
            photos: m.prop([])
        };

        // ctrl.modalOpen = m.prop(false);
        var error = m.prop('');

        // m.redraw.strategy("none");

        var loadAlbum = function(id){
            Album.get(id)
            .then(function(iAlbum){

                album.name(iAlbum.name);
                return iAlbum.photos
            }).then(album.photos)//  set as img
            .then(function(photos){
                if(!photos.length) error( 'No photos were found');
                console.log('redraw')
            }).then(m.redraw, function(e){
                // catch error
                console.log(e);
                error( 'No photos were found');
                m.redraw(true);
            });
        }

        loadAlbum(album.id);

        return {
            album: album,

            error: error
        }

    },
    view: function(ctrl,args) {
        var album = ctrl.album;

        // loading
        console.log('state change',ctrl);
        return m('.album-modal', {class: "modal modal-fixed-footer", config:modalOpen}, [
            m('.modal-content',[
                m('h4', album.name()),
                function checkState(){
                    console.log('stt',ctrl.error())
                    if (ctrl.error()) return errorView(ctrl.error());
                    // photos component
                    else if (album.photos().length) return m.component( photosComponent, {photos: album.photos()} );
                    // animated progress icon
                    else return m.component( progressLoader, {id: 'album-load-progress'} );
                }(),
            ]),
            m('.modal-footer',[
                m('button',{class: "modal-action modal-close waves-effect waves-green btn-flat"}, "Agree")
            ])
        ]);
    }
};
//
var modalOpen = function(element, isInitialized, context) {
    if (!isInitialized) {
        $(element).openModal();
    }
};
var errorView = function(error){
    return m('h2', error)
}
