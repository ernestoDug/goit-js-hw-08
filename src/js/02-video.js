import Player from '@vimeo/player';



// отримуємо посиланя на ифрейм
const iframe = document.querySelector('iframe');
// створюємо новий екземпляр 
const player = new Player(iframe);
// слухаємо та обробляємо
const timeUp = player.on('timeupdate', function(event) {
// console.log(event.seconds);
// записуємо час в змінну
const secundsPlay = event.seconds;
// закидаємо до сховища
const currentTime = localStorage.setItem("videoplayer-current-time", secundsPlay);
});
// отримую з сховища 
  
  
const favoriteAr = JSON.parse(localStorage.getItem("videoplayer-current-time")) ?? [];

// витягаю час методом бібліотеки для відтворення
if(favoriteAr){
    player.setCurrentTime(favoriteAr)
};
    