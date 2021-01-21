var express = require('express');
var router = express.Router();

const gameUsing = 1 //This is hardcoded as this webpage currently only supports on game

const addPlayerScore = function(personScore, req, res){
  var db = req.db;
  var collection = db.get('tennis');
  var query = { gameNum: gameUsing };
  const otherScore = (personScore == "score1") ? "score2" : "score1"

  collection.find(query,{}, function(e,docs){
    if (docs.lenght == 0){
      res.json( { error:"Error getting game data"} );
      return;
    }
    var theGameData = docs[0]
    if( theGameData["won"]){
      res.json( { error:"The game is won, please reset it to continue to add to the score"} );
      return;
    }
    var newScore = theGameData[personScore] +1;

    if (newScore>=4 && newScore-theGameData[otherScore]>=2){
      var gameWon = true;
      var winner = (personScore == "score1") ? "Player1" : "Player2"
    } else{
      var gameWon = false;
      var winner = "NULL"
    }

    
    newData = { "$set": {[personScore] : newScore, won:gameWon, winner:winner} }
    collection.update(query,newData, function(err, resp) {
      if (err) throw err;
      res.json( {msg:"done", newGame:resp} );
    });

  });
}

/* GET users listing. */
router.get('/fullGameInfo', function(req, res, next) {
  var db = req.db;
  var collection = db.get('tennis');
  var query = {}
  if (req.query.game){
    query = { gameNum: req.query.game }
  } else{
    query = { gameNum: gameUsing }
  }
  collection.find(query,{},function(e,docs){
    res.json(docs);
    console.log(docs);
  });
});

router.put('/player1Score', function(req,res,next){
  addPlayerScore("score1",req,res);
});

router.put('/player2Score', function(req,res,next){
  addPlayerScore("score2",req,res);
});

router.put('/restart', function(req,res,next){
  console.log("restart game");
  var db = req.db;
  var collection = db.get('tennis');
  var query = { gameNum: gameUsing };

  collection.find(query,{}, function(e,docs){
    if (docs.lenght == 0){
      res.json( { error:"Error getting game data"} );
      return;
    }
    var theGameData = docs[0]
    if( theGameData["won"]){
      newData = { "$set": { score1:0, score2:0, won:false, winner:"NULL" }  }
      collection.update(query,newData, function(err, resp) {
        if (err) throw err;
        res.json( {msg:"done", newGame:resp} );
      });
    } else {
      res.json( { error:"The game is not over, can not be reset."} );
      return;
    }

  });
});

router.put('/hardreset', function(req,res,next){
  console.log("restart game");
  var db = req.db;
  var collection = db.get('tennis');
  var query = { gameNum: gameUsing };

  collection.find(query,{}, function(e,docs){
    if (docs.lenght == 0){
      res.json( { error:"Error getting game data"} );
      return;
    }
    var theGameData = docs[0]
    newData = { "$set": { score1:0, score2:0, won:false, winner:"NULL" }  }
    collection.update(query,newData, function(err, resp) {
      if (err) throw err;
      res.json( {msg:"done", newGame:resp} );
    });

  });
});

module.exports = router;
