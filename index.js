const card3d = document.querySelector(".card3d");
const taskCard = document.querySelector(".task-card");
const nameInpeut = document.querySelector(".name")

nameInpeut.addEventListener("change", function(){
    localStorage.setItem('name', nameInpeut.value);
})
var localValue = localStorage.getItem('name')
// if( localStorage.getItem("name") ){
//     window.location.replace(window.location + "app.html");
// }

card3d.addEventListener('mousemove', function(e){
    card3d.classList.remove('loaded')
    const x = -(card3d.offsetLeft + card3d.offsetWidth/2 - e.pageX);
    const degX = x / card3d.offsetWidth * 30
    const y = -(card3d.offsetTop + card3d.offsetHeight/2 - e.pageY);
    const degY = y / card3d.offsetHeight * 30
    taskCard.setAttribute("style", `transform: rotateY(${degX}deg) rotateX(${-degY}deg)`)
})

card3d.addEventListener('mouseout', function(e){
    taskCard.setAttribute("style", "transform: rotateY(0deg) rotateX(0deg);")
})

document.addEventListener("DOMContentLoaded", function(){
    card3d.classList.add('loaded')
});


const languages = ['ru', 'en']
languages.forEach( lang => {
    document.querySelector(`.lang-chooser__input_${lang}`).addEventListener('click', function(e){
        localStorage.setItem('lang', lang)
        console.log(lang)
        changeLang(false)
    })
} )