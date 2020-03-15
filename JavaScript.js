(function($) {
    $(window).on('load', function() {
        $.instagramFeed({
            'username': 'fitstar_mrpl', //Имя пользователя
            'container': "#instafeed", //Контейнер для изображений
            'display_profile': false, //Отображение профиля
            'display_biography': false, //Отображение биографии
            'display_gallery': true, //Отображение галереи
            'styling': true, //Стандартные стили библиотеки
            'items': 8, //Количество изображений в галереи
            'items_per_row': 4, //Количество изображений в ряд
            'margin': 1 //Отступ между изображениями
        });
    });
})(jQuery);

window.addEventListener('scroll', function() {
    arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});

/**************************     form        **************************/

let inputTraining = document.getElementById("training");

let textMn = `                            <option>9.00 - Pole Dance</option>
                            <option>17.00 - Pole kids</option>
                            <option>18.00 - Pole Dance </option>
                            <option>18.00 - Фитнес </option>
                            <option>19.00 - TRX </option>
                            <option>19.00 - Streching </option>
`;

let textTu = `                            <option>9.00 - Фитнес</option>
                            <option>15.30 - Pole kids</option>
                            <option>16.30 - Pole kids </option>
                            <option>17.30 - Pole Dance </option>
                            <option>18.30 - Exotic </option>
`;

let textWe = `                            <option>9.00 - Streching</option>
                            <option>17.00 - Pole Dance</option>
                            <option>17.00 - Streching </option>
                            <option>18.00 - Pole Dance </option>
                            <option>18.00 - Фитнес </option>
                            <option>19.00 - TRX </option>
                            <option>19.00 - Streching </option>
`;

let textTh = `                            <option>9.00 - Фитнес</option>
                            <option>15.30 - Pole kids</option>
                            <option>16.30 - Pole kids </option>
                            <option>17.30 - Pole Dance </option>
                            <option>18.30 - Exotic </option>
`;

let textFr = `                            <option>9.00 - Exotic</option>
                            <option>17.00 - Pole kids</option>
                            <option>17.00 - Streching </option>
                            <option>18.00 - Pole Dance </option>
                            <option>18.00 - Streching </option>
                            <option>19.00 - TRX </option>
`;

let textSa = `                            <option>9.00 - Pole Dance</option>
                            <option>10.00 - Pole kids</option>
                            <option>11.00 - Streching </option>
`;

let inputTime = document.getElementById("time");

inputTraining.addEventListener("change", function() {
    inputTime.innerHTML = '';
    switch (inputTraining.value) {
        case "Понедельник":
            {
                let selectFragment = document.createRange().createContextualFragment(textMn);
                inputTime.append(selectFragment);
            }
            break;
        case "Вторник":
            {
                let selectFragment = document.createRange().createContextualFragment(textTu);
                inputTime.append(selectFragment);
            }
            break;
        case "Среда":
            {
                let selectFragment = document.createRange().createContextualFragment(textWe);
                inputTime.append(selectFragment);
            }
            break;
        case "Четверг":
            {
                let selectFragment = document.createRange().createContextualFragment(textTh);
                inputTime.append(selectFragment);
            }
            break;
        case "Пятница":
            {
                let selectFragment = document.createRange().createContextualFragment(textFr);
                inputTime.append(selectFragment);
            }
            break;
        case "Суббота":
            {
                let selectFragment = document.createRange().createContextualFragment(textSa);
                inputTime.append(selectFragment);
            }
            break;
    }
});

/*************************      buttons     ***********************/
let signUp = document.getElementById("signUp");
let signUp1 = document.getElementById("signUp1");
let signUp2 = document.getElementById("signUp2");
let cancel = document.getElementById("cancel");

signUp1.addEventListener("click", showForm);
signUp2.addEventListener("click", showForm);
cancel.addEventListener("click", hideForm);

function showForm(e) {
    e.preventDefault();
    signUp.hidden = false;
}

function hideForm(e) {
    e.preventDefault();
    signUp.hidden = true;
}

/********************* send form **********/
/***    Use this token to access the HTTP API:
        981033277:AAHH-NZrdSz6qiE8R5ai2c_vHjjWJPxxWn8
        "id":-1001384617917     *********/

let inputName = document.getElementById("inputName");
let tel = document.getElementById("tel");
let submit = document.getElementById("submit");
let dangerMessage = document.getElementById("danger");
submit.addEventListener("click", sendMessage);

//Отправляем текст в телеграм канал

function sendMessage(e, token, text, chatid) {
    e.preventDefault();
    var chatid = "-1001384617917";
    var token = "981033277:AAHH-NZrdSz6qiE8R5ai2c_vHjjWJPxxWn8";
    var text = `<b>FITSTAR</b> \n${inputName.value}  ${tel.value} \n${inputTraining.value}  ${inputTime.value}`;
    if (inputName.value == "" || tel.value == "") {
        dangerMessage.hidden = false;
    } else {
        var z = $.ajax({
                type: "POST",
                url: "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatid,
                data: "parse_mode=HTML&text=" + encodeURIComponent(text),
        });
        signUp.hidden = true;
        inputName.value = "";
        tel.value = "";
    }
};





/*****         map         ******/

var map;
function initMap() {
    var uluru = { lat: 47.105235, lng: 37.665586 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 16,
        styles: [
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });
    var contentString = 'Fitstar';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: "FITSTAR",
        icon: 'img/purple-stars.png'
    });
    infowindow.open(map, marker);
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

}
