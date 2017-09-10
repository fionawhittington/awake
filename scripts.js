$(function() {
    // Snazzy Map Style - https://snazzymaps.com/style/8097/wy
    var mapStyle = [{'featureType': 'all', 'elementType': 'geometry.fill', 'stylers': [{'weight': '2.00'}]}, {'featureType': 'all', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#9c9c9c'}]}, {'featureType': 'all', 'elementType': 'labels.text', 'stylers': [{'visibility': 'on'}]}, {'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'color': '#f2f2f2'}]}, {'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'poi', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'road', 'elementType': 'all', 'stylers': [{'saturation': -100}, {'lightness': 45}]}, {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'color': '#eeeeee'}]}, {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#7b7b7b'}]}, {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}, {'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#46bcec'}, {'visibility': 'on'}]}, {'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{'color': '#c8d7d4'}]}, {'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#070707'}]}, {'featureType': 'water', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]}];

    // Create the map
    var map = new google.maps.Map($('.map-canvas')[0], {
        zoom: 4,
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
        position: new google.maps.LatLng(40.72, -74)
    });

    $(document).ready(function(){
      $.getJSON("https://api.reliefweb.int/v1/disasters", function(result){
          var country_names = [];
          var stringify = JSON.stringify(result);
          var parser = JSON.parse(stringify);
          var datas = parser.data;
          for (var i = 0; i < datas.length; i++) {
            var d = parser.data[i];
            var name1 = JSON.stringify(d.fields.name);
            var sub = name1.substr(0, name1.indexOf(':'));
          $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + sub + "&key=AIzaSyAQZ3I_VFa87X15feDbXdYYn1T3vs35URA", function(result){
            var lat = JSON.stringify(result['results'][0]['geometry']['location']['lat']);
            var long = JSON.stringify(result['results'][0]['geometry']['location']['lng']);
            var marker = new google.maps.Marker({
                map: map,
                icon: markerIcon,
                position: new google.maps.LatLng(lat, long)
    });
          });
        }
    });
});

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
                  '<button id="donate">Donate</button>'
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
    // Open the Snazzy Info Window
    info.open();
});
