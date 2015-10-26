var circle = m('.circle');
module.exports = {
    controller: function(args){
        this.id = args.id || '';
    },
    view: function(ctrl,args){
        return m('.preloader-wrapper', { id: ctrl.id, class: "big active" },[
            m('.spinner-layer.spinner-blue-only',[
                m('.circle-clipper.left',circle),
                m('.gap-patch',circle),
                m('.circle-clipper.right',circle)
            ])
        ]);
    }
}
