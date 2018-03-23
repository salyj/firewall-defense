var minion = function(health, speed, armor, direction, yPos, xPos, element, payout) {
	this.health = health;
	this.speed = speed;
	this.armor = armor;
	this.direction = direction;
	this.yPos = yPos;
	this.xPos = xPos;
	this.element = element;
	this.payout = payout;

	this.isDead = false;

	// Minion Object Getters
	this.getHealth = function() {
		return this.health;
	}
	this.getSpeed = function() {
		return this.Speed;
	}
	this.getArmor = function() {
		return this.armor;
	}
	this.getDirection = function() {
		return this.direction;
	}
	this.getYPos = function() {
		return this.yPos;
	}
	this.getXPos = function() {
		return this.xPos;
	}
	this.getElement = function() {
		return this.element;
	}
	this.getIsDead = function() {
		return this.isDead;
	}
	this.getPayout = function() {
		return this.payout;
	}

	// Minion Object Setters
	this.setHealth = function(health) {
		this.health = health;
	}
	this.setSpeed = function(speed) {
		this.speed = speed;
	}
	this.setArmor = function(armor) {
		this.armor = armor;
	}
	this.setDirection = function(direction) {
		this.direction = direction;
	}
	this.setYPos = function(yPos) {
		this.yPos = yPos;
	}
	this.setXPos = function(xPos) {
		this.xPos = xPos;
	}
	this.setElement = function(element) {
		this.element = element;
	}
	this.setIsDead = function(isDead) {
		this.isDead = isDead;
	}
	this.setPayout = function(payout) {
		this.payout = payout;
	}

	// Minion Object Methods
	this.makeMove = function() {
		switch(this.direction) {
			case "n":
				this.yPos = this.yPos - this.speed;
				move(this.element, this.xPos, this.yPos);
				break;
			case "e":
				this.xPos = this.xPos + this.speed;
				move(this.element, this.xPos, this.yPos);
				break;
			case "s":
				this.yPos = this.yPos + this.speed;
				move(this.element, this.xPos, this.yPos);
				break;
			case "w":
				this.xPos = this.xPos - this.speed;
				move(this.element, this.xPos, this.yPos);
				break;
		}
	}

	this.kill = function() {
		this.isDead = true;
		this.direction = null;
		this.speed = null;
	}

	this.checkIfDead = function() {
		if(this.health <= 0) {
			this.kill();
		}
	}
}

var BasicTower = function(dmg, spd, rng, cst, xPos, yPos) {
	this.dmg = dmg;     // Damage
	this.spd = spd;     // Attack Speed
	this.rng = rng;     // Range
	this.cst = cst;     // Cost
	this.trg = null;    // Target
	this.xPos = xPos;
	this.yPos = yPos;
	this.inRange = false;

	this.element;
	this.lastShot;

	// Tower Getters
	this.getDmg = function() {
		return this.dmg;
	}
	this.getSpd = function() {
		return this.spd;
	}
	this.getRng = function() {
		return this.rng;
	}
	this.getCst = function() {
		return this.cst;
	}
	this.getTarget = function() {
		return this.trg;
	}
	this.getXPos = function() {
		return this.xPos;
	}
	this.getYPos = function() {
		return this.yPos;
	}
	this.getElement = function() {
		return this.element;
	}
	this.getLastShot = function() {
		return this.lastShot;
	}

	// Tower Setters
	this.setDmg = function(dmg) {
		this.dmg = dmg;
	}
	this.setSpd = function(spd) {
		this.spd = spd;
	}
	this.setRng = function(rng) {
		this.rng = rng;
	}
	this.setCst = function(cst) {
		this.cst = cst;
	}
	this.setTarget = function(trg) {
		this.trg = tgt;
	}
	this.setXPos = function(xPos) {
		this.xPos = xPos;
	}
	this.setYPos = function(yPos) {
		this.yPos = yPos;
	}
	this.setElement = function(element) {
		this.element = element;
	}
	this.setLastShot = function(lastShot) {
		this.lastShot = lastShot;
	}

	// Tower Methods
	this.findTarget = function(targetList, frame) {
		var closest;
		var closestD;
		var b;
		var a;

		if(targetList.length > 0) {
			for(var i = 0; i < targetList.length; i++) {

				a = targetList[i].getXPos() - this.xPos;
				b = targetList[i].getYPos() - this.yPos;

				this.inRange = false;

				if(Math.sqrt(a*a + b*b) <= this.rng) {
					this.lastShot = frame;
					this.inRange = true;

					if(!closest) {
						closest = targetList[i];
						closestD = Math.sqrt(a*a + b*b);
						// console.log(closest);
					} else if( closestD > Math.sqrt(a*a + b*b)) {
						closest = targetList[i];
						closestD = Math.sqrt(a*a + b*b);
						// console.log(closest);
					}
				}
			}
		}

		if(closest) {
			this.target = closest;
			return;
		}
		
		this.target = null;
	}
	this.shoot = function(frame) {
		var temp;

		if(this.target) {
			this.element.setAttribute("style", "color: #ffee56;");
			if(this.dmg - this.target.getArmor() < 1) {
				this.target.setHealth(this.target.getHealth() - 1);
			} else {
				this.target.setHealth(this.target.getHealth() + this.target.getArmor() - this.dmg);
			}
			this.target.checkIfDead();
			// console.log("bang!");
			// console.log("Last Shot: " + this.lastShot);

			temp = document.createElement("div");
			temp.classList.add("tracer");
			temp.setAttribute("style", "top: " + this.yPos + "px; left: " + this.xPos + "px;");
			document.getElementById("container").appendChild(temp);
			tracers.push(new Tracer(temp, this, this.target));
		}
	}

}

var Tracer = function(element, startPoint, endPoint) {
	this.element = element;
	this.startPoint = startPoint;
	this.endPoint = endPoint;

	this.xPos = this.startPoint.getXPos();
	this.yPos = this.startPoint.getYPos();

	this.proposedX;
	this.proposedY;

	this.speed = 6;

	// Tracer Object Getters
	this.getElement = function() {
		return this.element;
	}
	this.getStartPoint = function() {
		return this.startPoint;
	}
	this.getEndPoint = function() {
		return this.endPoint;
	}
	this.getXPos = function() {
		return this.xPos;
	}
	this.getYPos = function() {
		return this.yPos;
	}
	this.getProposedX = function() {
		return this.proposedX;
	}
	this.getProposedY = function() {
		return this.proposedY;
	}
	this.getSpeed = function() {
		return this.speed;
	}

	// Tracer Object Setters
	this.setElement = function(element){
		this.element = element;
	}
	this.setStartPoint = function(startPoint) {
		this.startPoint = startPoint;
	}
	this.setEndPoint = function(endPoint) {
		this.endPoint = endPoint;
	}
	this.setXPos = function(xPos) {
		this.xPos = xPos;
	}
	this.setYPos = function(yPos) {
		this.yPos = yPos;
	}
	this.setProposedX = function(proposedX) {
		this.proposedX = proposedX;
	}
	this.setProposedY = function(proposedY) {
		this.proposedY = proposedY;
	}
	this.setSpeed = function(speed) {
		this.speed = speed;
	}

	// Tracer Object Methods
	this.calcDirection = function() {
		if(this.endPoint.getXPos() > this.xPos + 5) {
			this.proposedX = this.xPos + this.speed;
		} else if (this.endPoint.getXPos() < this.xPos - 5) {
			this.proposedX = this.xPos - this.speed;
		} else {
			this.propsedX = this.xPos;
		}

		if(this.endPoint.getYPos() > this.yPos + 5) {
			this.proposedY = this.yPos + this.speed;
		} else if (this.endPoint.getYPos() < this.yPos - 5) {
			this.proposedY = this.yPos - this.speed;
		} else {
			this.proposedY = this.yPos;
		}

		this.move();
	}

	this.move = function() {
		this.xPos = this.proposedX;
		this.yPos = this.proposedY;
		move(this.element, this.xPos, this.yPos);
	}
}