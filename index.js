
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
  const oscillator = audioCtx.createOscillator();
  oscillators.osc1 = oscillator;
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  stop();
}

function stop() {
  window.audioCtx.suspend();
}

function resume() {
  window.audioCtx.resume();
}

function setUpListeners() {
  document.querySelector('button.stop').addEventListener('click', () => {
    stop();
  });
  document.querySelector('button.resume').addEventListener('click', () => {
    resume();
  });
}
