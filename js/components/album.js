var progressLoader = require('../components/progressLoader');

module.exports = {
    //the Todo class has two properties
    controller: function(args) {
        var ctrl = this;
        ctrl.id = args.id;
        // ctrl.album = m.prop({});
        ctrl.imgs = m.prop([]);
        ctrl.error = '';
        // m.redraw.strategy("none")
        ctrl.getAlbum = function(id){
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
                if(_.isEmpty(images))
                    ctrl.error = 'No images were found';
                // console.log('leng',ctrl.imgs().length);
                console.log('redraw')
            }).then(m.redraw);
        }
        ctrl.getAlbum(ctrl.id)
    },
    view: function(ctrl,args) {
        // loading
        console.log('state change')
        // console.log($('.album-modal').html())
        return m('.album-modal', {class: "modal modal-fixed-footer", config:modalOpen}, [
            m('.modal-content',[
                m('h4',"Modal Header"),
                m('p',"A bunch of text"),
                m('p',ctrl.id),
                function checkState(){
                    // console.log('state',ctrl.error)
                    if (!_.isEmpty(ctrl.error)) return errorView(ctrl.error);
                    // image view
                    else if (!_.isEmpty(ctrl.imgs())) return imgsView(ctrl.imgs);
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
// seperate thumbTocomponent

var imgsView = function(images){
    // console.log('image view',images());
    // row col 3
    // each thumb - desc, like count, like btn
    // config to top fade in
    // config hide then fade in slow
    return m('h1','images');
}
var modalOpen = function(element, isInitialized, context) {
    if (!isInitialized) {
        $(element).openModal();
        // console.log('open',element,context)
        console.log('open modal')
    }
    // $('.album-modal').closeModal();
};
// row columns
var imageCard = function(){
    return



}
var errorView = function(error){
    return m('h2', error)
}
