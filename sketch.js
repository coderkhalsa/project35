//Create variables here
var oreo,oreoImg,happyImg,database
var food
var foodStock
var foodObj , feed , addFood , fedTime, lastFed
function preload()
{
	//load images here
  oreoImg= loadImage("images/dogImg.png")	
happyImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 400);
  database= firebase.database()
  oreo = createSprite(250,300,150,150)
  oreo.addImage("hungry",oreoImg)
  oreo.addImage("happy",happyImg)
  oreo.scale= 0.15
  foodObj = new Food()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
feed = createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)
addFood = createButton("add food")
addFood.position(800,95)
addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87)
foodObj.display()
fedTime = database.ref("FeedTime")
fedTime.on("value",function(data){
  lastFed = data.val()
})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("last fed: "+lastFed%12+"pm",350,30)
}
else if(lastFed==0){
  text("last fed: 12 am",350,30)
}
else {
  text("last fed: "+lastFed+"am",350,30)
}
 


  drawSprites();
  //add styles here

}

function readStock(data){
  food = data.val()
  foodObj.updateFoodStock(food)


}

function feedDog(){
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   
  }
  database.ref("/").update({
    "Food":foodObj.getFoodStock(),
    "FeedTime": hour()
   })
}

function addFoods(){
  food++
  database.ref("/").update({
    Food:food
  })
}

