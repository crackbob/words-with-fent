let pageMap = wwf.page.Manager[wwf.page.Manager.__pageMap ? '__pageMap' : 'pageMap'];
window.displayValidationResults = window.displayValidationResults || pageMap.game.displayValidationResults;
window.addMove = window.addMove || pageMap.game.__serviceClient.addMove;
window.__processTiles = window.__processTiles || pageMap.game.currentMove.constructor.prototype.__processTiles;
window.calculateWords = window.calculateWords || pageMap.game.currentMove.constructor.prototype.calculateWords;

pageMap.game.displayValidationResults = function (board, wordData, a, b) {
    wordData.valid = true;
    window.displayValidationResults.call(this, board, wordData, a, b);
}

pageMap.game.__serviceClient.wordOrNot = function (word, callback) {
    callback({});
}

pageMap.game.__serviceClient.addMove = function (move, a, b) {
    move.words = ['cat'];
    move.points = 9294967296;
    return window.addMove.call(this, move, a, b);
}

pageMap.game.currentMove.constructor.prototype.__processTiles = function () {
    let retVal = window.__processTiles.apply(this, arguments);
    retVal.valid = true;
    return retVal;
}

pageMap.game.currentMove.constructor.prototype.validate = function (callback) {
    callback(true, null);
}

pageMap.game.currentMove.constructor.prototype.calculateWords = function () {
    let retVal = window.calculateWords.apply(this, arguments);
    
    if (retVal.words.length == 0 && pageMap.game.currentMove.tiles.length > 0) {
        return {
            "words": [pageMap.game.currentMove.tiles],
            "error": null
        }
    };
    return retVal;
}

// crashes the game after the word is played
function setLetters (str) {
    let lettersToSet = str.split("");
    myList = [];
    lettersToSet.forEach((letter) => {
        let id = pageMap.game.__bag.__letters.find(all => all.letter == letter)?.id || undefined;
        if (id) { // ignore unfound letters
            myList.push({ letter: letter, id: id});
        }
    });

    let letters = {
        [wwf.user.Manager.getMyself().get("id")]: myList
    };
    
    pageMap.game.__setLetters(letters);
}
