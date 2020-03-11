import './styles/styles.css';
import Game from './game';

const ctx = document.getElementById('screen').getContext('2d');
const WIDTH = 800, HEIGHT = 600;
const game = new Game(WIDTH, HEIGHT);