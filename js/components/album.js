var progressLoader = require('../components/progressLoader');

module.exports = {
    //the Todo class has two properties

    controller: function(args) {
        args = args || {};
        var ctrl = this;
        ctrl.album = m.prop({});
        ctrl.imgs = m.prop([]);
        // ctrl.modalOpen = m.prop(false);
        ctrl.error = m.prop('');

        ctrl.id = args.id;
        // m.redraw.strategy("none");

        ctrl.openAlbum = function(id){
            // $('.album-modal').openModal();
            // ctrl.modalOpen(true);
            // m.redraw(true);
            // console.log('in redraw')
            console.log('leng',ctrl.imgs().length);
            // request
            Promise.delay(1000).then(function(){
                return {
                    imgs: [
                        {src:'kk.img'}
                    ],
                    name: 'bleejee'
                };
            }).then(function(data){
                // set album variable
                return data.imgs
            }).then(ctrl.imgs)//  set as img
            .then(function(images){
                // console.log(images)
                if(!images.length)
                    ctrl.error( 'No images were found');
                // console.log('leng',ctrl.imgs().length);
                console.log('redraw')
            }).then(m.redraw);
        }
        // window.Observable.on(["openAlbum"],function(e){
        //     console.log('openenen: ' , e);
        //     ctrl.imgs([
        //         {src:'kk.img'}
        //     ])
        //     m.redraw(1)
        //     // ctrl.openAlbum(e.id);
        // })
        // ctrl.onunload = function(){
        //     Observable.off(ctrl.openAlbum) // stop listening
        //     console.log('unloading')
        // }
        // if(!args) return ctrl.error(' No Id Specified');

        // return {}
        ctrl.openAlbum(ctrl.id)

    },
    view: function(ctrl,args) {
        // loading
        console.log('state change',ctrl);
        // console.log($('.album-modal').html())
        return m('.album-modal', {class: "modal modal-fixed-footer", config:modalOpen}, [
            m('.modal-content',[
                m('h4',"Modal Header"),
                m('p',"A bunch of text"),
                m('p',ctrl.id),
                function checkState(){
                    console.log('stt',ctrl.error())
                    // console.log('state',ctrl.error)
                    if (ctrl.error()) return errorView(ctrl.error);
                    // image view
                    else if (ctrl.imgs().length) return imgsView(ctrl.imgs);
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
// // seperate thumbTocomponent
//
var imgsView = function(images){
    // console.log('image view',images());
    // row col 3
    // each thumb - desc, like count, like btn
    // config to top fade in
    // config hide then fade in slow
    return m('h1','images');
}
var modalOpen = function(element, isInitialized, context) {
        // console.log('open modal',canOpen(),element, isInitialized, context)
    if (!isInitialized) {
      // use different modal library
      // remove all events listeneing
    //   Observable.off(["openAlbumModal"],openModal.bind(null,element));
    //   Observable.on(["openAlbumModal"],openModal.bind(null,element));
    console.log('opened')

        $(element).openModal();
      function openModal(el){
      }
        // console.log('open',element,context)
    }
    // $('.album-modal').closeModal();
};
// // row columns
// var imageCard = function(){
//     return
//
//
//
// }
var errorView = function(error){
    return m('h2', error)
}
