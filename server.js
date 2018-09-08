const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const corsFilter = require('cors')

const app = express()
app.set('port', 80)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(corsFilter())
app.options('*', corsFilter()); // allow preflight (http.OPTIONS)

app.use(express.static(path.join(__dirname, 'public')))

const mode =  process.env.MODE || ('')

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
});

app.get("/*", function(req, res, next) {
	res.sendFile(path.join(__dirname, 'public/index.html'))
});
