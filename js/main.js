const cards_template = [
    { status: null, original: 'computer', translations: ['ком\'ютер'], img: 'img/computer.jpg' },
    { status: null, original: 'car', translations: ['авто', 'автомобіль', 'машина'], img: 'img/car.jpg' },
    { status: null, original: 'cube', translations: ['куб'], img: 'img/cube.jpg' },
    { status: null, original: 'boy', translations: ['хлопець', 'хлопчик', 'хлоп'], img: 'img/boy.jpg' },
    { status: null, original: 'language', translations: ['мова'], img: 'img/language.jpg' },
    { status: null, original: 'translate', translations: ['переклади', 'перекласти'], img: 'img/translate.jpg' },
    { status: null, original: 'net', translations: ['мережа', 'сітка'], img: 'img/net.jpg' },
    { status: null, original: 'spider', translations: ['павук'], img: 'img/spider.jpg' },
    { status: null, original: 'light', translations: ['світло'], img: 'img/light.jpg' },
    { status: null, original: 'bottle', translations: ['пляшка'], img: 'img/bottle.jpg' },
];

let cards = [];

let data = {
    correct: 0,
    incorrect: 0,
    pos: 0,
}

function shuffleCards() {
    cards = [...cards_template];
    let currIdx = cards.length, rndIdx;
    while (currIdx !== 0) {
        rndIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [cards[currIdx], cards[rndIdx]] = [cards[rndIdx], cards[currIdx]];
    }
}

function nextCard() {
    data.pos++;
    loadContents();
}

function prevCard() {
    data.pos--;
    loadContents();
}

function isAllCardsNotNull() {
    let cnt = 0;
    cards.forEach(e => {
        if (e.status !== null) ++cnt;
    });

    return cnt === 10;
}

function check() {
    let answer = $('#enter input').val().toLowerCase().trim();
    $('#enter input').val(null);
    if (cards[data.pos].translations.includes(answer)) {
        data.correct++;
        cards[data.pos].status = true;
    } else {
        data.incorrect++;
        cards[data.pos].status = false;
    }

    if (isAllCardsNotNull()) {
        $('#again-modal .text').text(`Ви вгадали ${data.correct}/10!`);
        $('#again-modal').show();
        return;
    }

    data.pos++;
    loadContents();
}

function disableEnter() {
    $('#enter button').prop('disabled', true);
    $('#enter input').prop('disabled', true);
}

function enableEnter() {
    $('#enter button').prop('disabled', false);
    $('#enter input').prop('disabled', false);
}

function loadContents(idx = null) {
    $('#stat > .correct').text(`Вірно ${data.correct}/10`);
    $('#stat > .incorrect').text(`Невірно ${data.incorrect}/10`);

    if (idx === null) idx = data.pos;

    $('#guess-block img').attr('src', cards[idx].img);
    $('#guess-block img').attr('alt', cards[idx].original);
    $('#guess-block .word').text(cards[idx].original);

    if (cards[idx].status === true) {
        $('#guess-block').addClass('correct');
        disableEnter();
    } else if (cards[idx].status === false) {
        $('#guess-block').addClass('incorrect');
        disableEnter();
    } else {
        enableEnter();
        $('#guess-block').removeClass('correct');
        $('#guess-block').removeClass('incorrect');
    }

    $('#card-nav .left').off('click');
    $('#card-nav .right').off('click');
    if (idx === 0) {
        $('#card-nav .left').addClass('blocked');
        $('#card-nav .left').off('click');
        $('#card-nav .right').click(nextCard);
    } else if (idx === 9) {
        $('#card-nav .right').addClass('blocked');
        $('#card-nav .right').off('click');
        $('#card-nav .left').click(prevCard);
    } else {
        $('#card-nav .left').removeClass('blocked');
        $('#card-nav .right').removeClass('blocked');
        $('#card-nav .left').off('click');
        $('#card-nav .right').off('click');
        $('#card-nav .right').click(nextCard);
        $('#card-nav .left').click(prevCard);
    }

    $('#card-nav .card-pos').text(`${idx+1}/10`);
}

$('#again-modal').hide();
$('#again-modal button').click(() => window.location.reload());
shuffleCards();
$('#submit').click(check);
$(document).on('keypress', (ev) => {
    if (ev.defaultPrevented) return;
    if (ev.key === 'Enter') check();
});
loadContents();
