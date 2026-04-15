let synth;
let filter;
let cakeButton;

let notes = ['C4', 'C4', 'D4', 'C4', 'F4', 'E4'];
let current = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  // cake image
  cakeButton = createImg('assets/cake.png', 'cake');
  cakeButton.size(150, 150);

  // Position cake
  cakeButton.position(width / 2 - 75, height / 2 - 75);

  // When cake is clicked produces sound
  cakeButton.mousePressed(startSong);

  // Create synth
  synth = new p5.MonoSynth();

  // Create filter
  filter = new p5.LowPass();

  // Connect synth to filter
  synth.disconnect();
  synth.connect(filter);
}

function draw() {
  background(220, 240, 255);

  // Mouse controls filter
  let freq = map(mouseX, 0, width, 200, 3000);
  filter.freq(freq);

  fill(0);
  text("Click the cake\nMove mouse to change tone", width/2, 50);
}

function startSong() {
  userStartAudio();
  playSong();
}

function playSong() {
  synth.play(notes[current], 0.5, 0, 0.4);

  current = (current + 1) % notes.length;

  setTimeout(playSong, 600);
}