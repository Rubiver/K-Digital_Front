class QuizScene01 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
        this.frame = 0;
    }
    preload(){
        //asset loading
        this.load.image("box","wall.png");
        this.load.image("player","user.png");
    }

    registerTexture(){
        let texture = this.make.graphics();
        texture.fillStyle(0x00FEFE,1);
        texture.fillRect(0,0,50,50);
        texture.lineStyle(2,0xFF0000, 1);
        texture.strokeRect(0,0,50,50);
        texture.generateTexture("box2",50,50);
    }
    
    create(){
        this.registerTexture();
        
        this.player = this.physics.add.sprite(350,500, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.7);

        //this.physics.add.collider(boxes, this.player);
        
        this.cursor = this.input.keyboard.createCursorKeys(); 
        let BottomBoundary = this.add.rectangle(0,this.cameras.main.height-50, this.cameras.main.width,5, 0xFFFFFF);
        BottomBoundary.setOrigin(0,0);
        this.physics.add.existing(BottomBoundary, true);

        
        this.boxes = [];

        this.physics.add.overlap(BottomBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });
    }
    
    update(){
        this.frame++;
        if(this.frame%60 == 0){
            let box = this.physics.add.sprite(Math.floor(Math.random()*700),Math.floor(Math.random()*100),"box");
            box.setOrigin(0,0);
            box.setImmovable();
            box.setVelocityY(Math.floor(Math.random()*300+150));
            this.physics.add.collider(box, this.player);
            this.boxes.push(box);
        }

        // this.player.setVelocityX(0);
        // this.player.setVelocityY(0);
        this.player.setVelocity(0);
        //Scene 전체에서 모니터 프레임에 맞게 반복 실행되는 함수.
        if(this.cursor.left.isDown){
            this.player.setVelocityX(-200);
        }
        if(this.cursor.right.isDown){
            this.player.setVelocityX(200);
        }
        if(this.cursor.up.isDown){
            this.player.setVelocityY(-200);
        }
        if(this.cursor.down.isDown){
            this.player.setVelocityY(200);
        }
    }
}