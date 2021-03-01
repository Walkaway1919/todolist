const card3d = document.querySelector(".card3d");
const taskCard = document.querySelector(".task-card");
const nameInpeut = document.querySelector(".name")

localStorage.setItem('name', nameInpeut.value);
var localValue = localStorage.getItem('name')
// if( localStorage.getItem("name") ){
//     window.location.replace(window.location + "app.html");
// }
console.log(localValue)

card3d.addEventListener('mousemove', function(e){
    card3d.classList.remove('loaded')
    const x = -(card3d.offsetLeft + card3d.offsetWidth/2 - e.pageX);
    const degX = x / card3d.offsetWidth * 30
    const y = -(card3d.offsetTop + card3d.offsetHeight/2 - e.pageY);
    const degY = y / card3d.offsetHeight * 30
    taskCard.setAttribute("style", `transform: rotateY(${degX}deg) rotateX(${-degY}deg)`)
    // if(!e.target.classList.contains(taskCard)){
    //     taskCard.removeAttribute("style", "transform: rotateY("+x+"deg) rotateX("+y+"deg);-webkit-transform: rotateY("+x+"deg) rotateX("+y+"deg);-moz-transform: rotateY("+x+"deg) rotateX("+y+"deg)")
    // }
})

card3d.addEventListener('mouseout', function(e){
    taskCard.setAttribute("style", "transform: rotateY(0deg) rotateX(0deg);")
})

document.addEventListener("DOMContentLoaded", function(){
    card3d.classList.add('loaded')
});

let en = document.querySelector(".lang-chooser__en");
let ru = document.querySelector(".lang-chooser__ru");
