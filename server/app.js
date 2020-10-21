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
    console.log("hi");
    res.sendFile(path.join('..', 'build', 'index.html'));
});

app.get('/next_move', async (req, res) => {
    try {
        let newPos = req.query.pos.substring(1,req.query.pos.length-1).split(',');
        newPos = newPos.map(item => {
            return (item === 'null' ? 'nil' : item)
        });
        const query = '/Users/bini/Desktop/playground/react-prolog/public/myprog [' + newPos + ']';
        const { stdout, stderr } = await exec(query);
        res.send(stdout);
    } catch (err) {
        res.send(err);
    };
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
// async function lsWithGrep() {
//   try {
//       const { stdout, stderr } = await exec('/Users/bini/Desktop/playground/react-prolog/public/myprog [nil,nil,nil,nil,x,nil,nil,nil,nil]');
//       console.log('stdout:', stdout);
//       console.log('stderr:', stderr);
//   }catch(err){
//         console.error(err);
// };
// };
// lsWithGrep();