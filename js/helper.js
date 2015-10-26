
// create a help delaying promise
Promise.delay = function(time){
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
module.exports = {

    // closure for easy localStorage setting
    storage: function (key) {
        return function(val){
            if(arguments.length) localStorage.setItem(key, val);
            return localStorage.getItem(key);
        }
    }

}
