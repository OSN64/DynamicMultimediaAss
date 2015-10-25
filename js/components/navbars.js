// Header component
var sideLinks = [ // static
    {title: "Home", url: "/"},
    {title: "Albums", url: "/albums"},
    {title: "Documentation", url: "/doc"},
    {title: "About", url: "/about"},
];

var Storage = require('../helper').storage;
var userId = Storage('userId');
var userName = Storage('userName');

module.exports = {
    controller: function() {
        m.redraw.strategy("diff");
    },
    view: function(ctrl) {
        // get current route
        var currRoute = m.route();

        return m('nav', {config: navConf}, m('.nav-wrapper', [

            m('a', { href: '#', class: 'button-collapse', 'data-activates': 'mobile-demo' }, m('i', { class: 'material-icon' }, 'menu') ),


            m("ul.right.hide-on-med-and-down", [
        		m("li", [
                    userId() ? m('a',{ href: '/logout', config: m.route }, userName() + ' Log Out') : ''
                ]),
        	]),

            m('ul#mobile-demo', { class: 'side-nav fixed'},[
                sideLinks.map(function(link) {
                    var isActiveRoute = (currRoute == link.url ? 'active' : '');
                    
                    return m('li', { class: isActiveRoute }, [
                        m('a', { href: link.url, config: m.route }, link.title)
                    ]);
                }),

            ])
        ]));
    }
}

var navConf = function(element, isInitialized, context) {
    if (!isInitialized) {
        $('.button-collapse').sideNav({
            'edge': 'left',
            // closeOnClick: true
        });
    }
};
