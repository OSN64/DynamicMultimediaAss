var progressLoader = require('../components/progressLoader');
var Models = require('../models');
var Albums = Models.Albums;

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

        var openAlbum = function(id){
            Albums.get(id)
            .then(function(iAlbum){

                album.name(iAlbum.name);
                return iAlbum.photos
            }).then(album.photos)//  set as img
            .then(function(photos){

                console.log(photos)
                if(!photos.length)
                    error( 'No photos were found');
                console.log('leng',photos.length);
                console.log('redraw')

            }).then(m.redraw);
        }

        openAlbum(album.id);

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
                    if (ctrl.error()) return errorView(ctrl.error);
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
// // seperate thumbTocomponent
var photosComponent = {
    controller: function (args) {
        args = args || {};
        var photos = m.prop(args.photos);

        return {
            photos: photos
        }
    },
    view: function(ctrl){
        var openLightboxPhoto = function(photo){
            console.log('open lightbox', photo);
        }
        // console.log('image view',images());
        // row col 3
        // each thumb - desc, like count, like btn
        // config to top fade in
        // config hide then fade in slow
        return m('.photos.row', [
            ctrl.photos().map(function(photo){
                return photoCard(openLightboxPhoto,photo)
            }),
        ]);
    }
}
// // row columns
var photoCard = function(onclick,photo){
    // console.log(photo)
    return ('.col.s12.m3.l3',[
        m('.card-image.waves-effect', {onclick: onclick.bind(onclick,photo)}, [
            m('img.responsive-img',{src: photo.thumbSrc, style: { width: '200px' }}),
            m('span.card-title',photo.description + ' Likes: ' + photo.like.count)
        ])
    ]);
}
