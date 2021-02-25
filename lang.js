const langObj = {
    "hide-done-task": {
       "ru": "Скрыть выполненные задачи",
       "en": "Hide completed tasks",
    },
    "work" : {
        "ru": "работа",
        "en": "work",
    },
    "study" : {
        "ru": "учеба",
        "en": "study",
    },
    "entertaiment" : {
        "ru": "досуг",
        "en": "entertaiment",
    },
    "family" : {
        "ru": "семья",
        "en": "family",
    },
    "notag" : {
        "ru": "без категорий",
        "en": "notag",
    },
    "close-modal-window" : {
        "ru": "Отмена",
        "en": "Cancel",       
    },
    "add-modal" : {
        "ru": "Добавить",
        "en": "Add",
    },
    "title" : {
        "ru": "Заголовок",
        "en": "Title",
    }, 
    "title-input" : {
        mode: "placeholder",
        "ru": "добавьте заголовок...",
        "en": "add a title...",
        
    }, 
    "description": {
        "ru": "Описание",
        "en": "Description",  
    },
    "description-textarea": {
        mode: "placeholder",
        "ru": "добавьте описание...",
        "en": "add a description...",    
    },
    "tags" : {
        "ru": "Категории",
        "en": "Tags",  
    },
    "card-done": {
        "ru": "Готово",
        "en": "Done",
    },
    "edit": {
        "ru": "Редактировать...",
        "en": "Edit..."
    },
    "delete": {
        "ru": "Удалить...",
        "en": "Delete...",
    },
    "save-change": {
        "ru": "Сохранить",
        "en": "Save",
    },
    "card-work" : {
        mode: "data-tooltip",
        "ru": "работа",
        "en": "work",
    },
    "card-study" : {
        mode: "data-tooltip",
        "ru": "учеба",
        "en": "study",
    },
    "card-entertaiment" : {
        mode: "data-tooltip",
        "ru": "досуг",
        "en": "entertaiment",
    },
    "card-family" : {
        mode: "data-tooltip",
        "ru": "семья",
        "en": "family",
    },

}
// const select = document.querySelector('select');
const langs = ["ru", "en"]
// select.addEventListener('change', function(){
//     let lang = select.value;
//     location.href = window.location.pathname + "#" + lang;
//     changeLang()
// })

const changeLang = () =>{
    let hash = window.location.hash.substr(1) || 'en';
    for(let key in langObj){
        document.querySelectorAll('.ln.' + key).forEach(function(el) {
            if( langObj[key].mode && langObj[key].mode === 'placeholder'){
                el.placeholder = langObj[key][hash];
            }if(langObj[key].mode && langObj[key].mode === 'data-tooltip'){
                el.dataset.tooltip = langObj[key][hash];
            }
            else {
                el.innerHTML = langObj[key][hash];
            }
        })
    }
    if( hash === 'en' ){
        document.querySelector(".new-change-lang").classList.remove('new-change-lang_active')
    } else {
        document.querySelector(".new-change-lang").classList.add('new-change-lang_active')
    }
}

document.querySelectorAll(".new-change-lang__lang").forEach( el => el.addEventListener('click', function(e){
    let lang = e.target.dataset.lang;
    location.href = window.location.pathname + "#" + lang;
    changeLang()
}))
document.querySelector(".new-change-lang__toggler").addEventListener('click', function(e){
    let hash = window.location.hash.substr(1);
    location.href = window.location.pathname + "#" + (hash === 'en' ? 'ru' : 'en');
    changeLang()
})

document.onmouseover = function(event) {
    let target = event.target;
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;
    //console.log(window.location.hash.substr(1))

};