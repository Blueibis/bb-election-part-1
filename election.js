document.addEventListener("DOMContentLoaded", function() {

  var list = document.querySelector('#votes');

  function submitVote(e) {
      e.preventDefault();

      var idVal = $(this).children('input[type=hidden]').val()

      $.ajax({
        url: 'https://bb-election-api.herokuapp.com/vote?id=' + idVal,
        method: 'POST',
        // data: { id: $(this).children('input[type=hidden]').val() },
        dataType: 'json'
      }).done(function(response) {
        document.querySelector('input[value="' + idVal + '"]').nextSibling.disabled = true
        document.querySelector('input[value="' + idVal + '"]').parentElement.parentElement.innerHTML
        // this.lastChild.disabled = true
        // $(this).children('input[type=submit]').prop('disabled', true)
        // this.prop('disabled', true)
      }).fail(function() {
        console.log('air roar');
      });
  }

  // Imagination!
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(response) {
    response.candidates.forEach(function(voterInfo) {
      var voter = document.createElement('li')
      var voteHidden = document.createElement('input')
      var voteButton = document.createElement('input')
      var voteForm = document.createElement('form')

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
      voter.append(voteForm)
      list.append(voter)
      // list.append(voteForm)

      var forms = document.querySelectorAll('.vote-form')
      for(var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', submitVote);
      }
    });
  });
});
// document.addEventListener('loaded', function() {
//
//
// })
