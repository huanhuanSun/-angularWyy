export function sliderEvent(e:Event){
    e.preventDefault();
    e.stopPropagation();
  }

export function getElementOffset(el:HTMLElement):{top:number,left:number}{
  if (!el.getClientRects().length) {
    return {
      top:0,
      left:0
    }
  }
  
  const rect = el.getBoundingClientRect();
  const win = el.ownerDocument.defaultView; // 当前元素所在的doucument元素

  return {
    top:rect.top + win.pageYOffset,
    left:rect.left + win.pageXOffset
  }
}