import boom1 from './assets/audio/boom1.mp3';
import boom4 from './assets/audio/boom4.mp3';
import boom6 from './assets/audio/boom6.mp3';
import boom8 from './assets/audio/boom8.mp3';

const BASE_URL = 'https://invasiongame.herokuapp.com/';

const resToJson = res => res.json();

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const mid = (min, max, num) => {
  if (num >= max) return max;
  if (num <= min) return min;
  return num;
}

const getRandomExplosionSound = () => {
  const explosionSounds = [boom1, boom4, boom6, boom8];
  const index = generateRandomNumber(0, explosionSounds.length);
  return explosionSounds[index];
}

export { resToJson, BASE_URL, generateRandomNumber, mid, getRandomExplosionSound };
