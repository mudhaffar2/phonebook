
$(document).ready(function() {

  var table = $('#table');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/get_json',
    //data: { get_param: 'value'},
    dataType: 'json',
    success: function (data) {
      showTable(data);
    }
  });

  function showTable(data) {
    $.each(data, function(idx, item) {
      var tr = $('<tr>');
      var tdfname = $('<td>').text(item.fname);
      var tdlname = $('<td>').text(item.lname);
      var tdemail = $('<td>').text(item.email);
      var tdphone = $('<td>').text(item.phone);
      var tdhobbies = $('<td>').text(item.hobbies);
      tr.append(tdfname).append(tdlname).append(tdemail).append(tdphone).append(tdhobbies);
      table.append(tr);
    });
  }

});
