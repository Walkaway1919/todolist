const filler = document.createElement("div")
const bin = document.querySelector('.bin-picture');
filler.classList.add("card-filler")

bin.addEventListener('click', function(){
   alert(1)
})

const dragObject = {
   filler: filler,
   shouldDelete: false,
   element: null,
   cloned: null,
   dragger: null,
   hover: [null, null],
   calcPosition: function( element, [posX, posY] ){
      if( !element ) return this.hover[0]
      const leftRange = element.offsetLeft + element.offsetWidth / 2
      const topRange = element.offsetTop + element.offsetHeight / 2
     
      if( window.innerWidth > 599 ){
         return posX > leftRange ? 'right' : 'left'
      } else {
         return posY > topRange ? 'right' : 'left'
      }
   },
   drag: function(e) {
      if( e.target.closest(".bin-picture")) {
         this.shouldDelete = true
         return;
      } else {
         this.shouldDelete = false
      }

      if( !this.cloned ){
         this.cloned = this.element.cloneNode(true)
         this.cloned.classList.add('cloned')
         this.element.closest(".main")?.append( this.cloned )
      }
      requestAnimationFrame(() => {
         this.element.style.pointerEvents = 'none';
         this.element.style.position = 'absolute';
         this.element.style.top = e.pageY+'px';
         this.element.style.left = e.pageX + 'px';
         this.element.style.transform = 'scale(0.7) translate(-150px, -80px)';
      })

      
      const hoveredCard = e.target.closest(".task-card")
      const hoveredPos = this.calcPosition( hoveredCard, [e.pageX, e.pageY])

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
         if( this.shouldDelete) {
            this.element.remove();
         } else {
            this.moveCard( this.element )
            this.element.style.position = 'static';
            this.element.style.top = 0;
            this.element.style.left = 0;
            this.element.style.transform = 'none';
         }
         console.dir( this.element )
         this.filler.remove()
         this.cloned.remove()
         this.element = null
         this.cloned = null
         this.hover = [
            null,
            null
         ];
         app.localRefresh()
      }
   }
}

document.addEventListener('mousedown', function(e){
   const dragElem = e.target.closest(".drag-card")
   if( dragElem ){
      e.preventDefault()
      const element = dragElem.closest(".task-card")
      dragObject.element = element
      dragObject.dragger = dragObject.drag.bind(dragObject)
      document.addEventListener('mousemove', dragObject.dragger)
   }
})

document.addEventListener('mouseup', function(e){
   dragObject.unDrag.apply(dragObject)
})


