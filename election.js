document.addEventListener("DOMContentLoaded", function() {

  var list = document.querySelector('#votes');
  // Imagination!
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(response) {
    response.candidates.forEach(function(voterInfo) {
      var voter = document.createElement('li');
      voter.innerHTML = '<b>Name: ' + voterInfo.name + '</b><br>Votes: ' + voterInfo.votes
      list.append(voter)
    });
  });

});
