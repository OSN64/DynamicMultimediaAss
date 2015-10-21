var Services = require('../services');
var Storage = require('../helper').storage;
// var fbLoginComponent = require('../components/fbLogin');

module.exports = {
    //the Todo class has two properties
    controller: function() {},
    view: function() {
        return m('div', {config: parallaxConf},[
            parallaxItem({src: "images/parallax1.jpg"}),
            centerParallaxItem(),
            parallaxItem({src: "images/parallax2.jpg"}),
        ]);
    }
};
var parallaxItem = function(img){
    return m('.parallax-container',[
        m('.parallax',[
            m('img', {src: img.src})
        ])
    ]);
}
var centerParallaxItem = function(){
    return m('#main-splash.section',[
        m('.row',[
            m('.col.offset-l1.l10.s12.white.z-depth-1', [
                m('article', [
                    m('col.l2.m4.s6', [
                        m('img.responsive-img', {src: "http://www.android-kiosk.com/wp-content/themes/MaterialPress-master/images/ic_launcher.png"})
                    ]),
                    m('.splash-content', [
                        m('.col.l10.m8.s12', [
                            fbLoginComponent,
                            m('h4.grey-text.darken-2.light','hehehe')
                        ]),
                        m('.col.l10.m8.s12', [
                            // m.trust('<h4 class="grey-text darken-2 light">Kiosk Browser Lockdown</h4>'),
                            // fbLoginComponent || 'ss'
                            // m.trust('<a class="btn-floating waves-effect waves-light btn-large red"><i class="material-icons">add</i></a>'),
                            // m.trust('<h5 class="grey-text darken-2 light">ProCo Apps</h5>'),
                            // m.trust('<p><a class="waves-effect waves-light btn light-green darken-1" href="https://play.google.com/store/apps/details?id=com.procoit.kioskbrowser" rel="noreferrer"><i class="mdi-av-play-shopping-bag left"></i>Download Free</a>&nbsp;<a class="waves-effect waves-light btn teal" href="https://sites.fastspring.com/androidkiosk/instant/kioskbrowserpro&amp;tags=kioskbrowser" rel="noreferrer"><i class="mdi-action-credit-card left"></i>Buy Pro £5.00*</a><br>'),
                            // m.trust('<span style="font-size: 0.5em;">*Plus tax where applicable</span></p>'),
                            // m.trust('<p class="grey-text darken-3">Kiosk Browser has been designed for use on any android device and is great for creating public kiosks, interactive digital signage etc…. It locks down the user interface so that the end-user isn’t able to adjust Android system settings or gain access to other applications.</p>'),
                            // m.trust('<p class="grey-text darken-3">We are always adding new features, if you need something specific for your project please get in touch.</p>'),
                            // m.trust('<p><a class="waves-effect waves-light btn light-blue darken-3" href="http://www.android-kiosk.com/screenshots" rel="noreferrer"><i class="mdi-image-photo-camera left"></i>Screenshots</a></p>')
                        ])
                    ])
                ])
            ])
        ])
    ]);
}
var parallaxConf = function(el, isInit, context) {
    if (!isInit) {
        $('.parallax').parallax();
    }
};
var fbLoginComponent = {
    controller: function () {
        var error = m.prop('');
        var accessToken = Storage('accessToken');

        // check if Url Has token

        var params = Services.FB.getLoginUrlParams();

        if(params.accessToken){

            console.log('storeaccess');
            accessToken(params.accessToken); // store in local storage
            m.route('/albums');
        }
        else if (params.error){
            error(params.errorDescription) // show error
            console.log('tken error', params);
        }

        return {
            error: error,
            login: Services.FB.invokeLoginDialogue
        }
    },
    view: function (ctrl) {
        var loginBtn = m('.btn-floating.waves-effect.waves-light.btn-large.blue', {onclick: ctrl.login}, [
            m('i.fa.fa-facebook')
        ])
        return m('.btn-fb-login',loginBtn)
    }
}
