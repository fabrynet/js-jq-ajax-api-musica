// GOAL:
// Attraverso una chiamata ajax all'Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.
// Chiamata:
// https://flynn.boolean.careers/exercises/api/array/music

function addListeners() {
  $('#select-genre').change(selectMusic);
}

function selectMusic() {
  var genre = $(this).val();
  console.log(genre);
    var cds = $('.cd');
    cds.each(function(){
      var cd = $(this);
      var genreCD = cd.data('genre');
      if (genre == '') {
        cd.show();
      } else {
        if (genre == genreCD) {
          cd.show();
        } else {
          cd.hide();
        }
      }
    });
}

function getCd () {

  $.ajax ({
    url: 'https://flynn.boolean.careers/exercises/api/array/music',
    type: 'GET',
    success: function(data) {
      var success = data['success'];
      var cds = data['response'];
      console.log(success, cds);
      if (success) {
        printCd(cds);
      } else {
        console.log('errore');
      }
    },
    error: function(err) {
      console.log(err);
    }
  });

}

function printCd(cds) {

  var templateCD = $('#cd-template').html();
  var compiledCD = Handlebars.compile(templateCD);
  var targetCD = $('.cds-container');

  for (var i = 0; i < cds.length; i++) {
    var cd = cds[i];
    var templateHTMLCD = compiledCD(cd);
    targetCD.append(templateHTMLCD);
  }

}

function init() {
  getCd();
  addListeners();
}

$(document).ready(init);
