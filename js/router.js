var splashPage = require('./pages/splash');
var albumsPage = require('./pages/albums');
var aboutPage = require('./pages/about');
var docPage = require('./pages/documentation');

var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');
var userId = Storage('userId');

// hack for fb Redirect urls
// checks if url is a fb redirect url
// if not return
// if fb url found convert to hash route url
function checkForFbRedirectUrl(location){
    var hash = location.hash;
    var currSite = location.origin;

    var isFbUrl = location.href.indexOf(currSite + '/?') == 0; // if this is the first substring in the url

    if(!isFbUrl) return;

    if(hash[0] == "#") hash = hash.substr(1); // remove first hash

    var hashArr = hash.split('&');

    // split hash to array of objects
    hashArr = hashArr.map(function(hashItem){
        var itemSplit = hashItem.split('=');
        return {
            key: itemSplit[0],
            value: itemSplit[1]
        }
    });

    var URL = currSite + '/#'; // hash for hash routing
    URL += settings.loginRedirectRoute;

    hashArr.forEach(function(item){
        var urlParam = '/' + item.key + '/' + item.value;
        URL += urlParam;
    });

    return URL;
}

// check if fb url found then change route
var parsedUrl = checkForFbRedirectUrl(window.location)
if (parsedUrl) return window.location.replace(parsedUrl);

// function for logging the user out
var logOutComponent = {
    controller: function () {
        // clear stored values
        accessToken('');
        userId('');

        m.route('/')
    }
}


m.route.mode = "hash";
m.route( $('main')[0], '/', {
    // fb routes
    '/fbLogin/access_token/:accToken/expires_in/:exp/code/:code' : splashPage,
    // error route
    '/fbLogin/error_reason/:errorReason/error/:error/error_description/:errorDesc' : splashPage,

    '/' : splashPage,
    '/logout' : logOutComponent,

    '/albums' : albumsPage,
    '/album/:id' : albumsPage,
    '/doc': docPage,
    '/about': aboutPage
});
