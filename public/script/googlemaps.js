var currWindow;
var Map;
// Initialisation de la map
function initMap() {
  const France = new google.maps.LatLng(46.227638, 2.213749);
  // La map avec zoom 13 et versailles au centre
  Map = new google.maps.Map(document.getElementById("carte"), {
    zoom: 5,
    center: France,
  });
}

function setMarker(Lat, Lng, Adresse, CodeP, Ville, Prix) {
  // définir la taille de l'icone
  const icon = {
    url: "/images/favicon.ico", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };
  // définir un marker
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(Lat, Lng),
    map: Map,
    title: Adresse,
    icon: icon,
  });
  // définir la bulle du marker
  var contentString =
    "<div>" +
    "<b>" +
    Adresse +
    "</b>" +
    "<p>" +
    CodeP +
    "</p>" +
    "<p>" +
    Ville +
    "</p>";
  // intégrer le prix dans la bulle si il existe
  Prix.forEach(function (Type) {
    var c = Type.charAt(Type.length - 1);
    if (c >= "0" && c <= "9") {
      contentString += "<p><h3>" + Type + "</b></h3>";
    }
  });
  contentString += "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  // définir l'event pour ouvrir la bulle du marker si cliqué
  marker.addListener("click", () => {
    // quand une bulle est ouverte, cela ferme celle qui est ouverte actuellement
    if (currWindow) {
      currWindow.close();
    }
    currWindow = infowindow;
    // ouverture de la bulle
    infowindow.open({
      anchor: marker,
      map: Map,
      shouldFocus: false,
    });
  });
}

function getEmplacement(Lat, Lng) {
  Map.setZoom(16);
  Map.setCenter(new google.maps.LatLng(Lat, Lng));
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.initMap = initMap;
