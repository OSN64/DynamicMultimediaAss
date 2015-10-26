// api key
var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');

var graphApiBaseUrl = "https://graph.facebook.com/v2.5";
var graphPageUrl = graphApiBaseUrl + '/' + settings.pageId;

module.exports = {

    Page: {
        // request page details
        getDetails: function(){
            var url = graphPageUrl + "?fields=description,name&access_token=" + accessToken();

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            });
        },
        // request array of feed posts
        getVisitorsPosts: function(){

            var url = graphPageUrl + "/feed?fields=likes{name},story,message&access_token=" + accessToken();

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
            .then(getUserLikedPosts.bind(null, settings.adminUid));
        }
    },
    // page Albums
    Album: {
        getAll: function(){
            var url = graphPageUrl + "?fields=albums{location,name,likes,cover_photo}&access_token=" + accessToken();

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
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
        },

        get: function(id){
            var url = graphApiBaseUrl + '/' + id + "?fields=photos{images,likes,name},name&access_token=" + accessToken();

            return m.request({
                method: "GET",
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(formatPhotos);
        }
    },

    Photo: { // photo
        toggleLike: function(photo){ // give photo // toggle like
            var url = graphApiBaseUrl + '/' + photo.id + '/likes?access_token=' + accessToken();

            // like or unlike
            var method = (!photo.likedByUser() ? 'POST': 'DELETE');

            return m.request({
                method: method,
                url: url,
                background: true, // dont affect rendering (Mithril)
                unwrapError: function(response) {
                    return response.error;
                }
            }).then(function(data){
               return !photo.likedByUser();
            });

        }
    }
}
// request cover image source
var getCoverSrc = function(coverId){
    var url = graphApiBaseUrl + '/' + coverId + "?fields=source&access_token=" + accessToken();

    return m.request({
        method: "GET",
        url: url,
        background: true, // dont affect rendering (Mithril)
        unwrapError: function(response) {
            return response.error;
        }
    }).then(function(data){
        return data.source;
    })
}
// Filter array by existance of the location string australia
function filterByAulocation(data){
    return data.filter(function(al){
        var loc = al.location || '';
        return loc.toLowerCase().indexOf('australia') >= 0;
    });
}
// for each album populate with cover souce
function getCoverPhotos(albums){
    albums = albums.map(function (album) {
        return getCoverSrc(album.cover_photo.id).then(function(coverSource){
            album.coverSource = coverSource;
            return album;
        });
    });
    return Promise.all(albums);
}
// sort array of liked from biggest to smallest
function sortByLikesDesc(data){
    return data.sort(function(a,b){
        var prevLikes = a.likes.data.length;
        var nextLikes = b.likes.data.length;

        return nextLikes - prevLikes;
    });
}
// return formated data
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
    return images.filter(function(image){ // reduce
        return image.height == height;
    })[0] || images[images.length - 1];
}
// generate formated data with photos
function formatPhotos(data){
    data.photos = data.photos.data.map(function (photo) {

        return {
            id: photo.id,
            description: photo.name,
            thumbSrc: getImageByHeight(photo.images, 320).source,
            lgSrc: getImageByHeightLargest(photo.images).source,
            like: {
                count: photo.likes.data.length, // get num of likes
                users: photo.likes.data // might not need this
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

function getUserLikedPosts(uId,posts){
    return posts.filter(function(post){
        var likes = post.likes || {data: []};
        return isLikedBy(likes.data,uId);
    });
}
// check if array of users has user id
function isLikedBy (likesArr,userId){
    return likesArr.filter(function(user){
        return user.id == userId;
    }).length;
}
