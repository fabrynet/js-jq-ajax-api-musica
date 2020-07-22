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

function getMusic () {
  var template = $('#cd-template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.cds-container');

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
          console.log(cd);
          var templateHTML = compiled(cd);
          target.append(templateHTML);
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
  getMusic();
}

$(document).ready(init);
