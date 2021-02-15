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
    }

}
// const select = document.querySelector('select');
const langs = ["ru", "en"]
// select.addEventListener('change', function(){
//     let lang = select.value;
//     location.href = window.location.pathname + "#" + lang;
//     changeLang()
// })

const changeLang = () =>{
    let hash = window.location.hash.substr(1);
    for(let key in langObj){
        document.querySelectorAll('.ln.' + key).forEach(function(el) {
            if( langObj[key].mode && langObj[key].mode === 'placeholder'){
                el.placeholder = langObj[key][hash];
            } else {
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
changeLang()

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
