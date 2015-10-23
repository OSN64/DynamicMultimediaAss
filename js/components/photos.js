var Models = require('../models');
var Storage = require('../helper').storage;
var userId = Storage('userId');
var Picture = Models.Picture;
var lightbox = window.lity();


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
                likedByUser: m.prop(hasUserId(photo.like.users,userId()))
            };
            return map;
        }, {});

        function likeOrUnlike(photo){
            var Liked = photosHash[photo.id].likedByUser;
            var likeCount = photosHash[photo.id].likeCount;

            Picture.like(photo.id,!Liked()).then(function(like){

                if(like) likeCount(likeCount() + 1)
                else likeCount(likeCount() - 1)

                Liked(like); // set val

            }).then(m.redraw);

            // model photo like
            // likeCount(likeCount() + 1);
            // Liked(!Liked());
            // m.redraw(true);
        }

        return {
            photosHash: photosHash,
            likeOrUnlike: likeOrUnlike
        }
    },

    view: function(ctrl){
        var openLightboxPhoto = function(photo){
            console.log('open lightbox', photo);
            lightbox(photo.lgSrc)
        }
        // config to top fade in
        // config hide then fade in slow
        return m('.photos.row', [
            Object.keys(ctrl.photosHash).map(function(key){
                var photo = ctrl.photosHash[key];
                return photoCard(openLightboxPhoto, ctrl.likeOrUnlike, photo)
            }),
        ]);
    }
}

function hasUserId (users,userId){
    return users.filter(function(user){
        return user.id == userId;
    })[0] ? true : false;
}

// // row columns
var photoCard = function(onCardClick, onLikeClick, photo){
    // console.log(photo.likedByUser()) // width: '200px'
    // onLikeClick.bind(null,photo.id, !photo.likedByUser)
    //  <i class="small material-icons">thumb_up</i>
    return m('.col.s12.m6.l4',[
        m(".card.card-photo.hoverable", [
    		m(".card-image.waves-effect.waves-block.waves-light", [
    			m("img.responsive-img", {src: photo.thumbSrc, style: { height: '320px' }, onclick: onCardClick.bind(null,photo)}),
                m("a.btn-fb-like.btn-floating.waves-effect.waves-light.btn-large", { onclick: onLikeClick.bind(null,photo), class: photo.likedByUser() ? 'blue' : '' } , [
                    m("i.material-icons", "thumbs_up_down")
                ]),
                m('.chip.chip-likes', photo.likeCount() + ' Likes'),
                m("span.card-title", photo.description) // use content or this for desc
    		]),
    		// m(".card-content", [
    		// 	m("p", photo.description)
    		// ]),
    		// m(".card-action", [
    		// 	m("a[href='#']", ' Likes: ' + photo.likeCount())
    		// ])
    	])
    ]);
}
