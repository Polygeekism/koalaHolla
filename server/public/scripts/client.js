console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    newName = $('#nameIn').val();
    newAge = $('#ageIn').val();
    newGender = $('#genderIn').val();
    newStatus = $('#readyForTransferIn').val();
    newNotes = $('#notesIn').val();
    var objectToSend = {
      name: newName,
      age: newAge,
      gender: newGender,
      readyForTransfer: newStatus,
      notes: newNotes
    };
    console.log(objectToSend);
    // call saveKoala with the new obejct
    saveKoala(objectToSend);
  }); //end addButton on click
}); // end doc ready

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function (data) {
      console.log('got some koalas: ', data);
      showKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function (data) {
      console.log('got some koalas: ', data);
      getKoalas();
      $('#nameIn').val('');
      $('#ageIn').val('');
      $('#genderIn').val('');
      $('#readyForTransferIn').val('');
      $('#notesIn').val('');
    } // end success
  }); //end ajax
}

function showKoalas(koalas) {
  $('#viewKoalas').empty();
  for (var i = 0; i < koalas.length; i++) {
    var koala = koalas[i];
    var $koalaRow = '<tr><td>' + koala.name + '</td><td>' + koala.age + '</td><td>' + koala.gender + '</td><td>' + koala.ready_for_transfer + '</td><td>' + koala.notes + '</td>';
    if (koala.ready_for_transfer == "N") {
      $koalaRow += '<td><button class="change status">Ready for Transfer</button></td></tr>';
    } else {
      $koalaRow += '</tr>';
    }
    console.log($koalaRow);
    $('#viewKoalas').append($koalaRow);
  }
}