
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
  oscillators.osc1 = new Synth(1);
}


function attachListeners(osc) {
  console.log(osc);
  document.querySelector(`.${osc} button.stop`).addEventListener('click', () => {
    oscillators[osc].stopOsc();
  });
  document.querySelector(`.${osc} button.start`).addEventListener('click', () => {
    oscillators[osc].startOsc();
  });
  document.querySelector(`.${osc} button.set-wave`).addEventListener('click', () => {
    oscillators[osc].setWave();
  });
  document.querySelectorAll(`.${osc} button.volume`).forEach( (el) => {
    console.log(el);
      // el.addEventListener('click', (e) => {
      //   const direction = e.toElement.dataset.direction;
      //   oscillators[osc].volumeIterate(direction);
      // });
  });
}
function setUpListeners() {
  Object.keys(oscillators).forEach(osc => attachListeners(osc));
}

class Synth {
  constructor(id) {
    this.id = id;
    this.createOsc();
    this.createGainNode();
    this.connectNodes();
  }
  createOsc() {
    this.oscillator = window.audioCtx.createOscillator();
    this.oscillator.type = 'square';
    this.oscillator.frequency.setValueAtTime(440, window.audioCtx.currentTime); // value in hertz
    this.oscillator.start();
  }
  createGainNode() {
    this.gain = window.audioCtx.createGain();
  }
  connectNodes() {
    // this.oscillator.connect(this.gain);
    this.gain.connect(window.audioCtx.destination);
  }
  stopOsc() {
    this.oscillator.disconnect(this.gain);
  }
  startOsc() {
    this.oscillator.connect(this.gain);
  }
  volumeUp() {
    const currentVolume = this.gain.gain.value;
    this.gain.gain.setValueAtTime(currentVolume + .1, window.audioCtx.currentTime);
  }
  volumeDown() {
    const currentVolume = this.gain.gain.value;
    this.gain.gain.setValueAtTime(currentVolume + .1, window.audioCtx.currentTime);
  }
  volumeIterate(direction) {
    switch (direction) {
      case 'up':
        this.volumeUp();
        break;
      case 'down':
        this.volumeDown();
        break;
    }
  }
  setWave() {
    const realA = Number(document.querySelector(`.${"osc1"} input[name="realA"]`).value);
    const realB = Number(document.querySelector(`.${"osc1"} input[name="realB"]`).value);
    const imagA = Number(document.querySelector(`.${"osc1"} input[name="imagA"]`).value);
    const imagB = Number(document.querySelector(`.${"osc1"} input[name="imagB"]`).value);
    const wave = new Wave(realA, realB, imagA, imagB).wave;
    this.oscillator.setPeriodicWave(wave);
  }
}

class Wave {
  constructor(realA, realB, imagA, imagB) {
    this.realList = new Float32Array(2);
    this.imagList = new Float32Array(2);
    this.realList[0] = realA;
    this.realList[1] = realB;
    this.imagList[0] = imagA;
    this.imagList[1] = imagB;
    this.wave = window.audioCtx.createPeriodicWave(this.realList, this.imagList, { disableNormalization: true });
  }
}
