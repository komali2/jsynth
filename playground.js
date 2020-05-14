
if (document.readyState !== 'complete') {  // Loading hasn't finished yet
  window.addEventListener('DOMContentLoaded', app);
  window.addEventListener('DOMContentLoaded', setUpListeners);
} else {  // `DOMContentLoaded` has already fired
  app();
  setUpListeners();
}

const oscillators = {};

function app() {
  // create web audio api context
  window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // create Oscillator node
  osc1();
}

function osc1() {
  const oscillator = window.audioCtx.createOscillator();
  oscillators.osc1 = oscillator;
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, window.audioCtx.currentTime); // value in hertz
  oscillator.connect(window.audioCtx.destination);
}

function stop(osc) {
  oscillators[osc].stop();
}

function start(osc) {
  oscillators[osc].start();
}

function setUpListeners(osc) {
  document.querySelector(`${osc} button.start`).addEventListener('click', () => {
    stop(osc);
  });
  document.querySelector(`${osc} button.start`).addEventListener('click', () => {
    start(osc);
  });
}
