document.querySelectorAll('.slider').forEach(slider)

function slider(el: any) {
  let thumb = el.querySelector('.js-thumb__marker');
  let thumbler = el.querySelector('.slider__thumb');
  let track = el.querySelector('.slider__track');
  let rightEdge = track.clientWidth - (thumbler.clientWidth*2);
  let step = Math.round(rightEdge*25/100);
  let value = 0;
  let result = 0;
  
  thumb.addEventListener('dragstart', () => {
      return false;
  })  

  thumb.addEventListener('mousedown', startSelect);
  track.addEventListener('click', onMouseMove);

  function startSelect(event: any) {
    event.preventDefault();
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', endSelect);
  }

  function onMouseMove(event: any) {
    let newLeft = Math.round((event.clientX - thumb.clientWidth)/step)*step;
    if (newLeft < 0) {
        newLeft = 0;
    }
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    value = newLeft;
    result = Math.round(value*100/rightEdge);
    (<HTMLElement>thumbler).style.left = newLeft + 'px';
    (<HTMLElement>el.querySelector('.slider__title')).textContent = "Total: " + result + "%";
    (<HTMLElement>el.querySelector('.tag__mark')).textContent = result.toString();
    (<HTMLElement>el.querySelector('.tag__mark')).style.left = newLeft - 15 + 'px';
    (<HTMLElement>el.querySelector('.track__bar_selected')).style.right = rightEdge - newLeft + 'px';
  }

  function endSelect() {
      (<HTMLInputElement>el.querySelector('.slider input')).value = result.toString();
      el.removeEventListener('mouseup', endSelect);
      el.removeEventListener('mousemove', onMouseMove);
  }

}