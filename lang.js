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
        "ru": "без тега",
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
    "start-app" : {
        "ru": "Начать",
        "en": "Get started",
    },
    "plan": {
        "ru": "Упорядочь свою жизнь!",
        "en": "Plan your life!",
    },
    "start-card-done": {
        "ru": "Готово!",
        "en": "Done!",
    },
    "title-card": {
        "ru": "Поставить приложение todo",
        "en": "Download todo app",
    },
    "description-card": {
        "ru": "первый шаг к лучшей жизни",
        "en": "the first step for better life",
    }

}
// const select = document.querySelector('select');
const langs = ["ru", "en"]
// select.addEventListener('change', function(){
//     let lang = select.value;
//     location.href = window.location.pathname + "#" + lang;
//     changeLang()
// })

const changeLang = (old = true) =>{
    // let hash = window.location.hash.substr(1) || 'en';
    const hash = localStorage.getItem('lang') || 'en';
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

    if( old ){
        if( hash === 'en' ){
            document.querySelector(".new-change-lang").classList.remove('new-change-lang_active')
        } else {
            document.querySelector(".new-change-lang").classList.add('new-change-lang_active')
        }
    } else {
        if( hash === 'en' ){
            document.querySelector(".lang-chooser__en").checked = true
        } else {
            document.querySelector(".lang-chooser__ru").checked = true
        }
    }
}

