        function drawMap() {

            var woldMapping = {170:"France", 171:"Rwanda", 172:"Algerie"};

            Raphael($("mapViewPort"), 10, 360, 400, function () {
                var r = this;

                r.setViewBox(410,85, 200, 240,true);


                r.rect(0, 0, 360, 400, 10).attr({
                    stroke: "none",
                    fill: "0-#9bb7cb-#adc8da"
                });
                var over = function () {
                    this.c = this.c || this.attr("fill");
                    this.stop().animate({fill: "#3e41ba"}, 500);
                } ;
                var out = function () {
                        this.stop().animate({fill: this.c}, 500);
                };

                var clicked = function(ev){
                   console.log( woldMapping[this.id] );
                };

                r.setStart();
                var hue = Math.random();
                for (var country in worldmap.shapes) {
                    // var c = Raphael.hsb(Math.random(), .5, .75);
                    // var c = Raphael.hsb(.11, .5, Math.random() * .25 - .25 + .75);
                    r.path(worldmap.shapes[country]).attr({stroke: "#ccc6ae", fill: "#f0efeb", "stroke-opacity": 0.2});
                }

                r.path(worldmap.shapes.FR).attr({fill: "#3fa537",stroke: "#ccc6ae","stroke-opacity": 0.2});
                r.path(worldmap.shapes.RW).attr({fill: "#3fa537",stroke: "#ccc6ae","stroke-opacity": 0.2});
                r.path(worldmap.shapes.DZ).attr({fill: "#3fa537",stroke: "#ccc6ae","stroke-opacity": 0.2});
                var world = r.setFinish();

                world.hover(over, out);
                world.click(clicked);
               // world.animate({fill: "#666", stroke: "#666"}, 3000);
                //world.animate(fillQL, 3000);

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
                var latlonrg = /(\d+(?:\.\d+)?)[\xb0\s]?\s*(?:(\d+(?:\.\d+)?)['\u2019\u2032\s])?\s*(?:(\d+(?:\.\d+)?)["\u201d\u2033\s])?\s*([SNEW])?/i;
                world.parseLatLon = function (latlon) {
                    var m = String(latlon).split(latlonrg),
                        lat = m && +m[1] + (m[2] || 0) / 60 + (m[3] || 0) / 3600;
                    if (m[4].toUpperCase() == "S") {
                        lat = -lat;
                    }
                    var lon = m && +m[6] + (m[7] || 0) / 60 + (m[8] || 0) / 3600;
                    if (m[9].toUpperCase() == "W") {
                        lon = -lon;
                    }
                    return this.getXY(lat, lon);
                };

                // var dot = r.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0}),
                //     // dot2 = r.circle().attr({stroke: "#000", r: 0}),
                //     ll = document.getElementById("latlon"),
                //     cities = document.getElementById("cities");

                // cities.onclick = function (e) {
                //     e = e || window.event;
                //     var target = e.target || e.srcElement || document;
                //     if (target.tagName == "A") {
                //         var txt = decodeURIComponent(target.href.substring(target.href.indexOf("#") + 1)),
                //             attr = world.parseLatLon(txt);
                //         attr.r = 0;
                //         dot.stop().attr(attr).animate({r: 5}, 1000, "elastic");
                //         // dot2.stop().attr(attr).animate({r: 10}, 1000, "elastic");
                //         return false;
                //     }
                // };
            });
        }