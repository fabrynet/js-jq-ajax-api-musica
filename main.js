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
  var value = $(this).val();
  console.log(value);

  var templateCD = $('#cd-template').html();
  var compiledCD = Handlebars.compile(templateCD);
  var targetCD = $('.cds-container');
  targetCD.empty();

  if (value) {
    $.ajax ({
      url: 'https://flynn.boolean.careers/exercises/api/array/music',
      type: 'GET',
      success: function(data) {
        var success = data['success'];
        var cds = data['response'];

        if (success) {
          for (var i = 0; i < cds.length; i++) {
            var cd = cds[i];
            var genre = cd['genre'];
            if (genre == value) {
              var templateHTMLCD = compiledCD(cd);
              targetCD.append(templateHTMLCD);
            }
          }
        } else {
          console.log('errore');
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  } else {
    getAllMusic();
  }
}

function getAllMusic () {
  var templateCD = $('#cd-template').html();
  var compiledCD = Handlebars.compile(templateCD);
  var targetCD = $('.cds-container');

  $.ajax ({
    url: 'https://flynn.boolean.careers/exercises/api/array/music',
    type: 'GET',
    success: function(data) {
      var success = data['success'];
      var cds = data['response'];
      console.log(success, cds);
      if (success) {
        for (var i = 0; i < cds.length; i++) {
          var cd = cds[i];
          var templateHTMLCD = compiledCD(cd);
          targetCD.append(templateHTMLCD);
        }
      } else {
        console.log('errore');
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function init() {
  getAllMusic();
  addListeners();
}

$(document).ready(init);
