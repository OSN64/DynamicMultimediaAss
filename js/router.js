var splashPage = require('./pages/splash');
var albumsPage = require('./pages/albums');

var settings = require('./settings');


// hack for fb Redirect urls
// checks if url is a fb redirect url
// if not return
// if fb url found convert to hash route url
function checkForFbRedirectUrl(location){
    var hash = location.hash;
    var currSite = location.origin;

    var isFbUrl = location.href.indexOf(currSite + '/?#') == 0; // if this is the first substring in the url

    // console.log(isFbUrl,currSite,hash)

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

    // console.log(hashArr);

    // generate output url

    var URL = currSite + '/#'; // hash for hash routing
    URL += settings.loginRedirectRoute;

    hashArr.forEach(function(item){
        var urlParam = '/' + item.key + '/' + item.value;
        URL += urlParam;
    });


    return URL;
}

var parsedUrl = checkForFbRedirectUrl(window.location)
if (parsedUrl) return window.location.replace(parsedUrl); // if found change route


m.route.mode = "hash";
m.route( $('main')[0], '/', {
    // fb routes
    '/fbLogin/access_token/:accToken/expires_in/:exp/code/:code' : splashPage,
    // error route
    '/fbLogin/error_reason/:errorReason/error/:error/error_description/:errorDesc' : splashPage,


    '/' : splashPage,


    '/albums' : albumsPage,
    '/album/:id' : albumsPage,
    // '/about': function(){}
});


// another router for footer
