import throttle  from 'lodash.throttle';

//  посилання на форму 
const form = document.querySelector(".feedback-form");
//  посилання на поле відгука
const formTextArea = document.querySelector(".feedback-form textarea");
//  посилання на ІНПУТ ИМЕЙЛА  
const formInput = document.querySelector(".feedback-form input");
// СЛУХАЧ ФОРМИ
form.addEventListener("submit", submitWork );
// СЛУХАЧ ТЕКСТ АРЕА
formTextArea.addEventListener("input", throttle(inputWork, 500));
// СЛУХАЧ ІНПУТА ПОШТИ
formInput.addEventListener("input", throttle(inputWork, 500));
// ОБ'ЄКТ ДЛЯ ЗБЕРІГАННЯ 
const feedbackObj = {};
// виклик функції перевірки СХОВИЩА 
getFromStor();

// ОБРОБНИК Форми
function submitWork (event) {
// забороняю поведінку за замовчуванням 
event.preventDefault();
// ВИВОДЖУ ОБ'ЄКТ В КОНСОЛЬ 
console.log(feedbackObj);
// ОЧИШУЮ ПОЛЯ ФОРМИ;
event.target.reset();
// очищую СХОВИЩЕ
localStorage.removeItem("feedback-form-state")
}

// ОБРОБНИК ІНПУТА
function inputWork (event) {
// зберігаю данні введнеі в текстове поле 
feedbackObj[ event.target.name ] = event.target.value;
// НАПОВНЮЮ СХОВИЩЕ ОБ'ЄКТОМ
localStorage.setItem("feedback-form-state",  JSON.stringify(feedbackObj));
}
// ПЕРЕВІРКА ДАННИХ СХОВИЩА
function getFromStor() {
        const savedInlocalSt = localStorage.getItem("feedback-form-state");
        const savedInlocalStParse = JSON.parse(savedInlocalSt) ?? {};
               
        if (savedInlocalStParse)
        {
            //  оновлення В Dom  ТЕКСТ АРЕА
            formTextArea.value = savedInlocalStParse.message;
                    //  оновлення В Dom  ТЕКСТ ІНПУТА ІМЕЙЛА
            formInput.value = savedInlocalStParse.email;
        }
}


