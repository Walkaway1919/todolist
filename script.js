'use strict';
//modal
let modal = document.getElementById("my_modal");//подложка модального окна
let btn = document.getElementById("btn_modal_window");//кнопка открытия основного окна
let closeModal = document.querySelector(".close-modal-window");//кнопка закрытия основного окна
let modalEdit = document.getElementById("save-card");//подложка окна редактирования
let closeEdit = document.querySelector(".close-edit-card")//кнопка закрытия окна редактирования


//открываем основное модальное окно
const openModal = () =>{
   modal.style.display = "block";
   document.querySelector(".modal-input").value = "";
   document.querySelector(".modal-textarea").value = "";
   document.querySelector("#add-work").checked = false;
   document.querySelector("#add-study").checked = false;
   document.querySelector("#add-entertaiment").checked = false;
   document.querySelector("#add-family").checked = false;
}

document.addEventListener("click", function(e){
   if(e.target === btn){
      openModal(); 
   }
});
//закрываем основное модальное окно
closeModal.onclick = function () {
   modal.style.display = "none";
};

document.addEventListener("click", function(e){
   if(e.target === modal){
      modal.style.display = "none";
   }
});
// открываем окно редактирования

document.addEventListener("click", function(e){
   let parent = e.target.closest(".task-card");
   if(e.target.closest(".edit")){
      parent.classList.add('editable')
      modalEdit.style.display = "block";
      document.querySelector(".title-edit").value = parent.querySelector(".title-card").innerHTML;
      document.querySelector(".description-edit").value = parent.querySelector(".description-card").innerHTML;
      let workStatus = modalEdit.querySelector(".work input");
      let studyStatus = modalEdit.querySelector(".study input");
      let entertaimentStatus = modalEdit.querySelector(".entertaiment input");
      let familyStatus = modalEdit.querySelector(".family input");
      let tagBlock = parent.querySelector(".tags-card")
      let modalTag = modalEdit.querySelector(".modal-nav")
      workStatus.checked = (tagBlock.querySelector(".card-work")) ? true : false
      studyStatus.checked = (tagBlock.querySelector(".card-study")) ? true : false
      entertaimentStatus.checked = (tagBlock.querySelector(".card-entertaiment")) ? true : false
      familyStatus.checked = (tagBlock.querySelector(".card-family")) ? true : false;
      // modalTag.addEventListener("click", function(e){
      //    if(workStatus.checked === true){
      //       let workRound = document.createElement('div')
      //       workRound.classList.add("card-work", "round")
      //       tagBlock.append(workRound)
      //    }else(workRound.remove())
      // })
   }
})
// закрываем окно редактирования

closeEdit.onclick = function () {
   modalEdit.style.display = "none";
   document.querySelectorAll(".task-card.editable").forEach( item => {
      item.classList.remove("editable")
   } )
}
window.onclick = function (event) {
   if (event.target == modalEdit) {
       modalEdit.style.display = "none";
       document.querySelectorAll(".task-card.editable").forEach( item => {
         item.classList.remove("editable")
      } )
   }
}

//сохраняем изменения после редактирования
let save = document.querySelector(".save-edit");
document.addEventListener("click", function(e){
   if(e.target === save){
      //console.log(e.target.closest(".modal-nav"))
      let editableCard = document.querySelector(".editable");
      editableCard.querySelector(".title-card").innerHTML = document.querySelector(".title-edit").value;
      editableCard.querySelector(".description-card").innerHTML = document.querySelector(".description-edit").value;
      
      editableCard.classList.remove('tag-study', 'tag-entertaiment', 'tag-family', 'tag-work')
      const tagCloud = editableCard.querySelector(".tags-card")
      tagCloud.innerHTML = ''
      
      let workStatus = modalEdit.querySelector(".work input").checked;
      if(workStatus){
         editableCard.classList.add('tag-work')
         tagCloud.innerHTML += '<div class="ln card-work round" data-tooltip="work"></div>';
      }
      let studyStatus = modalEdit.querySelector(".study input").checked;
      if(studyStatus){
         editableCard.classList.add('tag-study')
         tagCloud.innerHTML += '<div class="ln card-study round" data-tooltip="study"></div>';
      }
      let entertaimentStatus = modalEdit.querySelector(".entertaiment input").checked;
      if(entertaimentStatus){
         editableCard.classList.add('tag-entertaiment')
         tagCloud.innerHTML += '<div class="ln card-entertaiment round" data-tooltip="entertaiment"></div>';
      }
      let familyStatus = modalEdit.querySelector(".family input").checked;
      if(familyStatus){
         editableCard.classList.add('tag-family')
         tagCloud.innerHTML += '<div class="ln card-family round" data-tooltip="family"></div>';
      }
      modalEdit.style.display = "none"
      localRefresh()
   }
})

function localRefresh(){

   const cardList = []
   
   document.querySelectorAll(".task-card").forEach( item => {

      const title = item.querySelector(".title-card").innerHTML
      const content = item.querySelector(".description-card").innerHTML
      let doneStatus = item.querySelector(".card-done input").checked
      doneStatus = (doneStatus) ? "checked" : "";
      const isWork = item.classList.contains('tag-work');
      const isStudy = item.classList.contains('tag-study');
      const isEntertaiment = item.classList.contains('tag-entertaiment');
      const isFamily = item.classList.contains('tag-family');

      cardList.push({
         title,
         content,
         doneStatus,
         tags:{
            isWork,
            isStudy,
            isEntertaiment,
            isFamily,
         }
      })
   })
   localStorage.setItem('todoList', JSON.stringify( cardList ) )
}

function createCard( title, content, doneStatus, tags = {}){
   const { isWork = false, isStudy = false, isEntertaiment = false, isFamily = false } = tags
   let tagsHtml = '';
   let cardClasses = ['task-card']

   let newCard = document.createElement('div');
   if( isWork ) {
      cardClasses.push('tag-work')
      tagsHtml += '<div class="ln card-work round" data-tooltip="work"></div>';
   }
   if( isStudy ) {
      cardClasses.push('tag-study')
      tagsHtml += '<div class="ln card-study round" data-tooltip="study"></div>'
   }
   if( isEntertaiment ) {
      cardClasses.push('tag-entertaiment')
      tagsHtml += '<div class="ln card-entertaiment round" data-tooltip="entertaiment"></div>'
   }
   if( isFamily ) {
      cardClasses.push('tag-family')
      tagsHtml += '<div class="ln card-family round" data-tooltip="family"></div>'
   }   
   if( doneStatus === 'checked' ) {
      cardClasses.push('closed')
      newCard.style.textDecoration="line-through"
   }

   newCard.className = cardClasses.join(" ");
   newCard.innerHTML = `<div class="card-header">
         <div class="drag-card">#</div>
         <div class="title-card">${title}</div>
         <div class="menu-card">
         <ul class="dropdown-menu">
            <li class="ln edit border-bottom">Edit...</li>
            <li class="ln delete">Delete...</li>
         </ul>
         </div>
      </div>
      <div class="description-card">${content}</div>
      <div class="tags-card">${tagsHtml}</div>
      <div class="done-task">
         <label class="task-custom card-done">
            <input type="checkbox" ${doneStatus} name="done">
            <span class="ln card-done">Done</span>
         </label>
      </div>`
      newCard.querySelector(".card-done input").addEventListener('change', function(e){
         const parent = e.target.closest(".task-card")
         let status = e.target.checked

         if( status ){
            parent.style.textDecoration="line-through"
            parent.classList.add('closed')
         }else{
            parent.style.textDecoration="none"
            parent.classList.remove('closed')
         }
         localRefresh()
      });
   document.querySelectorAll('.task-card').forEach(el => console.log(el))
   return newCard
}


let add = document.querySelector(".add-modal")
let mainContainer = document.querySelector(".main")
let card = document.querySelector(".task-card");
add.onclick = function(){
   let newCard = createCard(
      document.querySelector(".modal-input").value, 
      document.querySelector(".modal-textarea").value,
      "",
      {
         isWork: document.querySelector("#add-work").checked, 
         isStudy: document.querySelector("#add-study").checked,
         isEntertaiment: document.querySelector("#add-entertaiment").checked,
         isFamily: document.querySelector("#add-family").checked,
      },
   );
  
   mainContainer.append(newCard);

   localRefresh()
   
}

let hideDone = document.querySelector(".hide-done input")

 document.querySelectorAll(".card-done input").forEach( input => {
   input.addEventListener("change", function(e){
      console.log( e.target )
      //  if( e.target.classList.contains("card-done")){
      //    let parent = e.target.closest(".task-card");
      //    let status = parent.querySelector(".card-done input").checked
         
      //    if( status ){
      //       parent.style.textDecoration="none"
      //       parent.classList.remove('closed')
      //    }else{
      //       parent.style.textDecoration="line-through"
      //       parent.classList.add('closed')
      //    }
      //    localRefresh()
      // }
   })

});

 document.querySelector("#hide-done-cards").addEventListener( 'change', function(e){
   let status = e.target.checked
   let cardsDone = document.querySelectorAll(".task-card.closed")
   cardsDone.forEach( card => {
      card.style.display = status ? 'none' : 'block'
   })
 })


 //menu
 document.addEventListener("click", function(e){

   const parent = e.target.closest(".menu-card")
    if( !parent){
      document.querySelectorAll(".dropdown-menu").forEach( el => {
         el.classList.remove('opened')
      } )
    } else {
      document.querySelectorAll(".menu-card").forEach( el => {
         if( parent !== el ){
            el.querySelector(".dropdown-menu").classList.remove('opened')
         }
      } )
    }
   
   const parentCard = e.target.closest(".menu-card")
    if( parentCard ){
      const dropdown = parentCard.querySelector(".dropdown-menu")
      if( dropdown.classList.contains('opened') ){
         dropdown.classList.remove('opened')
      } else {
         dropdown.classList.add('opened')
      }
    }
 })

document.addEventListener("click", function(e){
   let parent = e.target.closest(".task-card");
   if(e.target.closest(".delete")){
      parent.remove()
      localRefresh()
   }
})

//фильтр карточек

document.addEventListener("click", function(e){
   let parent = e.target.closest("[data-filter]");
   
   if( parent ){
      if( parent.classList.contains('filtered') ){
         parent.classList.remove('filtered')
         const allItems = document.querySelectorAll(".task-card")
         allItems.forEach( i => {i.style.display = 'block';})
      } else {
         document.querySelectorAll(".nav__elem").forEach( el => { el.classList.remove('filtered')})
         parent.classList.add('filtered')
         const filterData = parent.dataset.filter
         if( filterData === 'notag' ){
            const allItems = document.querySelectorAll(".task-card")
            allItems.forEach( i => {i.style.display = 'none';})
            const filtered = document.querySelectorAll(".task-card:not(.tag-work,.tag-study,.tag-entertaiment,.tag-family)")
            filtered.forEach( i => {i.style.display = 'block';})
         } else {
            const cardClass = ".tag-" + filterData
            const allItems = document.querySelectorAll(".task-card")
            const filtered = document.querySelectorAll(".task-card" + cardClass)
            allItems.forEach( i => {i.style.display = 'none';})
            filtered.forEach( i => {i.style.display = 'block';})
         }
      }
   }
})


document.addEventListener('DOMContentLoaded', function(){

   let cardList = JSON.parse( localStorage.getItem('todoList') )
   
   if(!cardList) cardList = []

   cardList.forEach((card) => {

      let newCard = createCard( card.title, card.content, card.doneStatus, card.tags);
      mainContainer.append(newCard);

   })
   changeLang()
})
const filler = document.createElement("div")
filler.classList.add("card-filler")

const dragObject = {
   filler: filler,
   element: null,
   cloned: null,
   dragger: null,
   hover: [null, null],
   calcPosition: function( element, [posX, posY] ){
      if( !element ) return this.hover[0]
      const leftRange = element.offsetLeft + element.offsetWidth / 2
      const topRange = element.offsetTop + element.offsetHeight / 2

     
     if( window.width > 599 ){

        if( posX > leftRange ){
           return 'right'
         }
         return 'left'
      } else {
         
        if( posY > topRange ){
         return 'right'
       }
       return 'left'
      }
   },
   drag: function(e) {
      if( !this.cloned ){
         this.cloned = this.element.cloneNode(true)
         this.cloned.classList.add('cloned')
         this.element.closest(".main").append( this.cloned )
      }
      this.element.style.display = 'none'
      // this.element.after(this.filler)
      // console.log('movement', this)

      const hoveredCard = e.target.closest(".task-card")
      const hoveredPos = this.calcPosition( hoveredCard, [e.pageX, e.pageX])

      this.cloned.style.left = e.pageX - 40 + 'px'
      this.cloned.style.top = e.pageY - 40 + 'px'

      if( hoveredCard && (this.hover[0] !== hoveredPos || this.hover[1] !== hoveredCard) ){
         this.hover = [
            hoveredPos,
            hoveredCard
         ];
         this.moveCard( this.filler )
      }
   },
   moveCard( elem ){
      if( this.hover[0] === 'left'){
         this.hover[1].before(elem)
      } else {
         this.hover[1].after(elem)
      }
   },
   unDrag(){
      if( this.element ){
         document.removeEventListener('mousemove', this.dragger)
         this.moveCard( this.element )
         this.element.style.display = 'block'
         this.filler.remove()
         this.cloned.remove()
         this.element = null
         this.cloned = null
         this.hover = [
            null,
            null
         ];
         localRefresh()
      }
   }
}
document.addEventListener('mousedown', function(e){
   const dragElem = e.target.closest(".drag-card")
   if( dragElem ){
      console.log('нажали')
      e.preventDefault()
      const element = dragElem.closest(".task-card")
      dragObject.element = element
      dragObject.dragger = dragObject.drag.bind(dragObject)
      document.addEventListener('mousemove', dragObject.dragger)
      // dragObject.downX = e.pageX;
      // dragObject.downY = e.pageY;
      // console.log(dragObject)
   }
})

document.addEventListener('mouseup', function(e){
   console.log('отжали')
   dragObject.unDrag.apply(dragObject)
})

