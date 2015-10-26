var Services = require('../services');
var Storage = require('../helper').storage;

module.exports = {
    controller: function () {
        var error = m.prop('');
        var accessToken = Storage('accessToken');

        // check if Url Has token
        var params = Services.FB.getLoginUrlParams();

        if(params.accessToken){

            accessToken(params.accessToken); // store in local storage
            m.route('/albums');
        }
        else if (params.error){
            error(params.errorDescription) // show error
            // popup unable to Authenticate
        }

        function openLoginDialogue(){
            var url = Services.FB.getLoginUrl();
            window.location.replace(url)
        }

        return {
            error: error,
            openLogin: openLoginDialogue
        }
    },

    view: function (ctrl) {
        var loginBtn = m('.btn-floating.waves-effect.waves-light.btn-large.blue', {onclick: ctrl.openLogin}, [
            m('i.fa.fa-facebook')
        ]);
        return m('.btn-fb-login',loginBtn)
    }
}
