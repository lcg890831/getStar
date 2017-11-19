require=function t(e,i,n){function c(a,o){if(!i[a]){if(!e[a]){var r="function"==typeof require&&require;if(!o&&r)return r(a,!0);if(s)return s(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return c(i||t)},h,h.exports,t,e,i,n)}return i[a].exports}for(var s="function"==typeof require&&require,a=0;a<n.length;a++)c(n[a]);return c}({Player:[function(t,e,i){"use strict";cc._RF.push(e,"410599q3o9AJr2RcIJmgu7z","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,url:cc.AudioClip}},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.maxPosX&&(this.node.x=this.maxPosX,this.xSpeed=0),this.node.x<this.minPosX&&(this.node.x=this.minPosX,this.xSpeed=0)},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(t,e,i))},startJump:function(){this.node.runAction(this.jumpAction)},onLoad:function(){this.jumpAction=this.setJumpAction(),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.minPosX=-this.node.parent.width/2,this.maxPosX=this.node.parent.width/2,this.setInputControl()},setInputControl:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(e,i){switch(e){case cc.KEY.left:t.accLeft=!0,t.accRight=!1;break;case cc.KEY.right:t.accLeft=!1,t.accRight=!0}},onKeyReleased:function(e,i){switch(e){case cc.KEY.left:t.accLeft=!1;break;case cc.KEY.right:t.accRight=!1}}},t.node)}}),cc._RF.pop()},{}],StartGame:[function(t,e,i){"use strict";cc._RF.push(e,"923af0D94ROR47vitTuftnx","StartGame"),cc.Class({extends:cc.Component,properties:{timer:0},onLoad:function(){},update:function(t){255==this.node.opacity&&(this.timer=-1),50==this.node.opacity&&(this.timer=1),this.node.opacity+=this.timer},hiddenStartLabel:function(){this.node.destroy()}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"b59a3kHdbJIFJ3E0F9WBgtx","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0},onLoad:function(){},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e)}},getPlayerDistance:function(){var t=this.game.player.getPosition();return cc.pDistance(this.node.position,t)},onPicked:function(){this.game.gainScore(),this.game.spawnNewStar(),this.node.destroy()}}),cc._RF.pop()},{}],game:[function(t,e,i){"use strict";cc._RF.push(e,"67c88juVmlKXqDBRq3CPgzh","game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,started:!1,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,url:cc.AudioClip},startLabel:{default:null,type:cc.Label}},onLoad:function(){this.setInputControl(),this.player.stopAllActions()},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("Star").game=this,this.starDuration=this.minStarDuration+cc.random0To1()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t=0,e=this.groundY+cc.random0To1()*this.player.getComponent("Player").jumpHeight+50,i=this.node.width/2;return t=cc.randomMinus1To1()*i,cc.p(t,e)},update:function(t){this.timer>this.starDuration?this.gameOver():this.timer+=t},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score.toString(),cc.audioEngine.playEffect(this.scoreAudio,!1)},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")},gameStart:function(){started||(this.startLabel.hiddenStartLabel(),started=!0,this.score=0,this.timer=0,this.starDuration=0,this.groundY=this.ground.y+this.ground.height/2,this.spawnNewStar())},setInputControl:function(){var t=this;cc.eventManager.addListener({event:cc.EventListener.MOUSE,onMouseDown:function(e){t.started||(t.startLabel.getComponent("StartGame").hiddenStartLabel(),t.player.getComponent("Player").startJump(),t.started=!0,t.score=0,t.timer=0,t.starDuration=0,t.groundY=t.ground.y+t.ground.height/2,t.spawnNewStar())}},t.node)}}),cc._RF.pop()},{}]},{},["Player","Star","StartGame","game"]);