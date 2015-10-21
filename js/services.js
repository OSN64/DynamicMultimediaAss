var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');
var userId = Storage('userId');

var fbBaseUrl = "https://www.facebook.com";

module.exports = {
    FB: {
        invokeLoginDialogue: function(){
            var url = fbBaseUrl + "/dialog/oauth?client_id=" + settings.appId +
            "&response_type=code token" +
            "&redirect_uri=" + settings.url;

            console.log(url)

            window.open(url); // replace current url instead of this
        },
        getLoginUrlParams: function(){

            return {
                errorReason: m.route.param("errorReason"),
                errorDescription: m.route.param("errorDesc"),
                error: m.route.param("error"),

                accessToken: m.route.param("accToken"),
                tokenExpiry: m.route.param("exp"),
                code: m.route.param("code")
            }
        },
        checkTokenValid: function(){
            var url = "https://graph.facebook.com/debug_token?input_token=" + accessToken();
            url = url + "&access_token=" + accessToken();
            // console.log('check Token', url)

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapSuccess: function(response) {
                    return response.data;
                },
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(function(data){
                userId(data.user_id);

                return data.is_valid;
            })
        },

        // next

    }
    // popup service
}
