var progressLoader = require('./components/progressLoader');

module.exports = {
    animateNextRoute: function(promises,cb){
        // start progress
        $('main').html('');
        var pageContainer = $('main')[0];

        $('main').fadeOut('fast',function(){
            m.mount(pageContainer,m.component( progressLoader, {id: 'page-load-progress'} ));

            $('main').fadeIn('fast')
        })

        promises.push(Promise.delay(2000));

        return Promise.all(promises)
        .then(function(data){

            $('main').hide();
            $('main').fadeIn('slow');

            m.mount(pageContainer,null);
            data.pop();

            return data;
        });
    }
}
