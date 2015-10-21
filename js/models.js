// api key
var settings = require('./settings');
var Storage = require('./helper').storage;
var accessToken = Storage('accessToken');

var graphApiBaseUrl = "https://graph.facebook.com/v2.5";
var graphPageUrl = graphApiBaseUrl + '/815157038515764'

// "?fields=description,name&access_token="

module.exports = {
    Todo: function(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    },
    TodoList: Array,

    Page: {
        getDetails: function(){
            // return m.request
            var params = '?fields=description,name&access_token=' + accessToken();
            var url = graphPageUrl + params;

            // return m.request({
            //     method: "GET",
            //     url: url,
            //     background: true, // dont affect rendering (Mithril)
            //      // to json cast or not to cast
            //     unwrapError: function(response) {
            //         return response.error;
            //     }
            // });

            return Promise.delay(2000).then(function(){
                return {
                    "description": "ated services r, hotel accommavel experience.",
                    "name": "DMS Travel",
                    "id": "815157038515764",
                };
            });
        }
    },
    // page Albums
    // Album
    Albums: {
        list: function(){
            var list =[];
            for (var i = 0; i < 20; i++) {
                list[i] = {
                    id:i,
                    name: 'blash'
                }
            }
            var params = "?fields=albums{location,name,likes,cover_photo}";


            return Promise.delay(2000).then(function(){return list});

        },
    }

}
var onlyAustralia;


var Alll = {
  "albums": {
    "data": [
      {
        "location": "Brisbane, Australia",
        "name": "Brisbane",
        "likes": {
          "data": [
            {
              "id": "10153375099648773",
              "name": "Brendan Ta"
            },
            {
              "id": "10205274627294212",
              "name": "Thomas Mcdonald"
            },
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            },
            {
              "id": "10208111836623779",
              "name": "Tim Bosch"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MTAxNTMzNzUwOTk2NDg3NzMZD",
              "after": "MTAyMDgxMTE4MzY2MjM3NzkZD"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-08-28T05:54:13+0000",
          "name": "Brisbane city",
          "id": "816505061714295"
        },
        "id": "816520808379387"
      },
      {
        "location": "Gold Coast, Queensland, Australia",
        "name": "Gold Coast",
        "likes": {
          "data": [
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            },
            {
              "id": "10208111836623779",
              "name": "Tim Bosch"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MTAyMDgyMzA5MTQ5MTY0NDMZD",
              "after": "MTAyMDgxMTE4MzY2MjM3NzkZD"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-08-28T07:00:32+0000",
          "name": "Gold Coast convention center",
          "id": "816516625046472"
        },
        "id": "816504545047680"
      },
      {
        "location": "Passau, Germany",
        "name": "Passau",
        "likes": {
          "data": [
            {
              "id": "10207578300633201",
              "name": "Katie Stevens"
            },
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            },
            {
              "id": "10207595544106887",
              "name": "Mitchell Ryan"
            },
            {
              "id": "10208111836623779",
              "name": "Tim Bosch"
            },
            {
              "id": "893560167398789",
              "name": "Wade Murnane"
            },
            {
              "id": "498024660359274",
              "name": "Jack Cuthbert"
            },
            {
              "id": "10153427835262639",
              "name": "Emily Bennett"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MTAyMDc1NzgzMDA2MzMyMDEZD",
              "after": "MTAxNTM0Mjc4MzUyNjI2MzkZD"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-10-13T07:26:38+0000",
          "id": "842061055825362"
        },
        "id": "842060912492043"
      },
      {
        "name": "Profile Pictures",
        "cover_photo": {
          "created_time": "2014-09-10T00:07:27+0000",
          "id": "823234951041306"
        },
        "id": "823234927707975"
      },
      {
        "name": "Cover Photos",
        "likes": {
          "data": [
            {
              "id": "10207578300633201",
              "name": "Katie Stevens"
            },
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MTAyMDc1NzgzMDA2MzMyMDEZD",
              "after": "MTAyMDgyMzA5MTQ5MTY0NDMZD"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-09-03T06:48:29+0000",
          "id": "819310518100416"
        },
        "id": "819310544767080"
      },
      {
        "location": "Noosa, Queensland, Australia",
        "name": "Noosa",
        "likes": {
          "data": [
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            },
            {
              "id": "10208111836623779",
              "name": "Tim Bosch"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MTAyMDgyMzA5MTQ5MTY0NDMZD",
              "after": "MTAyMDgxMTE4MzY2MjM3NzkZD"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-08-28T05:45:59+0000",
          "name": "Noosa, view from a lookout",
          "id": "816503508381117"
        },
        "id": "816503235047811"
      },
      {
        "location": "Heron Island, Queensland, Australia",
        "name": "Heron Island",
        "likes": {
          "data": [
            {
              "id": "815157038515764",
              "name": "DMS Travel"
            },
            {
              "id": "10208230914916443",
              "name": "Gilbert Eaton"
            },
            {
              "id": "890221034365486",
              "name": "Darryl Daz"
            }
          ],
          "paging": {
            "cursors": {
              "before": "ODE1MTU3MDM4NTE1NzY0",
              "after": "ODkwMjIxMDM0MzY1NDg2"
            }
          }
        },
        "cover_photo": {
          "created_time": "2014-08-28T06:09:47+0000",
          "name": "Low tide",
          "id": "816508201713981"
        },
        "id": "816508098380658"
      }
    ],
    "paging": {
      "cursors": {
        "before": "ODE2NTIwODA4Mzc5Mzg3",
        "after": "ODE2NTA4MDk4MzgwNjU4"
      }
    }
  },
  "id": "815157038515764",
};
