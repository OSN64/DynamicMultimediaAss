Promise.delay = function(time){
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
module.exports = {
    Observable:  function() {
        var channels = {}
        return {
            register: function(subscriptions, controller) {
                return function self() {
                    var ctrl = new controller
                    var reload = controller.bind(ctrl)
                    Observable.on(subscriptions, reload)
                    ctrl.onunload = function() {
                        Observable.off(reload)
                    }
                    return ctrl
                }
            },
            on: function(subscriptions, callback) {
                subscriptions.forEach(function(subscription) {
                    if (!channels[subscription]) channels[subscription] = []
                    channels[subscription].push(callback)
                })
            },
            off: function(callback) {
                for (var channel in channels) {
                    var index = channels[channel].indexOf(callback)
                    if (index > -1) channels[channel].splice(index, 1)
                }
            },
            trigger: function(channel, args) {
                // console.log(channel)
                channels[channel].map(function(callback) {
                    callback(args)
                })
            }
        }
    },

    // closure for easy localStorage setting
    storage: function (key) {
        return function(val){
            if(arguments.length) localStorage.setItem(key, val);
            return localStorage.getItem(key);
        }
    }

}
