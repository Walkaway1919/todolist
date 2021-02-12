'use strict';
//modal
let modal = document.getElementById("my_modal");//подложка модального окна
let btn = document.getElementById("btn_modal_window");//кнопка открытия основного окна
let closeModal = document.querySelector(".close_modal_window");//кнопка закрытия основного окна
let modalEdit = document.getElementById("save-card");//подложка окна редактирования
let closeEdit = document.querySelector(".close_edit_card")//кнопка закрытия окна редактирования


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
   if(e.target.closest("#edit")){
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
         tagCloud.innerHTML += '<div class="card-work round"></div>';
      }
      let studyStatus = modalEdit.querySelector(".study input").checked;
      if(studyStatus){
         editableCard.classList.add('tag-study')
         tagCloud.innerHTML += '<div class="card-study round"></div>';
      }
      let entertaimentStatus = modalEdit.querySelector(".entertaiment input").checked;
      if(entertaimentStatus){
         editableCard.classList.add('tag-entertaiment')
         tagCloud.innerHTML += '<div class="card-entertaiment round"></div>';
      }
      let familyStatus = modalEdit.querySelector(".family input").checked;
      if(familyStatus){
         editableCard.classList.add('tag-family')
         tagCloud.innerHTML += '<div class="card-family round"></div>';
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
      tagsHtml += '<div class="card-work round"></div>';
   }
   if( isStudy ) {
      cardClasses.push('tag-study')
      tagsHtml += '<div class="card-study round"></div>'
   }
   if( isEntertaiment ) {
      cardClasses.push('tag-entertaiment')
      tagsHtml += '<div class="card-entertaiment round"></div>'
   }
   if( isFamily ) {
      cardClasses.push('tag-family')
      tagsHtml += '<div class="card-family round"></div>'
   }   
   if( doneStatus === 'checked' ) {
      cardClasses.push('closed')
      newCard.style.textDecoration="line-through"
   }

   newCard.className = cardClasses.join(" ");
   newCard.innerHTML = `<div class="card-header">
         <div class="title-card">${title}</div>
         <div class="menu-card">
         <ul class="dropdown-menu">
            <li id="edit" class="border-bottom">Edit...</li>
            <li id="delete">Delete...</li>
         </ul>
         </div>
      </div>
      <div class="description-card">${content}</div>
      <div class="tags-card">${tagsHtml}</div>
      <div class="done-task">
         <label class="task-custom card-done">
            <input type="checkbox" ${doneStatus} name="done">
            <span class="card-done">Done</span>
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
   if(e.target.closest("#delete")){
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

})