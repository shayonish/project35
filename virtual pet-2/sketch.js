var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

 
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodStock.on("value",function(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
})
}

function draw() {
  foodObj.display();
  drawSprites();
  fedTime = database.ref("fedtime");
 
  textSize(15);
  if(lastFed>=12)
  {
  text("lastFed : "+lastFed%12+"PM" , 50 , 100);
  }
  else
  if(lastFed === 0)
  {
  text("lastFed : "+lastFed%12+"AM" , 350 , 30);
  }
}
text("lastFed : " +lastFed+ "AM" , 50 , 100);

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
