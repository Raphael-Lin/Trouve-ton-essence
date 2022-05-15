var departements_tab = [
  "AIN",
  "AISNE",
  "ALLIER",
  "ALPES DE HAUTE PROVENCE",
  "HAUTES ALPES",
  "ALPES MARITIMES",
  "ARDECHE",
  "ARDENNES",
  "ARIEGE",
  "AUBE",
  "AUDE",
  "AVEYRON",
  "BOUCHES DU RHONE",
  "CALVADOS",
  "CANTAL",
  "CHARENTE",
  "CHARENTE MARITIME",
  "CHER",
  "CORREZE",
  "CORSE",
  "COTE D'OR",
  "COTES D'ARMOR",
  "CREUSE",
  "DORDOGNE",
  "DOUBS",
  "DROME",
  "EURE",
  "EURE ET LOIR",
  "FINISTERE",
  "GARD",
  "HAUTE GARONNE",
  "GERS",
  "GIRONDE",
  "HERAULT",
  "ILLE ET VILAINE",
  "INDRE",
  "INDRE ET LOIRE",
  "ISERE",
  "JURA",
  "LANDES",
  "LOIR ET CHER",
  "LOIRE",
  "HAUTE LOIRE",
  "LOIRE ATLANTIQUE",
  "LOIRET",
  "LOT",
  "LOT ET GARONNE",
  "LOZERE",
  "MAINE ET LOIRE",
  "MANCHE",
  "MARNE",
  "HAUTE MARNE",
  "MAYENNE",
  "MEURTHE ET MOSELLE",
  "MEUSE",
  "MORBIHAN",
  "MOSELLE",
  "NIEVRE",
  "NORD",
  "OISE",
  "ORNE",
  "PAS DE CALAIS",
  "PUY DE DOME",
  "PYRENEES ATLANTIQUES",
  "HAUTES PYRENEES",
  "PYRENEES ORIENTALES",
  "BAS RHIN",
  "HAUT RHIN",
  "RHONE",
  "HAUTE SAONE",
  "SAONE ET LOIRE",
  "SARTHE",
  "SAVOIE",
  "HAUTE SAVOIE",
  "PARIS",
  "SEINE MARITIME",
  "SEINE ET MARNE",
  "YVELINES",
  "DEUX SEVRES",
  "SOMME",
  "TARN",
  "TARN ET GARONNE",
  "VAR",
  "VAUCLUSE",
  "VENDEE",
  "VIENNE",
  "HAUTE VIENNE",
  "VOSGES",
  "YONNE",
  "TERRITOIRE DE BELFORT",
  "ESSONNE",
  "HAUTS DE SEINE",
  "SEINE SAINT DENIS",
  "VAL DE MARNE",
  "VAL D'OISE",
];

// Source code: https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          // fix bug des departements avec apostrophe
          if (inp.value == "VAL D") inp.value = "VAL D'OISE";
          else if (inp.value == "COTE D") inp.value = "COTE D'OR";
          else if (inp.value == "COTES D") inp.value = "COTES D'ARMOR";
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
