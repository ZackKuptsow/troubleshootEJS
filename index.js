const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
	res.render('home', { name: 'Home Page' });
});

app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params;
	const data = redditData[subreddit];
	if (data) {
		res.render('subreddit', { ...data });
	} else {
		res.render('notfound', { subreddit, name: 'Not Found' });
	}
});

app.get('/rappers', (req, res) => {
	const rappers = [
		'Childish Gambino',
		'Mac Miller',
		'J Cole',
		'JCE WRLD',
		'Roddy Ricch'
	];
	res.render('rappers', { rappers, name: 'Rappers' });
});

app.get('/random', (req, res) => {
	const num = Math.floor(Math.random() * 10) + 1;
	res.render('random', { rand: num, name: 'Random' });
});

app.listen(3000, () => {
	console.log('Listening on port 3000!');
});
