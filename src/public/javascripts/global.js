

$(document).ready(function() {

    // Populate the user table on initial page load
    //populateTable();
    console.log("running")
    renderFromServer();
  
  });
  
  // Functions =============================================================

function score1(){
    putRequest("/api/player1score");
    setTimeout(renderFromServer, 150);
}

function score2(){
    putRequest("/api/player2score");
    setTimeout(renderFromServer, 150);
}

function reset(){
    putRequest("/api/restart");
    setTimeout(renderFromServer, 150);
}


function putRequest(link){
    $.ajax({
        url: link,
        type: 'PUT',
        success: function(response) {
          console.log("put success from:" + link + " =>" + response);
          console.log(response);
          if ("error" in response){
            alert(response["error"]);
          }
        }
     });
}

function renderFromServer(){

    $.getJSON( '/api/fullGameInfo', function( data ) {
        console.log($[0]);
        var injectHTML = ''
        $.each(data, function() {
            if(this.won){
                injectHTML="<h2> " + this.winner + " won!</h2>"
            }else {
                injectHTML="<h1 style='font-size: 6em;'>"+this.scoreName+"</h1>"+
                "<h4>Score of player one is " + this.score1 + "<h4>" +
                "<h4>Score of player one is " + this.score2 + "<h4>";
            }
        });

        $('#inject').html(injectHTML);
      });
}


  // Fill table with data
  function populateTable() {
  
    // Empty content string
    var tableContent = '';
  
    // jQuery AJAX call for JSON
    $.getJSON( '/api/fullGameInfo', function( data ) {
      console.log(data);
  
      // Inject the whole content string into our existing HTML table
      $('#inject').html(tableContent);
    });
  };