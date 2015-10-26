var Models = require('../models');
var Storage = require('../helper').storage;
var userId = Storage('userId');
var Photo = Models.Photo;

module.exports = {
    controller: function (args) {

        var photos = {};

        // convert array to hash map
        var photosHash = args.photos.reduce(function(map, photo) { // does it call the last value

            map[photo.id] = {
                id: photo.id,
                description: photo.description,
                lgSrc: photo.lgSrc,
                thumbSrc: photo.thumbSrc,

                // non static variables
                likeCount: m.prop(photo.like.count),
                likedByUser: m.prop(isLikedBy(photo.like.users,userId()))
            };
            return map;
        }, {});

        // request like to be toggled
        function toggleLike(photo){
            var Liked = photosHash[photo.id].likedByUser;
            var likeCount = photosHash[photo.id].likeCount;

            Photo.toggleLike(photo)
            .then(Liked) // set value
            .then(function(like){
                if(like) likeCount(likeCount() + 1)
                else likeCount(likeCount() - 1)
            }).then(m.redraw);
        }

        return {
            listId: args.id,
            photosHash: photosHash,
            toggleLike: toggleLike
        }
    },

    view: function(ctrl){
        return m('.photos.row', [
            Object.keys(ctrl.photosHash).map(function(key){
                var photo = ctrl.photosHash[key];
                return photoCard(ctrl.listId, photo, ctrl.toggleLike)
            }),
        ]);
    }
}

// check if user id is in array
function isLikedBy (likesArr,userId){
    return likesArr.filter(function(user){
        return user.id == userId;
    }).length;
}

// // row columns
var photoCard = function(listId, photo, onLikeClick){

    return m('.col.s12.m6.l4',[
        m(".card.card-photo.hoverable", [
            m(".card-image.waves-effect.waves-block.waves-light", [
                m('a', { href: photo.lgSrc, 'data-lightbox': 'album-' + listId , 'data-title': photo.description }, [
                    m("img.responsive-img.image-load", { config: loadImage, src: photo.thumbSrc, style: { height: '320px' } } ),
                ]),
                m("a.btn-fb-like.btn-floating.waves-effect.waves-light.btn-large", { onclick: onLikeClick.bind(null,photo), class: photo.likedByUser() ? 'blue' : '' } , [
                    m("i.material-icons", "thumbs_up_down")
                ]),
                m('.chip.chip-likes', photo.likeCount() + ' Likes'),
                m("span.card-title", photo.description || '')
            ])
        ])
    ]);
}

// mithril config, when image loads add class
var loadImage = function (el,isInit,ctx) {
    if(!isInit){
        $(el).load(function(){
            $(el).addClass('opacity-one');
        });
    }
}
