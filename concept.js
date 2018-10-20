//////////////////////////////////////////////////
//////////////////Variables///////////////////////
//////////////////////////////////////////////////

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var interval = []
var amount = 100
var amountR = 100
var score = 0

var enemies = []
var hero;
var zoom = 4
var lasers = []
var ratings = []

//////////////////////////////////////////////////
//////////////Creating The Hero///////////////////
//////////////////////////////////////////////////

function heroClass()
	{
		this.x
		this.y
		
		this.h = 7
		this.w = 7
		
		this.up = false
		this.down = false
		this.left = false
		this.right = false
		this.shoot = false
		
		this.draw = function()
			{
				ctx.fillStyle = "white"
				ctx.fillRect(this.x,this.y,this.w,this.h)
			}
			
		this.move = function()
			{
				if(this.up)this.y -= 1.1;
				if(this.down)this.y += 1.1;
				if(this.left)this.x-= 1.1; 
				if(this.right)this.x += 1.1;
				
				if(this.up && this.shoot){createLaser(this.x,this.y,1,0)}
				if(this.right && this.shoot){createLaser(this.x,this.y,1,1)}
				if(this.down && this.shoot){createLaser(this.x,this.y,1,2)}
				if(this.left && this.shoot){createLaser(this.x,this.y,1,3)}
				else
					{
						if(this.shoot)createLaser(this.x,this.y,1,Math.floor(Math.random()*4))
					}
			}
	}

function createHero()
	{
		hero = new heroClass()
		hero.x = canvas.width/2
		hero.y = canvas.height/2
	}

//////////////////////////////////////////////////
///////////////Creating Ratings//////////////////
//////////////////////////////////////////////////

function ratingClass()
	{
		this.x
		this.y
		
		this.h = 4
		this.w = 4
		
		this.up = false
		this.down = false
		this.left = false
		this.right = false
		this.shoot = false
		
		this.draw = function()
			{
				ctx.fillStyle = "yellow"
				ctx.fillRect(this.x,this.y,this.w,this.h)
			}
			
		this.collision = function()
			{
				for (var i = 0; i < ratings.length; i++) {
					
				
				if(ratings[i].x+4 > hero.x && ratings[i].x < hero.x+7 && ratings[i].y+4 > hero.y && ratings[i].y < hero.y+7)
					{
						ratings.splice(i,1)
						score++
						console.log(score)
					}
					}
			}
	}

function createRating()
	{
		for(i = 0; i < amountR; i++)
			{
				var rating = new ratingClass()
				rating.x = Math.floor(Math.random()*(canvas.width-rating.w))
				rating.y = Math.floor(Math.random()*(canvas.height-rating.h))
				ratings.push(rating)
			}
	}

//////////////////////////////////////////////////
///////////////Creating Lasers////////////////////
//////////////////////////////////////////////////

function laserClass(x,y,type,dir)
	{
		this.x = x
		this.y = y
		this.type = type
		this.dir = dir
		
		this.draw = function()
			{
				ctx.fillStyle = "red"
				
				if(this.dir == 0 || this.dir == 2)ctx.fillRect(this.x,this.y,1,4)
				if(this.dir == 1 || this.dir == 3)ctx.fillRect(this.x,this.y,4,1)
			}
		this.move = function()
			{
				if(this.dir == 0)this.y--
				if(this.dir == 1)this.x++
				if(this.dir == 2)this.y++
				if(this.dir == 3)this.x--
				
			}
		this.collision = function()
			{
				if(this.type == 1)
					{
						for(var i = 0; i < enemies.length; i++) 
							{
								if(this.x > enemies[i].x && this.x < enemies[i].x+7 && this.y > enemies[i].y && this.y < enemies[i].y+8)
									{
										enemies.splice(i, 1)
										lasers.splice(0,1)
										break;
									}
							}
					}
			}
	}

function createLaser(x,y,type,dir)
	{
		var laser = new laserClass(x,y,type,dir);
		
		if(lasers.length < 1)
			{
				lasers.push(laser)
				setTimeout(function(){lasers.splice(0, 1)}, 1000)
			}
	}

//////////////////////////////////////////////////
//////////////Creating Enemies////////////////////
//////////////////////////////////////////////////

function enemyClass()
	{
		this.x
		this.y
		
		this.h = 10
		this.w = 7
		
		this.u = false
		this.d = false
		this.l = false
		this.r = false
		
		this.state = 0
		
		this.ran = Math.floor(Math.random()*4)
		
		this.draw = function()
			{
				ctx.fillStyle = "red"
				ctx.fillRect(this.x,this.y,this.w,this.h)
			}
			
		this.rMove = function()
			{
				this.ran = 	Math.floor(Math.random()*4);
			}
		
		this.nMove = function()
			{
				this.u = false
				this.d = false
				this.l = false
				this.r = false
			}
			
		this.move = function()
			{
				if(hero.x+7 > this.x-50 && hero.x < this.x+57 && hero.y+8 > this.y-50 && hero.y < this.y+60)
					{
						this.state = 1
					}
				else 
					{
						this.state = 0	
					}
				if(this.state == 0)
					{
						if(this.ran == 0)
							{
								this.y-=.3
								this.u = true
								this.r = false
								this.d = false
								this.l = false
							}
						else if(this.ran == 1) 
							{
								this.y+=.3
								this.d = true
								this.u = false
								this.r = false
								this.l = false
							}	
						else if(this.ran == 2) 
							{
								this.x-=.3
								this.l = true
								this.u = false
								this.d = false
								this.r = false
							}	
						else if(this.ran == 3) 
							{
								this.x+=.3
								this.r = true
								this.u = false
								this.d = false
								this.l = false
							}
						
						if(this.x < 0)
							{
								this.x = 0
								this.nMove()
								this.ran = 3
							}	
						if(this.x > canvas.width-this.w)
							{
								this.x = canvas.width-this.w
								this.nMove()
								this.ran = 2
							}
						if(this.y < 0)
							{
								this.y = 0
								this.nMove()
								this.ran = 1
							}
						if(this.y > canvas.height-this.h)
							{
								this.y = canvas.height-this.h
								this.nMove()
								this.ran = 0
							}
					}
				if(this.state == 1)
					{
						if(this.x+7 <= hero.x)
							{
								this.x += .3
								this.r = true
								this.u = false
								this.d = false
								this.l = false
							}
						else
							{
								this.r = false
							}
							
						if(this.x-7 >= hero.x)
							{
								this.x -= .3
								this.l = true
								this.u = false
								this.d = false
								this.r = false
							}	
						else
							{
								this.l = false
							}
													
						if(this.y+9 <= hero.y+6)
							{
								this.y += .3
								this.d = true
								this.u = false
								this.r = false
								this.l = false
							}
						else
							{
								this.d = false
							}
													
						if(this.y-7 >= hero.y+1)
							{
								this.y -= .3
								this.u = true
								this.r = false
								this.d = false
								this.l = false
							}
						else
							{
								this.u = false
							}
					}
			}
	}

function createEnemies()
	{
		for(i = 0; i < amount; i++)
			{
				var enemy = new enemyClass()
				enemy.x = Math.floor(Math.random()*(canvas.width-enemy.w))
				enemy.y = Math.floor(Math.random()*(canvas.height-enemy.h))
				enemies.push(enemy)
			}
	}
	
//////////////////////////////////////////////////
/////////////Starting the game////////////////////
//////////////////////////////////////////////////

function startGame()
	{	
		createEnemies()
		createHero()
		createRating()
		
		interval[0] = setInterval(function()
			{
				for(var i = 0; i<enemies.length; i++)
					{
						enemies[i].rMove()
					}
			}, 2000)
		
		interval[1] = setInterval(function()
			{
				ctx.save()
				ctx.scale(zoom, zoom);
				ctx.translate(-hero.x+((canvas.width/2)/zoom), -hero.y+((canvas.width/2)/zoom));
				
				ctx.fillStyle = "#292634"
				ctx.fillRect(0,0,canvas.width,canvas.height)
				ctx.strokeStyle = "black"
				ctx.strokeRect(0,0,canvas.width,canvas.height)
				
				for(var i = 0; i < enemies.length; i++)
					{
						enemies[i].draw()
						enemies[i].move()
					}
				
				for(var i = 0; i < ratings.length; i++)
					{
						ratings[i].draw()
						ratings[i].collision()
					}
				
				for (var i = 0; i < lasers.length; i++) 
					{
						lasers[i].draw();
						lasers[i].move();
						lasers[i].collision();
					}
				hero.draw()
				hero.move()
				ctx.restore();
  		}, 1000/60)
  }
  
  startGame()
  
  document.onkeydown = function(event)
  					{
  					if(event.keyCode === 40)        
  					hero.down = true;
  					else if(event.keyCode === 38)
  					hero.up = true
  					else if(event.keyCode === 37)
     				hero.left = true
  					else if(event.keyCode === 39)
     				hero.right = true
     				else if(event.keyCode === 32)
     				hero.shoot = true
  				 	}
  		document.onkeyup = function(event)
  					{
  					if(event.keyCode === 40)        
  					hero.down = false;
  					else if(event.keyCode === 38)
  					hero.up = false
  					else if(event.keyCode === 37)
     				hero.left = false
  					else if(event.keyCode === 39)
     				hero.right = false
     				else if(event.keyCode === 32)
     				hero.shoot = false
  					} 
