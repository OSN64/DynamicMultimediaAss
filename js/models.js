// api key
var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');

var graphApiBaseUrl = "https://graph.facebook.com/v2.5";
var graphPageUrl = graphApiBaseUrl + '/' + settings.pageId

module.exports = {

    Page: {
        getDetails: function(){
            var params = "?fields=description,name&access_token=" + accessToken();
            var url = graphPageUrl + params;

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            });
        },

        getVisitorsPosts: function(){

            var params = "/feed?fields=likes{name},story,message&access_token=" + accessToken();
            var url = graphPageUrl + params;

            // request gets page feed
            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(function(d){
                return d.data;
            }).then(filterByNoStoryField)
            .then(filterByLikedUser.bind(null, settings.adminUid))
            .then(function(fin){
                console.log('visitors posts',fin)
            });

        }
    },
    // page Albums
    Albums: {
        list: function(){
            var params = "?fields=albums{location,name,likes,cover_photo}&access_token=" + accessToken();
            var url = graphPageUrl + params;

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                 // to json cast or not to cast
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(function(d){
                return d.albums.data;
            })
            .then(filterByAulocation)
            .then(getCoverPhotos)
            .then(sortByLikesDesc)
            .then(formatEachAlbum);
            // .then(printEach)
        },

        get: function(id){
            var params = "?fields=photos{images,likes,name},name&access_token=" + accessToken();
            var url = graphApiBaseUrl + '/' + id + params;

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                 // to json cast or not to cast
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(formatPhotos);
        }
    }
}

var getCoverSrc = function(coverId){
    var params = "?fields=source&access_token=" + accessToken();
    var url = graphApiBaseUrl + '/' + coverId + params;

    return m.request({
        method: "GET",
        url: url,
        background: true, // dont affect rendering (Mithril)
         // to json cast or not to cast
        unwrapError: function(response) {
            return response.error;
        }
    }).then(function(data){
        return data.source;
    })
}
function filterByAulocation(data){
    return data.filter(function(al){
        var loc = al.location || '';
        return loc.toLowerCase().indexOf('australia') >= 0;
    })
}
function getCoverPhotos(albums){
    albums = albums.map(function (album) {
        return getCoverSrc(album.cover_photo.id).then(function(coverSource){
            album.coverSource = coverSource;
            return album;
        });
    });
    return Promise.all(albums);
}
function sortByLikesDesc(data){
    return data.sort(function(a,b){
        var prevLikes = a.likes.data.length;
        var nextLikes = b.likes.data.length;
        return prevLikes < nextLikes;
    });
}

function printEach(data){
    return data.forEach(function(al){
        console.log(al)
    });
    // console.log(data)
}
function formatEachAlbum(data){
    return data.map(function(al){
        return {
            id: al.id,
            name: al.name,
            coverSource: al.coverSource,
            likes: al.likes.data
        }
    })
}

function getImageByHeightLargest(data){
    return data.sort(function(a,b){
        var prevHeight = a.height;
        var nextHeight = b.height;
        return prevHeight < nextHeight;
    })[0];
}
function getImageByHeight(images,height){
    return images.filter(function(image){
        return image.height == height;
    })[0] || images[images.length - 1];
}
function formatPhotos(data){
    data.photos = data.photos.data.map(function (photo) {

        return {
            id: photo.id,
            description: photo.name,
            thumbSrc: getImageByHeight(photo.images, 320).source,
            lgSrc: getImageByHeightLargest(photo.images).source,
            like: {
                count: photo.likes.data.length, // get num of likes
                users: photo.likes.data
            }
        };
    });
    return data;
}

function filterByNoStoryField(items){
    return items.filter(function(items){
        return !items.story;
    });
}

function filterByLikedUser(uId,items){
    return items.filter(function(item){
        var likes = item.likes || {data: []};

        return likes.data.filter(function(user){
            return user.id == uId;
        }).length;
    });
}
