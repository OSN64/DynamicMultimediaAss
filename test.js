
var data = {
  "data": [
  ],
}
var Promise = require('bluebird');

function printEach(data){
    return data.forEach(function(al){
        console.log(al)
    })
}
function getImageByHeightLargest(data){
    return data.sort(function(a,b){
        var prevHeight = a.height;
        var nextHeight = b.height;
        return prevHeight < nextHeight;
    })[0];
}
function formatPhotos(data){
    data.photos = data.photos.data.map(function (photo) {

        return {
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
Promise.resolve(data)
.then(function(d){
    return d.data;
})
.then(filterByNoStoryField)
.then(filterByLikedUser.bind(null,'2342423423'))

.then(function(fin){
    console.log(fin,fin.length)
});
