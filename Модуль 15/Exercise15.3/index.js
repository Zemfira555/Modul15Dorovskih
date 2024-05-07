const wsUri = 'wss://echo-ws-service.herokuapp.com';

const output = document.getElementById("output");
const input = document.querySelector('.input_1');
const btnSend = document.querySelector('.btn');



let websocket = new WebSocket(wsUri);


function writeMessage(usersText, type = false) {
    const html = `<span class="${type ? 'message-original' : 'message-answer'}">${usersText}</span>`
    output.innerHTML +=html;
    
}



btnSend.addEventListener('click', () => {
    const message = input.value;
    writeMessage(message, true);
    websocket.send(message);
    input.value = '';
    
});

websocket.onmessage = function(evt) {
        writeMessage(evt.data);
    }

//Локация

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

//Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

//Функция при успешном получении геолокации
const succsess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается Вашим браузером';
    } else {
        status.textContent = 'Определение местоположения...';
        navigator.geolocation.getCurrentPosition(succsess, error);
    }

});


