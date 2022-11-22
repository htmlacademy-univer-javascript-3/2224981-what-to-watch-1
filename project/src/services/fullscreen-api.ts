/*
const RequestFullScreenMethods = {
  Standart: 'requestFullscreen',
  Webkit: 'webkitRequestFullScreen',
  Moz: 'mozRequestFullScreen',
  Ms: 'msRequestFullscreen'
} as const;

const ExitFullScreenMethods = {
  Standart: 'exitFullscreen',
  Webkit: 'webkitExitFullscreen',
  Moz: 'mozCancelFullScreen',
  Ms: 'msExitFullscreen'
} as const;

const CheckFullScreenMethods = {
  Standart: 'fullscreenElement',
  Webkit: 'webkitFullscreenElement',
  Moz: 'mozFullScreenElement',
  Ms: 'msFullscreenElement'
} as const;
*/

export function requestFullScreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  /*
  else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }*/
}

export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  /*
  else if ('mozCancelFullScreen' in document) {
    document['mozCancelFullScreen']();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }*/
}

export function checkFullScreen(){
  return document.fullscreenElement; /*||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;*/
}
