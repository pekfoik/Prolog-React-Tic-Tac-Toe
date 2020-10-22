const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

//Define public ,views and partials path
const publicPath = path.join(__dirname, '..', 'build');
// const viewsPath = path.join(__dirname, '..', 'build');

// app.set('views', viewsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join('..', 'build', 'index.html'));
});

app.get('/next_move', async (req, res) => {
    try {
        let newPos = req.query.pos.substring(1, req.query.pos.length - 1).split(',');
        let diff = req.query.diff;
        if (diff === "easy") {
            let rand = Math.random();
            if (rand < 0.5) {
                let emptySpots = [];
                newPos.forEach((pos, i) => {
                    if (pos === 'nil') {
                        emptySpots.push(i);
                    }
                });
                let randomInedex = Math.floor(Math.random() * emptySpots.length);
                newPos[emptySpots[randomInedex]] = "o";
                console.log("Random: " + emptySpots[randomInedex]);
                res.send('[' + newPos.toString() + ']');
                return;
            }
        }
        if (diff === "hard") {
            diff = 10;
        } else if (diff === "med") {
            diff = 2;
        } else {
            diff = 1;
        }
        const query = '/Users/bini/Desktop/playground/react-prolog/public/myprogv2 [' + newPos + '] ' + diff;
        const { stdout, stderr } = await exec(query);
        res.send(stdout);
    } catch (err) {
        console.log(err);
        res.send(err);
    };
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});