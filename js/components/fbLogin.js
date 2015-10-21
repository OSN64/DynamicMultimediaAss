var Services = require('../services');
var Storage = require('../helper').storage;

module.exports = {
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
        ]);
        return m('.btn-fb-login',loginBtn)
    }
}
