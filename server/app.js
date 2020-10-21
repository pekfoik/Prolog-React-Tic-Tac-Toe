const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

//Define public ,views and partials path
const publicPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'build');

app.set('views', viewsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/next_move', (req, res) => {
    console.log(req.query.pos);
    res.send("[nil,nil,nil,nil,nil,nil,nil,nil,nil]");
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