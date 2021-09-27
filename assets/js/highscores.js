$(document).ready(function() {
    const localStorageUtility = (action, value) => {
        if (action === 'set') {
            const highscores = JSON.parse(localStorage.getItem('highscores') ?? "[]");
            highscores.push(value);
            localStorage.setItem('highscores', JSON.stringify(highscores));
        } else if (action === 'get') {
            return JSON.parse(localStorage.getItem('highscores') ?? "[]");
        }
    };
    const highscores = localStorageUtility('get');
    console.log("highscores", highscores);
    const renderedHighscores = highscores.map((highscore) => {
        return (`
            <li class="hs-text">${highscore}</li>
        `);
    });
    $("#userscores")
    .empty()
    .html(renderedHighscores);
    $("#reset-highscores").click(() => {
        localStorage.setItem('highscores', JSON.stringify([]))
        window.location.href = 'highscores.html';
    });
});