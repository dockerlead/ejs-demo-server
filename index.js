const express = require('express');
var path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const crypto = require('crypto');
const intercomSecret = "xxxxxx";

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const calculateHash = (userId) => {
  const userHash = crypto.createHmac('sha256', intercomSecret)
    .update(userId)
    .digest('hex');
  return userHash;
}

app.get('/', (req, res)=>{
    res.render("pages/index",{
        user_hash: calculateHash("123")
    })
});
app.listen(port, ()=> console.log(`Listening on port ${port}`));