// Header component
var sideLinks = [
    {title: "Home", url: "#/"},
    {title: "Albums", url: "#/albums"},
    {title: "Documentation", url: "#/doc"},
    {title: "About", url: "#/about"},
    {title: "gett2", url: "#/album/2"},
];
// m("li", {class: selected ? "active" : ""})
module.exports = {
    controller: function() {},
    view: function(ctrl) {
        return m('nav', {config: navConf}, m('.nav-wrapper', [
            m('a', { href: '#!', class: 'brand-logo center' }, 'logo'),

            m('a', { href: '#', class: 'button-collapse', 'data-activates': 'mobile-demo' }, m('i', { class: 'material-icon' }, 'menu') ),

            m('ul', { class: 'right hide-on-med-and-down'}, [
                m('li', m('a',{ href: '#/tobe' }) )
            ]),

            m('ul#mobile-demo', { class: 'side-nav fixed'},[
                sideLinks.map(function(link) {
                    return m('li', m('a', {href: link.url}, link.title));
                })
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
