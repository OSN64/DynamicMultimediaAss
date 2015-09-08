var progressLoader = require('../components/progressLoader');

module.exports = {
    //the Todo class has two properties
    controller: function(args) {
        var ctrl = this;
        ctrl.id = args.current;
        // ctrl.album = m.prop({});
        ctrl.imgs = m.prop([]);
        ctrl.error = '';

        ctrl.getAlbum = function(id){
            console.log('leng',ctrl.imgs().length);
            // request
            return Promise.delay(3000).then(function(){
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
                console.log(images)
                if(_.isEmpty(images))
                    ctrl.error = 'No images were found';
                console.log('leng',ctrl.imgs().length);
            }).then(m.redraw);
        }
        ctrl.getAlbum(ctrl.id)
    },
    view: function(ctrl,args) {
        // if (ctrl.invalidId) return m('div');
        // loading
        return m('.album-modal', {class: "modal modal-fixed-footer", config:modalOpen}, [
            m('.modal-content',[
                m('h4',"Modal Header"),
                m('p',"A bunch of text"),
                m('p',ctrl.id),
                function checkState(){
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
    console.log('image view',images());
    // row col 3
    // each thumb - desc, like count, like btn
    // config to top fade in
    return m('h1','images');
}
var modalOpen = function(element, isInitialized, context) {
    if (!isInitialized) {
        $(element).openModal();
        console.log('open',element,context)
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
