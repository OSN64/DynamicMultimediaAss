// api key
module.exports = {
    Todo: function(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    },
    TodoList: Array,
    list: function(){
        var list =[];
        for (var i = 0; i < 20; i++) {
            list[i] = {
                id:i,
                name: 'blash'
            }
        }
        return Promise.delay(2000).then(function(){return list});
    }
}
// console.log(this)
