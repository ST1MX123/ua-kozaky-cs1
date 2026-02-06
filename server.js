const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const path = require('path');

const app = express();
const STEAM_API_KEY = '73A28A895264D1BD677BF77BF8D570CA'; // встав свій ключ

passport.use(new SteamStrategy({
    returnURL: 'https://ua-kozaki.onrender.com/auth/steam/return',
    realm: 'https://ua-kozaki.onrender.com/',
    apiKey: STEAM_API_KEY
}, (identifier, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: 'kozaki', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    if (req.user) {
        res.send(`
            <h1>Привіт, ${req.user.displayName}</h1>
            <img src="${req.user.photos[0].value}">
        `);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), 
    (req, res) => res.redirect('/')
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));

