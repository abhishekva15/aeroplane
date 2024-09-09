import { Howl, Howler } from "howler";
const BgMusic = "/sounds/bg_music.webm";
const BetAudio = "/sounds/bet_audio.webm";
const CashoutAudio = "/sounds/cashout_audio.webm";
const FlewawayAudio = "/sounds/flewaway_audio.webm";
const ReadytakeoffAudio = "/sounds/readytakeoff_audio.webm";

let bgMusic;
let betSound;
let cashoutSound;
let flewawaySound;
let readyTakeOffSound;
let animationEnabled = true;


export function loadSounds() {
  bgMusic = new Howl({
    src: [BgMusic],
    html5: false,
    volume: 0.5,
    loop: true,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  betSound = new Howl({
    src: [BetAudio],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  cashoutSound = new Howl({
    src: [CashoutAudio],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  readyTakeOffSound = new Howl({
    src: [ReadytakeoffAudio],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  flewawaySound = new Howl({
    src: [FlewawayAudio],
    html5: false,
    volume: 0.7,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });
}

export function playBgMusic() {
  if (!bgMusic.playing()) {
    bgMusic.play();
  }
}

export function pauseBgMusic() {
  if (bgMusic.playing()) {
    bgMusic.pause();
  }
}

export function playBetSound() {
  if (!betSound.playing()) {
    betSound.play();
  }
}

export function pauseBetSound() {
  if (betSound.playing()) {
    betSound.pause();
  }
}

export function playCashoutSound() {
  cashoutSound.play();
}

export function pauseCashoutSound() {
  cashoutSound.pause();
}

export function playFlewawaySound() {
  if (!flewawaySound.playing()) {
    flewawaySound.play();
  }
}

export function pauseFlewawaySound() {
  if (flewawaySound.playing()) {
    flewawaySound.pause();
  }
}

export function playReadyTakeOffSound() {
  if (!readyTakeOffSound.playing()) {
    readyTakeOffSound.play();
  }
}

export function pauseReadyTakeOffSound() {
  if (readyTakeOffSound.playing()) {
    readyTakeOffSound.pause();
  }
}

export function playSound() {
  betSound.mute(false);
  cashoutSound.mute(false);
  flewawaySound.mute(false);
  readyTakeOffSound.mute(false);
}

export function pauseSound() {
  betSound.mute(true);
  cashoutSound.mute(true);
  flewawaySound.mute(true);
  readyTakeOffSound.mute(true);
}

export function setAnimationEnabled(isEnabled) {
  animationEnabled = isEnabled;
}

export function isAnimationEnabled() {
  return animationEnabled === false ? false : true;
}

export const setMuted = (muted) => {
  Howler.mute(muted);
};
loadSounds();
