var Storage = require('../helper').storage;
var userId = Storage('userId');
var lightbox = window.lity();


module.exports = {
    controller: function (args) {

        var photos = {};

        // convert array to hash map
        var photosHash = args.photos.reduce(function(map, photo) {

            map[photo.id] = {
                id: photo.id,
                description: photo.description,
                lgSrc: photo.lgSrc,
                thumbSrc: photo.thumbSrc,

                // non static variables
                likeCount: m.prop(photo.like.count),
                likedByUser: m.prop(hasUserId(photo.like.users,userId))
            };
            return map;
        }, {});

        function likeOrUnlike(photo){
            var Liked = photosHash[photo.id].likedByUser;
            var pLikeCount = photosHash[photo.id].likeCount;
            // model photo like
            pLikeCount(pLikeCount() + 1);
            Liked(!Liked());
            m.redraw(true);
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
        m(".card.card-photo", [
    		m(".card-image.waves-effect.waves-block.waves-light", [
    			m("img.responsive-img", {src: photo.thumbSrc, style: { height: '320px' }, onclick: onCardClick.bind(null,photo)}),
                m("a.btn-fb-like.btn-floating.waves-effect.waves-light.btn-large", { onclick: onLikeClick.bind(null,photo), class: photo.likedByUser() ? 'blue' : '' } , [
                    m("i.material-icons", "thumbs_up_down")
                ]),
                // m("span.card-title", photo.description) // use content or this for desc
    		]),
            m('span.badge', photo.likeCount() + ' Likes'),
    		m(".card-content", [
    			m("p", photo.description)
    		]),
    		// m(".card-action", [
    		// 	m("a[href='#']", ' Likes: ' + photo.likeCount())
    		// ])
    	])

        // m('.card', [
        //     m('.card-image.waves-effect.waves-block.waves-light', {onclick: onCardClick.bind(null,photo)}, [
        //         m('img.responsive-img',{src: photo.thumbSrc, style: { height: '320px' }}),
        //         // m('span.card-title', + ' Likes: ' + photo.likeCount())
        //     ]),
        //     m('.card-content',[
        //         m('span.card-title.activator.grey-text.text-darken-4', photo.description)
        //     ])
        // ])
    ]);
}
