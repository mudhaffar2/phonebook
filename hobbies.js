$(document).ready(function() {

  var ul = $('#hoblist');

  console.log('hobbies js start');
  setTimeout(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/get_hobbies',
      dataType: 'json',
      success: function (data) {
        showList(data);
      }
    });

  }, 120);

  function showList(data) {

    console.log('showList function start');
       
    $.each(data, function(idx, item) {
      var li = $('<li>').text(item);
      ul.append(li);
    });

  }

});
