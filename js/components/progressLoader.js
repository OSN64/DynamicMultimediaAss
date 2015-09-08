var circle = m('.circle');
module.exports = {
    controller: function(args){
        // console.log(args)
        this.id = args.id || '';
        // var classes =
        // this.class = classes.join(' ')
        // ability to run function that sets class active
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
