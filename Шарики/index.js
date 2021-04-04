let field = document.querySelector('#field');
let img = document.querySelector('img');
let colors = ['green', 'red', 'blue', 'pink', 'gold'];
let array = [];
let omitted = 0;
let arrBaloons = [];

/*Каждый шарик имеет свою текущую координату, которая изменяется*/
let oldCoordsY = [];
let oldCoordsX = [];

/*Счётчик попаданий*/
window.score.innerHTML = '0';
let currentScore = 0;

/*Создаём обработчик события для движения иголки за курсором мыши по горизонтали*/
field.addEventListener('mousemove', () => {
    img.style.right = 625 - event.clientX + 'px';
    field.style.cursor = 'none';
});

/*Задаём скорость движения шариков и изменяем его каждые n секунд*/
let speed = 1;
setInterval(() => {speed += 0.125}, 2500);

/*Создаём массив с координатами*/
let arr = [];
for (let i = 1; i < 40; i++) {
    arr.push(`${i * 20}px`)
}

/*Создаём функцию рандомно выбирающую изначальную координату X*/
function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

/*Интервально создаём понемногу шариков, чтобы не перенагружать систему*/
setInterval(() => {
    /*Создаём шарики и задаём начальную позицию*/
    for (let i = 0; i < 5; i++) {
        let airBaloon = document.createElement('div');
        airBaloon.id = `airBaloon${k}`;
        array.push(airBaloon.id);
        airBaloon.classList.add('airBaloon');
        airBaloon.style.top = '400px';
        airBaloon.style.left = arrayRandElement(arr);
        airBaloon.style.background = arrayRandElement(colors);
        field.appendChild(airBaloon);
        oldCoordsY.push(airBaloon.getBoundingClientRect().top);
        oldCoordsX.push(airBaloon.getBoundingClientRect().right);
        arrBaloons.push(airBaloon);
    }
}, 500)

let func = (airBaloon, i) => {

        /*Шарики летают*/
    if (oldCoordsY[i] > -40) {
        airBaloon.style.transition = ''
        oldCoordsY[i] = oldCoordsY[i] - speed;
        airBaloon.style.position = 'absolute'
        airBaloon.style.top = oldCoordsY[i] + 'px';
    } else {
        airBaloon.remove();
    }


    /*Условие, при котором проверяется попадание кончика игры в шарик. В ходе тестирования пришел к выводу,
                            что такое мудрёное условие проверки самое подходящее*/

    if (oldCoordsY[i] < 50 && oldCoordsY[i] > 40) {
        if (oldCoordsX[i] > img.getBoundingClientRect().right - 15 && oldCoordsX[i] < img.getBoundingClientRect().right + 15) {
            oldCoordsY[i] = -50;
            airBaloon.style.display = 'none';

            /*Задаём градацию наград за шарики*/
            if (airBaloon.style.background == 'green') {
                window.score.innerHTML = +window.score.innerHTML + 1;
                currentScore++;
            } else if (airBaloon.style.background == 'red') {
                window.score.innerHTML = +window.score.innerHTML + 3;
                currentScore += 3;
            } else if (airBaloon.style.background == 'blue') {
                window.score.innerHTML = +window.score.innerHTML + 5;
                currentScore += 5;
            } else if (airBaloon.style.background == 'pink') {
                window.score.innerHTML = +window.score.innerHTML + 7;
                currentScore += 7;
            } else if (airBaloon.style.background == 'gold') {
                window.score.innerHTML = +window.score.innerHTML + 10;
                currentScore += 10;
            }

        }
    }

    /*Считаем пропущенные шарики*/
    if (oldCoordsY[i] > -40 && oldCoordsY[i] < -20) {
        omitted++;
        oldCoordsY[i] = -100;
    }

    airBaloon.style.position = 'absolute';
}

    /*Систематически вызываем нашу функцию сверху*/
        setInterval(() => {
            arrBaloons.map( (elem, index) => {
                return func(elem, index)
            });
        }, 5);


/*Наш таймер на одну минуту*/
let timer = document.querySelector('#timer');
let score = document.querySelector('.score');
timer.innerHTML = '60';
setInterval(() => {
    timer.innerHTML = +timer.innerHTML - 1;
}, 1000);

/*Конец игры по истечению одной минуты*/
setTimeout(() => {
    oldCoordsY = [];
    timer.style.display = 'none';
    score.style.left = '23%';
    score.innerHTML = `Игра окончена. Ваш счёт: ${currentScore} <br> <p style="color: red">Пропущено: ${omitted}<p>`;
}, 60000);
