'use strict';
const modal = document.getElementById("my_modal");//подложка модального окна
const btn = document.getElementById("btn_modal_window");//кнопка открытия основного окна
const closeModal = document.querySelector(".close-modal-window");//кнопка закрытия основного окна
const modalEdit = document.getElementById("save-card");//подложка окна редактирования
const closeEdit = document.querySelector(".close-edit-card")//кнопка закрытия окна редактирования
const save = document.querySelector(".save-edit");

const add = document.querySelector(".add-modal")
const mainContainer = document.querySelector(".main")
const card = document.querySelector(".task-card");
const hideDone = document.querySelector(".hide-done input")

const app = {
   //открываем основное модальное окно
   openModal(){
      modal.style.display = "block";
      document.querySelector(".modal-input").value = "";
      document.querySelector(".modal-textarea").value = "";
      document.querySelector("#add-work").checked = false;
      document.querySelector("#add-study").checked = false;
      document.querySelector("#add-entertaiment").checked = false;
      document.querySelector("#add-family").checked = false;
   },
   // сохраняет состояние в localstorage
   localRefresh(){
      const cardList = []
      document.querySelectorAll(".task-card").forEach( item => {
   
         const title = item.querySelector(".title-card").innerHTML
         const content = item.querySelector(".description-card").innerHTML
         const doneStatus = item.querySelector(".card-done input").checked ? "checked" : "";
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
   },
   // создает карточку из данных
   createCard( title, content, doneStatus, tags = {}){
      const { isWork = false, isStudy = false, isEntertaiment = false, isFamily = false } = tags
      const cardClasses = ['task-card']
      if( doneStatus === 'checked' ) cardClasses.push('closed')
      
      const tagsHtml = [];
      const newCard = document.createElement('div');
      if( isWork ) {
         cardClasses.push('tag-work')
         tagsHtml.push('<div class="ln card-work round" data-tooltip="work"></div>')
      }
      if( isStudy ) {
         cardClasses.push('tag-study')
         tagsHtml.push('<div class="ln card-study round" data-tooltip="study"></div>')
      }
      if( isEntertaiment ) {
         cardClasses.push('tag-entertaiment')
         tagsHtml.push('<div class="ln card-entertaiment round" data-tooltip="entertaiment"></div>')
      }
      if( isFamily ) {
         cardClasses.push('tag-family')
         tagsHtml.push('<div class="ln card-family round" data-tooltip="family"></div>')
      }

      newCard.className = cardClasses.join(" ");
      newCard.innerHTML = `<div class="card-header">
            <div class="drag-card"></div>
            <div class="title-card">${title}</div>
            <div class="menu-card">
            <ul class="dropdown-menu">
               <li class="ln edit border-bottom">Edit...</li>
               <li class="ln delete">Delete...</li>
            </ul>
            </div>
         </div>
         <div class="description-card">${content}</div>
         <div class="tags-card">${tagsHtml.join("")}</div>
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
            parent.classList.add('closed')
         } else {
            parent.classList.remove('closed')
         }
         app.localRefresh()
      });
      return newCard
   }
}

// фильтр по карточкам - выполнено/не выполнено
document.querySelector("#hide-done-cards").addEventListener( 'change', function(e){
   const status = e.target.checked
   const cardsDone = document.querySelectorAll(".task-card.closed")
   cardsDone.forEach( card => {
      card.style.display = status ? 'none' : 'block'
   })
})

document.addEventListener("click", function(e){
   // открытие-закрытие меню карточки
   const menuCard = e.target.closest(".menu-card")
   const parentCard = e.target.closest(".task-card");
   if( !menuCard){
      document.querySelectorAll(".dropdown-menu").forEach( el => {
         el.classList.remove('opened')
      } )
   } else {
      const dropdown = menuCard.querySelector(".dropdown-menu")
      if( dropdown.classList.contains('opened') ){
         dropdown.classList.remove('opened')
      } else {
         dropdown.classList.add('opened')
      }
      document.querySelectorAll(".menu-card").forEach( el => {
         if( menuCard !== el ){
            el.querySelector(".dropdown-menu").classList.remove('opened')
         }
      } )
   }
   // удаление карточки
   if(e.target.closest(".delete")){
      parentCard.remove()
      app.localRefresh()
      return false
   }

   if(e.target === btn){
      e.preventDefault()
      app.openModal();
      return false;
   }
   //закрываем основное модальное окно
   if(e.target === closeModal || e.target === modal){
      e.preventDefault()
      modal.style.display = "none";
      return false;
   }
   // открываем окно редактирования
   if(e.target.closest(".edit")){
      e.preventDefault();
      let parent = e.target.closest(".task-card");
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
      
      return false;
   }

   // закрываем окно редактирования
   if ( e.target === closeEdit || e.target == modalEdit ) {
      e.preventDefault();
      modalEdit.style.display = "none";
      document.querySelectorAll(".task-card.editable").forEach( item => {
         item.classList.remove("editable")
      } )
      return false
   }
   //сохраняем изменения после редактирования
   if(e.target === save){
      e.preventDefault();
      const editableCard = document.querySelector(".editable");
      editableCard.querySelector(".title-card").innerHTML = document.querySelector(".title-edit").value;
      editableCard.querySelector(".description-card").innerHTML = document.querySelector(".description-edit").value;
      
      editableCard.classList.remove('tag-study', 'tag-entertaiment', 'tag-family', 'tag-work')
      const tagCloud = editableCard.querySelector(".tags-card")
      tagCloud.innerHTML = ''
      
      const allTags = ['work', 'study', 'entertaiment', 'family']
      allTags.forEach(tagName => {
         let tagStatus = modalEdit.querySelector(`.${tagName} input`).checked;
         if( tagStatus ){
            editableCard.classList.add(`tag-${tagName}`)
            tagCloud.innerHTML += `<div class="ln card-${tagName} round" data-tooltip="${tagName}"></div>`;
         }
      })
      modalEdit.style.display = "none"
      app.localRefresh()
      return false;
   }
   // добавление новой карточки
   if( e.target === add ){
      e.preventDefault()
      let newCard = app.createCard(
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
      modal.style.display = "none";
      app.localRefresh();
      changeLang()
      return false;
   }
   // фильтр карточек
   const filterEl = e.target.closest("[data-filter]");
   if( filterEl ){
      e.preventDefault()
      if( filterEl.classList.contains('filtered') ){
         filterEl.classList.remove('filtered')
         const allItems = document.querySelectorAll(".task-card")
         allItems.forEach( i => {i.style.display = 'block';})
      } else {
         document.querySelectorAll(".nav__elem").forEach( el => { el.classList.remove('filtered')})
         filterEl.classList.add('filtered')
         const filterData = filterEl.dataset.filter
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
      return false;
   }
});

document.addEventListener("mouseover", function(event) {
   let target = event.target;
   let tooltipHtml = target.dataset.tooltip;
   if (!tooltipHtml) return;
});

document.addEventListener('DOMContentLoaded', function(){

   let cardList = JSON.parse( localStorage.getItem('todoList') )
   
   if(!cardList) cardList = []

   cardList.forEach((card) => {

      let newCard = app.createCard( card.title, card.content, card.doneStatus, card.tags);
      mainContainer.append(newCard);

   })
   changeLang()
})
