var database;
var food1;
var dog;
var canvas;

function preload(){
    dogImage  = loadImage("Images/Dog.png");
    happyDogImage = loadImage("Images/Happy.png");
    milkBottleImage = loadImage("Images/milk.png");
}

function setup(){
    canvas = createCanvas(400,400);
    database = firebase.database();

    var foodLeft = database.ref('food');
    foodLeft.on("value",foodAmount, showError);


    dog = createSprite(200, 320, 20, 20);
    dog.addImage(dogImage);
    dog.scale = 0.25;

    addFoods = createButton("add more food");
    addFoods.position(700,95);
    addFoods.mousePressed(addFood);
}

function draw(){
    background ("white");

    textSize(20);
    text("Press Up Arrow To Feed The Dog", 50, 50);

    if(keyDown(UP_ARROW)){
        dog.addImage(happyDogImage);
        foodFed(food1);
    }

    bottleNumber(food1);
    drawSprites();
}

function foodAmount(data){
    food1 = data.val();
}

function foodFed(writeData){
    writeData = writeData-1;
    if(writeData < 0){
        writeData = 0;
        dog.addImage(dogImage);
    }
    database.ref('/').update({
        food : writeData
    })
}

function addFood(){
    food1++;
    database.ref('/').update({
        food: food1
    })
}

function bottleNumber(writeData){
    var x = 80;
    var y = 100;
    for (i = 0; i<writeData; i++){
        if(x > 200){
            var x = 80;
            var y = 150;
        }
        imageMode(CENTER);
        image(milkBottleImage, x, y, 20, 40);
        x = x + 20
    }
}

function showError(){
    console.log("error in reading the files");
}