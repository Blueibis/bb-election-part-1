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
      var voteForm = document.createElement('form');
      var voteButton = document.createElement('input');
      var voteHidden = document.createElement('input')
      voteHidden.setAttribute('type', 'hidden')
      voteHidden.setAttribute('name', 'id')
      voteHidden.setAttribute('value', voterInfo.id)
      voteButton.setAttribute('type', 'submit')
      voteForm.className = 'vote-form';
      voteForm.setAttribute('method', 'post')
      voteForm.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote')
      voteForm.append(voteHidden)
      voteForm.append(voteButton)


      voter.innerHTML = '<b>Name: ' + voterInfo.name + '</b><br>Votes: ' + voterInfo.votes
      list.append(voter)
      list.append(voteForm)
    });
  });

});
