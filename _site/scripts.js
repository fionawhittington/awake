$(function() {
    // Snazzy Map Style - https://snazzymaps.com/style/8097/wy
    var mapStyle = [{'featureType': 'all', 'elementType': 'geometry.fill', 'stylers': [{'weight': '2.00'}]}, {'featureType': 'all', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#9c9c9c'}]}, {'featureType': 'all', 'elementType': 'labels.text', 'stylers': [{'visibility': 'on'}]}, {'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'color': '#f2f2f2'}]}, {'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'poi', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'road', 'elementType': 'all', 'stylers': [{'saturation': -100}, {'lightness': 45}]}, {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'color': '#eeeeee'}]}, {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#7b7b7b'}]}, {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#46bcec'}, {'visibility': 'on'}]}, {'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{'color': '#c8d7d4'}]}, {'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#070707'}]}, {'featureType': 'water', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}];

    // Create the map
    var map = new google.maps.Map($('.map-canvas')[0], {
        zoom: 3,
        styles: mapStyle,
        center: new google.maps.LatLng(40, 40)
    });

    // Add a custom marker
    var markerIcon = {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#e25a00',
        fillOpacity: 0.95,
        scale: 3,
        strokeColor: '#fff',
        strokeWeight: 3,
        anchor: new google.maps.Point(12, 24)
    };
    var marker = new google.maps.Marker({
        map: map,
        icon: markerIcon,
        position: new google.maps.LatLng(22.2587, 71.1924)
    });
    var country_names = [];
        // Set up handle bars
    var template = Handlebars.compile($('#marker-content-template').html());

    // Set up a close delay for CSS animations
    var info = null;
    var closeDelayed = false;
    var closeDelayHandler = function() {
        $(info.getWrapper()).removeClass('active');
        setTimeout(function() {
            closeDelayed = true;
            info.close();
        }, 300);
    };


      $.getJSON("https://api.reliefweb.int/v1/disasters", function(result){
          var stringify = JSON.stringify(result);
          var parser = JSON.parse(stringify);
          var datas = parser.data;
          var subtitles = ['subtitles', 'hey', 'there', 'there', 'there', 'there', 'there', 'there', 'there', 'there'];
          var backgrounds = ['https://s3-eu-west-1.amazonaws.com/grm-assets/3663/accra-floods.jpg', 'http://www.arabnews.com/sites/default/files/styles/ph3_660_400/public/2017/07/02/941976-741640077.jpg?itok=2Mi-t2QO', 
          'https://www.businessdayonline.com/wp-content/uploads/2016/10/Nigeria-economy.jpg', 
          'http://s3.amazonaws.com/iexplore_web/images/assets/000/006/322/original/Tajikistan.jpg?1443185887', 
          'https://static.rappler.com/images/earthquake-land-afp.jpg', 
          'http://media4.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/_archive/News/_International%20News/Asia/_10/ss-100809-china-slide/ss-100817-china-flood-01.grid-9x2.jpg', 
          'http://data1.ibtimes.co.in/cache-img-0-450/en/full/648352/1496042960_storm.jpg', 
          'http://news.bbc.co.uk/media/images/46318000/jpg/_46318120_05_bf-floods7.jpg', 
          'https://ak9.picdn.net/shutterstock/videos/13883975/thumb/1.jpg?i10c=img.resize(height:160)', 'https://www.rescue.org/sites/default/files/styles/window_width_breakpoints_theme_rescue_large_2x/public/hero/944/hero-image/03102016_tjump_ethiopia_017.jpg?itok=hRSpQnpI', ''];
          for (var i = 0; i < datas.length; ++i) {
            var d = parser.data[i];
            var name1 = JSON.stringify(d.fields.name);
            var sub = name1.substr(0, name1.indexOf(':'));
            console.log(name1);
            function temp (nameTitle, subTitle, background) {
                $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + sub + "&key=AIzaSyAQZ3I_VFa87X15feDbXdYYn1T3vs35URA", function(result){
                    var lat = JSON.stringify(result['results'][0]['geometry']['location']['lat']);
                    var long = JSON.stringify(result['results'][0]['geometry']['location']['lng']);
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: markerIcon,
                        position: new google.maps.LatLng(lat, long)
                    });

                    var info = new SnazzyInfoWindow({
                        marker: marker,
                        wrapperClass: 'custom-window',
                        offset: {
                            top: '-72px'
                        },
                        edgeOffset: {
                            top: 50,
                            right: 60,
                            bottom: 50
                        },
                        border: false,
                        closeButtonMarkup: '<button type="button" class="custom-close">&#215;</button>',
                        content: template({
                            title: nameTitle,
                            subtitle: subTitle,
                            bgImg: background,
                            body: '<p><em>Photo by <a href="https://unsplash.com/@philipphenzler" target="_blank">Philipp Henzler</a>.</em></p>' +
                                  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet elit et nibh tincidunt elementum eget quis orci.</p>' +
                                  '<p>Ut magna est, lobortis ut mollis eu, vulputate id turpis.</p>' +
                                  '<p>Pellentesque id lacus quis orci consequat pellentesque non non purus. Mauris ligula dolor, volutpat quis blandit at, luctus luctus quam. In hac habitasse platea dictumst.</p>' +
                                  '<p>In hac habitasse platea dictumst. In hac habitasse platea dictumst.</p>' +
                                  '<p>Nam lorem dui, molestie nec elementum nec, lobortis sed lacus. Morbi nec tellus dolor. Etiam nec volutpat urna, pretium consectetur augue. In mattis, leo a ullamcorper venenatis, augue tortor cursus quam, nec mollis neque urna vitae lacus.</p>' +
                                  '<button id="donate"><a href="https://www.gofundme.com/gujarat-flood-relief-campaign" target="_blank">Donate</a></button>'+
                                '<button id="donate"><a href="/story-1" target="_blank">VR Experience</a></button>'+
                                '<button id="donate"><a href="/story-1" target="_blank">Share</a></button>'
                        }),
                        callbacks: {
                            open: function() {
                                $(this.getWrapper()).addClass('open');
                            },
                            afterOpen: function() {
                                var wrapper = $(this.getWrapper());
                                wrapper.addClass('active');
                                wrapper.find('.custom-close').on('click', closeDelayHandler);
                            },
                            beforeClose: function() {
                                if (!closeDelayed) {
                                    closeDelayHandler();
                                    return false;
                                }
                                return true;
                            },
                            afterClose: function() {
                                var wrapper = $(this.getWrapper());
                                wrapper.find('.custom-close').off();
                                wrapper.removeClass('open');
                                closeDelayed = false;
                            }
                        }
                    });
                });
            }
            temp(name1, subtitles[i], backgrounds[i]);
        }
    });


    // Add a Snazzy Info Window to the marker
    info = new SnazzyInfoWindow({
        marker: marker,
        wrapperClass: 'custom-window',
        offset: {
            top: '-72px'
        },
        edgeOffset: {
            top: 50,
            right: 60,
            bottom: 50
        },
        border: false,
        closeButtonMarkup: '<button type="button" class="custom-close">&#215;</button>',
        content: template({
            title: 'Floods in Gujrat',
            subtitle: '450,000 Effected',
            bgImg: 'http://s1.firstpost.in/wp-content/uploads/2013/09/floods-Surat-PTI.jpg',
            body: '<p><em>Photo by Firstpost. Facts sourced from The Guardian.</em></p>' +
                  '<p>Severe monsoon flooding has killed 213 people in western India with officials fearing the death toll would rise as receding waters revealed additional victims.</p>' +
                  '<p>Nearly 130,000 people have been relocated to safer ground in Gujarat state after hundreds of cities and villages were devastated by weeks of torrential rain.</p>' +
                  '<p>Helicopters and boats are combing areas including the deluged Banaskantha district where 25 bodies, including 17 members of one family, were discovered in two submerged villages last week.</p>' +
                  '<p>On Sunday, surviving members of the family met the Gujarat chief minister, Vijay Rupani, who said the rainfall had triggered “the worst flood of the century” in parts of the state.</p>' +
                  '<button id="donate"><a href="https://www.gofundme.com/gujarat-flood-relief-campaign" target="_blank">Donate</a></button>'+
                  '<button id="donate"><a href="/story-1" target="_blank">VR Experience</a></button>'+
                  '<button id="donate"><a href="/story-1" target="_blank">Share</a></button>'
        }),
        callbacks: {
            open: function() {
                $(this.getWrapper()).addClass('open');
            },
            afterOpen: function() {
                var wrapper = $(this.getWrapper());
                wrapper.addClass('active');
                wrapper.find('.custom-close').on('click', closeDelayHandler);
            },
            beforeClose: function() {
                if (!closeDelayed) {
                    closeDelayHandler();
                    return false;
                }
                return true;
            },
            afterClose: function() {
                var wrapper = $(this.getWrapper());
                wrapper.find('.custom-close').off();
                wrapper.removeClass('open');
                closeDelayed = false;
            }
        }
    });

});
