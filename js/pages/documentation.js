var firstText = "In with this web site i have utilised some design principles. The main design principles focused on this website are proximity, repitition, alignment and interactivity.";
var secondText = "The use of proximity and alignment can be seen on the gallery page as each image has been spaced and do not touch each other, whilst being visable to the user.";
var thirdText = "Repitition is also used within the site in terms of the colours used. The base color which is the color of the top nav bar is used in multiple places such as the like button and the feed section. Making the  user familiar with the color is one way of keeping them focused on the content.";
var fourthText = "By using interactivity allow the user to experience the flow of information and bring a sense of commoness to the site. A major example of this is the loading animation that are shown on page transition and the fade in effect when images load.";

module.exports = {
    controller: function() {},
    view: function() {
        return m('.container', [
            m('h2', 'Documentation'),
            m('blockquote',firstText),

            m('h3','Proximity & alignment'),
            m('blockquote',secondText),

            m('h3','Repitition'),
            m('blockquote',thirdText),

            m('h3', 'Interactivity'),
            m('blockquote',fourthText)
        ]);
    }
};
var blockquote = function (text) {
    return m('blockquote',text)
}
