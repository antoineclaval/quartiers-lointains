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

    function navclick(e) {
        var str = this.id ; 
        if (str.indexOf('right') > 0) {
            pictureIndex++;
        } else {
            pictureIndex--;
        }
        changePicSrc();
    }

    function changePicSrc() {
        var picSrc = $('#current-picture').attr('src');
        var newSrc = reverse(replaceAt(reverse(picSrc), 4, pictureIndex));
        $('#current-picture').attr('src', newSrc);
    }

    var woldMapping = {
        170: 'france',
        171: 'rwanda',
        172: 'algerie',
        173: 'france',
        174: 'reunion',
        175: 'algerie',
        176: 'rwanda'
    };
    var countryWebSite = {
        'rwanda': 'http://rwandafilmfestival.net/',
        'algerie': 'https://www.facebook.com/pages/Association-Project-heurts/254178147934570',
        'reunion': 'http://www.festivalfilmafriqueiles.fr/'
    };

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

    var clicked = function () {
        pictureIndex=1;
        if (woldMapping[this.id] === 'france') {
            $('.france-logos').show();
            $('.other-logos').hide();
            return;
        }
        $('.france-logos').hide();
        $('.other-logos').show();
        $('#current-logo').attr('style', 'display: block');
        $('#current-picture').attr('style', 'display: block');
        $('#current-logo').attr('src', 'images/logos/' + woldMapping[this.id] + '.jpg');
        $('.other-logos p').text(woldMapping[this.id]);
        $('#currentLogoLink').attr('href', countryWebSite[woldMapping[this.id]]);
        $('#current-picture').attr('src', 'images/photos-festival/' + woldMapping[this.id] + pictureIndex + '.jpg');
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
    var parisLatLon = '48\xb051\u203224\u2033N, 2\xb021\u203207\u2033E';
    var reunionLatLon = '20\xb052\u203200\u2033S, 55\xb028\u203200\u2033E';
    var bejaiaLatLon = '36\xb045\u203200\u2033N, 5\xb04\u203200\u2033E';
    var kigaliLatLon = '1\xb057\u203213\u2033S, 30\xb03\u203238\u2033E';
    dot.stop().attr(world.parseLatLon(parisLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot2.stop().attr(world.parseLatLon(reunionLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot3.stop().attr(world.parseLatLon(bejaiaLatLon)).animate({ r: 2 }, 2000, 'elastic');
    dot4.stop().attr(world.parseLatLon(kigaliLatLon)).animate({ r: 2 }, 2000, 'elastic');
    world.hover(over, out);
  });
}());