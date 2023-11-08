// http-server -c-1

// Bibliografia: https://p5js.org/es/reference/
//               https://p5js.org/es/examples/

//Nota: A lo largo de este sketch es posible encontrar algunos snippets
//      tomados del la bibliografia mencionada.

let particulasSG;
let particulasSGClassic;
let particulaswMF;

let sg;
let sgWithout;
let sgClassic;

// Para escoger una de las tres opciones
let radio;
let fr=30;

function setup() {
  createCanvas(800, 400);
  frameRate(fr);

  // Opciones de visualizacion
  radio = createRadio();
  radio.option('1', 'Without Magnetic Field');
  radio.option('2', 'Classical Prediction');
  radio.option('3', 'Observation');
  radio.style('width', '460px');
  radio.selected('3');
  radio.position(167, 360);
  textAlign(CENTER);

  // Posicionamiento de los elementos de los sistemas
  let position = createVector(80,200); // coordenadas x, y del sistema completo (ordenado de izq-der, arri-abaj)
  let size = createVector(55,55);  // tamaño relativo de los elementos w, h
  
  // Para mostrar el arreglo completo, i.e.  horno, sistema magnetico, pantalla, vista frontal de la pantalla 
  sg        = new SGsystem(position, size, 'SG Observación');
  sgWithout = new SGsystemWithout(position, size, 'Sistem Withuot');
  sgClassic = new SGsystemClassic(position, size, "Classical Prediction");

  // Para que las particulas sean mostradas
  particulasSG        = new SGParticleSystem();
  particulasSGClassic = new SGCParticleSystem();
  particulaswMF       = new SGwMFParticleSystem();
}

function draw() {
  background(245);

  let val = radio.value(); 
  if (val==='1'){
    sgWithout.run();              // muestra el arreglo
    particulaswMF.addParticle(); // añade particular 
    particulaswMF.run();        // muestra las particulas y direcciona
  }
  if (val==='2'){
    sgClassic.run();
    particulasSGClassic.addParticle();
    particulasSGClassic.run();
  }
  if (val==='3'){
    sg.run();
    particulasSG.addParticle();
    particulasSG.run();
  }  
}

let SGsystem = function(position,size,texto){
  this.position = position.copy();
  this.size     = size.copy();
  this.texto    = texto;
};

SGsystem.prototype.run = function(){
  let horno    = new Oven(this.position, this.size);
  let mag      = new Mag_sistem(this.position,this.size);
  let pantalla = new Plate(this.position, this.size);
  let screen   = new Screen(this.position, this.size);
  let beam     = new AtomBeam(this.position, this.size);
  let title    = new Title(this.position, this.texto)

  title.display();
  horno.display();  
  pantalla.display();
  screen.display();
  beam.display(); 
  mag.display();
};

let SGsystemWithout = function(position,size,texto){
  this.position = position.copy();
  this.size     = size.copy();
  this.texto    = texto;
};

SGsystemWithout.prototype.run = function(){
  let horno    = new Oven(this.position, this.size);
  let pantalla = new Plate(this.position, this.size);
  let screen   = new Screen(this.position, this.size);
  let beam     = new AtomBeam(this.position, this.size);
  let title    = new Title(this.position, this.texto)

  title.display();
  horno.display();  
  pantalla.display();
  screen.display();
  beam.display();  
};

let SGsystemClassic = function(position,size,texto){
  this.position = position.copy();
  this.size     = size.copy();
  this.texto    = texto;
};

SGsystemClassic.prototype.run = function(){
  let horno    = new Oven(this.position, this.size);
  let mag      = new Mag_sistem(this.position,this.size);
  let pantalla = new Plate(this.position, this.size);
  let screen   = new Screen(this.position, this.size);
  let beam     = new AtomBeam(this.position, this.size);
  let title    = new Title(this.position, this.texto)

  title.display();
  horno.display();  
  pantalla.display();
  screen.display();
  beam.display(); 
  mag.display();
};

// Titulo de la simulacion
let Title = function(position, texto){
  this.position = position.copy();
  this.texto = texto;
};

Title.prototype.display = function(){ // funcion para mostrar el titulo
  fill(30);
  stroke(40);
  strokeWeight(0.9);
  textSize(22);
  text('Stern-Gerlach Experiment', width/2, height/10);
};

// Horno del sistema SG
let Oven = function(position,size){ 
  this.position = position.copy();
  this.size = size.copy();
};

Oven.prototype.display = function(){ // funcion para mostrar el horno
  fill(30);
  stroke(60);
  strokeWeight(0.9);
  textSize(15);
  text('Oven', this.position.x, this.position.y - 0.7*this.size.y);

  fill(182,216,236);
  stroke(150);
  strokeWeight(1);
    beginShape();
      vertex(this.position.x - 0.5*this.size.x, this.position.y + 0.5*this.size.y);
      vertex(this.position.x + 0.5*this.size.x, this.position.y + 0.5*this.size.y);
      vertex(this.position.x + 0.5*this.size.x, this.position.y - 0.5*this.size.y);
      vertex(this.position.x - 0.5*this.size.x, this.position.y - 0.5*this.size.y);
    endShape(CLOSE);
};

// campo magnetico del sistema
let Mag_sistem = function(position,size){
  this.position = position.copy();
  this.size = size.copy();
};

Mag_sistem.prototype.display = function(){ // muestra los polos magneticos y las lineas de campo
  let space = 2*this.size.x; 
  this.origen = this.position.add(space,0);
  let gap  = 1.5*this.size.y;
  let newW = 0.62*this.size.x;
  let newH = 0.62*this.size.y;

  fill(20);
  stroke(150);
  strokeWeight(0.8);
  textSize(12);
  text('N', this.origen.x, this.origen.y - 0.35*gap);

  fill(224, 108, 83);
  stroke(150);
  beginShape(); // Polo Norte
    vertex(this.origen.x - 0.5*newW, this.origen.y - 0.5*gap - 1.4*newH);
    vertex(this.origen.x + 0.5*newW, this.origen.y - 0.5*gap - 1.4*newH);
    vertex(this.origen.x + 0.5*newW, this.origen.y - 0.5*gap - 0.4*newH);
    vertex(this.origen.x, this.origen.y - 0.5*gap);
    vertex(this.origen.x - 0.5*newW, this.origen.y - 0.5*gap - 0.4*newH);
  endShape(CLOSE);

  fill(20);
  stroke(150);
  textSize(12);
  text('S', this.origen.x, this.origen.y + 0.45*gap);

  fill(127, 163, 189);
  stroke(150);
  beginShape(); // Polo Sur
    vertex(this.origen.x, this.origen.y + 0.5*gap);
    vertex(this.origen.x + 0.5*newW, this.origen.y + 0.5*gap + 0.4*newH);
    vertex(this.origen.x + 0.5*newW, this.origen.y + 0.5*gap + 1.4*newH);  
    vertex(this.origen.x - 0.5*newW, this.origen.y + 0.5*gap + 1.4*newH);  
    vertex(this.origen.x - 0.5*newW, this.origen.y + 0.5*gap + 0.4*newH);
  endShape(CLOSE);

  noFill(); // linea de campo
  stroke(150);
  strokeWeight(1.5);
  curve(this.origen.x + 4*newW, this.origen.y - 0.6*gap, this.origen.x - 0.45*newW, this.origen.y - 0.62*gap, this.origen.x - 0.45*newW, this.origen.y + 0.62*gap, this.origen.x + 4*newW, this.origen.y + 0.7*gap);

  noFill(); // linea de campo
  stroke(150);
  strokeWeight(1.5);
  curve(this.origen.x + 3*newW, this.origen.y - 0.6*gap, this.origen.x - 0.20*newW, this.origen.y - 0.52*gap, this.origen.x - 0.20*newW, this.origen.y + 0.52*gap, this.origen.x + 3*newW, this.origen.y + 0.7*gap);

  noFill(); // linea de campo
  stroke(150);
  strokeWeight(1.5);
  curve(this.origen.x - 4*newW, this.origen.y - 0.6*gap, this.origen.x + 0.45*newW, this.origen.y - 0.62*gap, this.origen.x + 0.45*newW, this.origen.y + 0.62*gap, this.origen.x - 4*newW, this.origen.y + 0.7*gap);

  noFill(); // linea de campo
  stroke(150);
  strokeWeight(1.5);
  curve(this.origen.x - 3*newW, this.origen.y - 0.6*gap, this.origen.x + 0.20*newW, this.origen.y - 0.52*gap, this.origen.x + 0.20*newW, this.origen.y + 0.52*gap, this.origen.x - 3*newW, this.origen.y + 0.7*gap);

  fill(150); // flechas del direccion de campo
  beginShape(); // Direccion lineas de campo 1
    vertex(this.origen.x - 1.1*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x - 0.9*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x - 1*newW, this.origen.y + 0.1*newH);    
  endShape(CLOSE);

  fill(150);
  beginShape(); // Direccion lineas de campo 2
    vertex(this.origen.x - 0.7*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x - 0.5*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x - 0.6*newW, this.origen.y + 0.1*newH);    
  endShape(CLOSE);

  fill(150);
  beginShape(); // Direccion lineas de campo 3
    vertex(this.origen.x + 1.1*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x + 0.9*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x + 1*newW, this.origen.y + 0.1*newH);    
  endShape(CLOSE);

  fill(150);
  beginShape(); // Direccion lineas de campo 4
    vertex(this.origen.x + 0.7*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x + 0.5*newW, this.origen.y - 0.1*newH);
    vertex(this.origen.x + 0.6*newW, this.origen.y + 0.1*newH);    
  endShape(CLOSE);
};

// Screen del sistema
let Plate = function(position,size){
  this.position = position.copy();
  this.size = size.copy();
};

Plate.prototype.display = function(){ // funcion para mostrar el screen
  let space = 6.5*this.size.x; 
  this.origen = this.position.add(space,0);

  fill(20);
  textSize(15);
  text('Screen', this.origen.x, this.origen.y - 1.2*this.size.y);

  fill(50);
  beginShape();
    vertex(this.origen.x - 0.5*this.size.x, this.origen.y - 0.5*this.size.y);
    vertex(this.origen.x + 0.5*this.size.x, this.origen.y - 0.9*this.size.y);
    vertex(this.origen.x + 0.5*this.size.x, this.origen.y + 0.9*this.size.y);
    vertex(this.origen.x - 0.5*this.size.x, this.origen.y + 0.5*this.size.y);
  endShape(CLOSE);  
};

// vista frontal del screen (pantalla)
let Screen = function(position,size){
  this.position = position.copy();
  this.size = size.copy();
};

Screen.prototype.display = function(){ // funcion para mostrar el screen en su vista frontal
  let space   = 9*this.size.x; 
  this.origen = this.position.add(space,0);
 
  fill(20);
  textSize(15);  
  text('Front View', this.origen.x, this.origen.y - 1.2*this.size.y);  
  
  fill(50);
  beginShape();
    vertex(this.origen.x - 0.9*this.size.x, this.origen.y - 0.9*this.size.y);
    vertex(this.origen.x + 0.9*this.size.x, this.origen.y - 0.9*this.size.y);
    vertex(this.origen.x + 0.9*this.size.x, this.origen.y + 0.9*this.size.y);
    vertex(this.origen.x - 0.9*this.size.x, this.origen.y + 0.9*this.size.y);
  endShape(CLOSE);  
};

// posible camino de los atomos
let AtomBeam = function(position,size){ 
  this.origen = position.copy();
  this.size = size.copy();
};

AtomBeam.prototype.display = function(){ // muetra la linea del posible camino de los atomos
  stroke(224, 108, 83);
  strokeWeight(2);
  line(this.origen.x + 0.7*this.size.x, this.origen.y, this.origen.x + 6.5*this.size.x, this.origen.y);
};

// creacion de particula
let SGParticle = function(){
  let v1 = createVector(2*width/3+42,height/3+42);
  let v2 = createVector(2*width/3+42,2*height/3-40);
  let vectors = [v1, v2];
  let vector = random(vectors)
  let r=random(-8, 8);
  let theta=random(-PI,PI);
  this.x= vector.x + r*cos(theta);
  this.y= vector.y + r*sin(theta);  
};

SGParticle.prototype.run = function(){
  this.display();
};

SGParticle.prototype.display = function(){ // configuracion posicion de la particula creada
  stroke(224, 108, 83);
  strokeWeight(2);
  fill(127);
  ellipse(this.x,this.y, 0.5, 0.5);
};

// sistema de particulas
let SGParticleSystem = function() {
  this.particles = [];
};

SGParticleSystem.prototype.addParticle = function() { // añade particulas al sistema de particulas
  this.particles.push(new SGParticle());//this.origin
};

SGParticleSystem.prototype.run = function() { // muestra cada particula 
  for (let i = this.particles.length-1; i >= 0; i--) {    
    let p = this.particles[i];
    p.run();
  }
};

let SGCParticle = function(){
  let v1 = createVector(2*width/3+42,height/3+95);
  let vector = v1
  let e = 0.99;
  let a = random(5,30);
  let theta=random(-PI,PI);
  let r = a*(1-e*e)/(1+e*sin(theta))
  this.x = vector.x + r*cos(theta);
  this.y = vector.y + r*sin(theta);  
};

SGCParticle.prototype.run = function(){
  this.display();
};

SGCParticle.prototype.display = function(){
  stroke(224, 108, 83);
  strokeWeight(2);
  fill(127);
  ellipse(this.x,this.y, 0.5, 0.5);
};

let SGCParticleSystem = function() {
  this.particles = [];
};

SGCParticleSystem.prototype.addParticle = function() {
  this.particles.push(new SGCParticle());//this.origin
};

SGCParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {    
    let p = this.particles[i];
    p.run();
  }
};

let SGwMFParticle = function(){//position
  let v1 = createVector(2*width/3+42,height/3+65);
  let vector = v1
  let theta=random(-PI,PI);
  let r = random(-8, 8);
  this.x = vector.x + r*cos(theta);
  this.y = vector.y + r*sin(theta);  
};

SGwMFParticle.prototype.run = function(){
  this.display();
};

SGwMFParticle.prototype.display = function(){
  stroke(224, 108, 83);
  strokeWeight(2);
  fill(127);
  ellipse(this.x,this.y, 0.5, 0.5);
};

let SGwMFParticleSystem = function() {
  this.particles = [];
};

SGwMFParticleSystem.prototype.addParticle = function() {
  this.particles.push(new SGwMFParticle());//this.origin
};

SGwMFParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {    
    let p = this.particles[i];
    p.run();
  }
};