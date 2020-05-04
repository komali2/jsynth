
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
  osc2();
}

function osc2() {
  const oscillator = window.audioCtx.createOscillator();
  oscillators.osc2 = oscillator;
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, window.audioCtx.currentTime); // value in hertz
  oscillator.connect(window.audioCtx.destination);
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

function setUpListeners() {
  document.querySelector('.synth-one button.stop').addEventListener('click', () => {
    stop('osc1');
  });
  document.querySelector('.synth-one button.start').addEventListener('click', () => {
    start('osc1');
  });
}
