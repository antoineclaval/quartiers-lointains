(function () {

    'use strict';

    // This is a functions that scrolls to #{id}link
    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace('link', '');
        // Scroll
        console.log($('#' + id).offset().top);
        $('html,body').animate({ scrollTop: $('#' + id).offset().top }, 'slow');
    }

    $(document).ready(function () {
        $('#nav > ul > li > a').click(function (e) {
        // Prevent a page reload when a link is pressed
            e.preventDefault();
        // Call the scroll function
            goToByScroll($(this).attr('id'));
        });

        $('#balink').click(function (e) {
            // Prevent a page reload when a link is pressed
            e.preventDefault();
            // Call the scroll function
            goToByScroll($(this).attr('id'));
        });

        $('#submenu').on('mouseenter', function () {
            $('#under-nav').show();
        });
        $('#submenu').on('mouseleave', function () {
            $('#under-nav').hide();
        });

        $('#nav-left').click(navclick);
        $('#nav-right').click(navclick);
    });

    function reverse(s) {
        return s.split('').reverse().join('');
    }
    // replace the 'n'th character of 's' with 't'
    function replaceAt(s, n, t) {
        return s.substring(0, n) + t + s.substring(n + 1);
    }

    var pictureIndex = 1;
    var currentCountry = "algerie";

    function navclick(e) {
        var str = this.id ; 
        if (str.indexOf('right') > 0) {
            pictureIndex++;
        } else {
            pictureIndex--;
        }
        if ( pictureIndex < 1 ){
            pictureIndex = countryInfo[currentCountry].pictureNumber;
        }
        if ( pictureIndex > countryInfo[currentCountry].pictureNumber){
            pictureIndex =1 ;
        }

        changePicSrc();
    }

    function changePicSrc() {
        var picSrc = $('#current-picture').attr('src');
        var newSrc = reverse(replaceAt(reverse(picSrc), 4, pictureIndex));
        $('#current-picture').attr('src', newSrc);
    }

  new Raphael('MapPortView', 480, 550, function () {
    var r = this;
    r.setViewBox(410, 85, 200, 240, false);
    r.rect(0, 0, 1000, 400, 10).attr({
      stroke: 'none',
      fill: '0-#9bb7cb-#adc8da'
    });
    var over = function () {
      this.c = this.c || this.attr('fill');
      this.stop().animate({ fill: '#2556f1' }, 500);
    };
    var out = function () {
      this.stop().animate({ fill: this.c }, 500);
    };

    function resolveWorldMapping(idCountry){
        return woldMapping[idCountry];
    }

    var clicked = function () {
        pictureIndex=1;

        currentCountry = resolveWorldMapping(this.id);

        if (currentCountry === 'france') {
            $('.france-logos').show();
            $('.other-logos').hide();
            return;
        }
        $('.france-logos').hide();
        $('.other-logos').show();
        $('#current-logo').attr('style', 'display: block');
        $('#current-picture').attr('style', 'display: block');
        $('#current-logo').attr('src', 'images/logos/' + woldMapping[this.id] + '.jpg');
        $('.other-logos p').text(countryInfo[currentCountry].displayCountry + ' - ' + countryInfo[woldMapping[this.id]].displayFestival);
        $('#currentLogoLink').attr('href', countryInfo[currentCountry].website);
        $('#current-picture').attr('src', 'images/photos-festival/' + currentCountry + pictureIndex + '.jpg');
    };

    r.setStart();
    for (var country in worldmap.shapes) {
      // var c = Raphael.hsb(Math.random(), .5, .75);
      // var c = Raphael.hsb(.11, .5, Math.random() * .25 - .25 + .75);
      r.path(worldmap.shapes[country]).attr({
        stroke: '#ccc6ae',
        fill: '#f0efeb',
        'stroke-opacity': 0.2
      });
    }
    r.path(worldmap.shapes.FR).attr({
      fill: '#36a19a',
      stroke: '#ccc6ae',
      'stroke-opacity': 0.2
    }).click(clicked);
    r.path(worldmap.shapes.RW).attr({
      fill: '#36a19a',
      stroke: '#ccc6ae',
      'stroke-opacity': 0.2
    }).click(clicked);
    r.path(worldmap.shapes.DZ).attr({
      fill: '#36a19a',
      stroke: '#ccc6ae',
      'stroke-opacity': 0.2
    }).click(clicked);
    var world = r.setFinish();

    var latlonrg = /(\d+(?:\.\d+)?)[\xb0\s]?\s*(?:(\d+(?:\.\d+)?)['\u2019\u2032\s])?\s*(?:(\d+(?:\.\d+)?)["\u201d\u2033\s])?\s*([SNEW])?/i;
    world.getXY = function (lat, lon) {
      return {
        cx: lon * 2.6938 + 465.4,
        cy: lat * -2.6938 + 227.066
      };
    };
    world.getLatLon = function (x, y) {
      return {
        lat: (y - 227.066) / -2.6938,
        lon: (x - 465.4) / 2.6938
      };
    };
    world.parseLatLon = function (latlon) {
      var m = String(latlon).split(latlonrg), lat = m && +m[1] + (m[2] || 0) / 60 + (m[3] || 0) / 3600;
      if (m[4].toUpperCase() === 'S') {
        lat = -lat;
      }
      var lon = m && +m[6] + (m[7] || 0) / 60 + (m[8] || 0) / 3600;
      if (m[9].toUpperCase() === 'W') {
        lon = -lon;
      }
      return this.getXY(lat, lon);
    };
    function getDot() {
      var dot = r.circle().attr({
          id: 'truc',
          fill: 'r#8436a3:50-#F57124:100',
          stroke: '#fff',
          'stroke-width': 0.5,
          r: 5
        }).click(clicked);
      return dot;
    }
    var dot = getDot();
    var dot2 = getDot();
    var dot3 = getDot();
    var dot4 = getDot();


    dot.stop().attr(world.parseLatLon(countryInfo.france.festivalLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot2.stop().attr(world.parseLatLon(countryInfo.reunion.festivalLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot3.stop().attr(world.parseLatLon(countryInfo.algerie.festivalLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot4.stop().attr(world.parseLatLon(countryInfo.rwanda.festivalLatLon)).animate({ r: 2 }, 2000, 'elastic');
    world.hover(over, out);
  });
}());