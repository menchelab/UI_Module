


$(document).ready(function () {

   //nodePanelRequest(666);

    $(function () {
        $("#tabsNode").tabs();
    });


 
    redrawMap(48.14, 16.46);
    
   
});

function redrawMap(lat, lon){


   // $("#map").css("width",$(window).width()).css("height",$(window).height());
    var map = L.map('map', { zoomControl: false }).setView([lat, lon], 13);
    document.getElementById("map").hidden = true;
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    
   // map.on('click', onMapClick);
  
}



