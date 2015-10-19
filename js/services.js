var settings = window.app;
module.exports = {
    FB: {
        invokeLoginDialogue: function(){
            var url = "https://www.facebook.com/dialog/oauth?client_id=" + settings.appId + "&redirect_uri=" + settings.urlLoginRedirect
            window.open(url);
        }
    }
}
