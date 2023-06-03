import throttle  from 'lodash.throttle';

// - отримую посилання на форму 
const form = document.querySelector(".feedback-form");
// - отримую посилання на поле відгука
const formTextArea = document.querySelector(".feedback-form textarea");
// - отримую посилання на кнопку 
const formInput = document.querySelector(".feedback-form input");
// - чипляю слухачів
form.addEventListener("submit", submitWork );
formTextArea.addEventListener("input", throttle(inputWork, 500));
formInput.addEventListener("input", throttle(inputWork, 500));

// ОБ'ЄКТ ДЛЯ ЗБЕРІГАННЯ 
const feedbackObj = {};

// виклик функції перевірки даних в локал сторидж 
getFromStor();


// - прописую обробника для форми
function submitWork (event) {
// забороняю поведінку за замовчуванням 
event.preventDefault();
// ОЧИШУЮ ПОЛЯ ФОРМИ;
event.target.reset();
// очищую локал сторидж 
localStorage.removeItem("feedback-form-state")
}

// прописую обробника для текстового поля відгука
function inputWork (event) {
// зберігаю данні введнеі в текстове поле 
feedbackObj[ event.target.name ] = event.target.value;
const feedbackObjJASON = JSON.stringify(feedbackObj);
// додаю до сховища отриманий текст
localStorage.setItem("feedback-form-state", feedbackObjJASON);
}

// - функція перевірки  даних в локал сторидж 
function getFromStor() {
    const savedInlocalSt = localStorage.getItem("feedback-form-state");
    if (savedInlocalSt)
    {
    //  оновлення Dom 
    formTextArea.value = savedInlocalSt;
    }
}


// form.addEventListener("input", (event) => {console.log("вот цл", event.target)});