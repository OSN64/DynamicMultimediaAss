
module.exports = {
    //the Todo class has two properties
    controller: function() {},
    view: function() {
        return m('.container', [
            m('h1', 'About'),
            m('blockquote', [
                m('p', 'By: Enoch Onamusi'),
                m('p', 'Student No: s2878369'),
                m('a', {href: 'http://travel.techthrones.com'}, 'http://travel.techthrones.com')
            ])
        ]);
    }
};
