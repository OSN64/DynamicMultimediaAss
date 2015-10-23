var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');
var userId = Storage('userId');
var userName = Storage('userName');

var fbBaseUrl = "https://www.facebook.com";

module.exports = {
    FB: {
        getLoginUrl: function(){
            var url = fbBaseUrl + "/dialog/oauth?client_id=" + settings.appId +
            "&response_type=code token" +
            "&scope=publish_actions" +
            "&redirect_uri=" + settings.url;

            return url;
        },
        getLoginUrlParams: function(){

            return {
                errorReason: m.route.param("errorReason"),
                errorDescription: m.route.param("errorDesc"),
                error: m.route.param("error"),

                accessToken: m.route.param("accToken"),
                // tokenExpiry: m.route.param("exp"),
                // code: m.route.param("code")
            }
        },
        isLoggedIn: function(){
            var url = "https://graph.facebook.com/me?access_token=" + accessToken();

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(function(data){
                userId(data.id);
                userName(data.name);

                return !!data.id;
            })
        },

        // next

    },

    Popup: function (args,cb) {
        var toastContent = (args.text || 'alert');
        return Materialize.toast(toastContent, args.timeout || 5000, args.class || '',cb);
    }
    // https://github.com/rstacruz/nprogress

    // popup service
    // https://github.com/CodeSeven/toastr
    // or http://fezvrasta.github.io/snackbarjs/
}
