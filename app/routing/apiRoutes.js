let friendsList = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function (req, res) {
        let bestMatch;
        let bestScore = 100;
        console.log(req.body)

        let newScore = req.body.scores.reduce((a, b) => a + parseInt(b), 0);

        for (i = 0; i < friendsList.length; i++) {
            let fScore = friendsList[i].scores.reduce((a, b) => a + parseInt(b), 0);
            const diff = Math.abs(newScore - fScore);
            console.log(diff, diff < bestScore)
            if (diff < bestScore) {
                bestScore = diff;
                bestMatch = friendsList[i];
            };
            console.log(bestMatch);
        };
        friendsList.push(req.body);
        res.json(bestMatch);
    });

};