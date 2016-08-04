
$(document).ready(function(){	

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }



    $(window).resize(resize);
    resize();

        var styles = [
            {
                "stylers": [
                    { lightness: -10 },
                    {saturation: -30}
                    
                ]
            }
        ]
        var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

    var myOptions = {
        zoom: 17,
        center: new google.maps.LatLng(55.710520, 37.657727),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        zoomControl: true
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.709529, 37.653253),
        icon: {
        url: "i/pin.png", // url
        scaledSize: new google.maps.Size(110, 145), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(55,145) // anchor
        },
        animation: google.maps.Animation.DROP,
        map: map,
        title: "Franchising Today"
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    function diagram($obj,i) {
        $obj.find(".diagram img").eq(i).css("visibility","visible");
        $obj.find(".diagram img").eq(i-1).css("visibility","hidden");
    }

    $('.b-3 .photo-slider').slick({
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: "<span class='arrow arrow-left'></span>",
      nextArrow: "<span class='arrow arrow-right'></span>"
    });
    $('.b-3 .b-block').slick({
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      dots: true,
      arrows: false
    });

    $( "#key-tabs" ).tabs({
        activate: function( event, ui ) {
            ui.oldPanel.find(".diagram img:eq(-1)").css("visibility","hidden");
            ui.newPanel.find(".diagram img").each(function(i, val) {
                setTimeout(diagram, i*300,ui.newPanel,i);
            });
        }
    });
    $(".steps span:not(.active)").click(function() {
        $($(this).attr("data-block")).show();
        $(this).closest(".step").hide();
    });
});