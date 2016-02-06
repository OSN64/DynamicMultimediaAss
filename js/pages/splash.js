var fbLoginComponent = require('../components/fbLogin');

module.exports = {
    //the Todo class has two properties
    controller: function() {},
    view: function() {
        return m('#main-splash',[
            m(".row", [
                m(".col.s12.m6", [
                    m(".card.blue-grey.darken-1", [
                        m(".card-content.white-text", [
                            m("span.card-title", "Welcome Travellers to DMS Travel"),
                            m("p", "To Continue Please login to FaceBook via the button above")
                        ]),
                        m(".card-action", [
                            fbLoginComponent
                        ])
                    ])
                ])
            ]),
            m('#crab-anim', [
                m('img', {src: 'images/crab.png'})
            ])
        ]);
    }
};
