class Scene01 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
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
        //로딩된 자원, 게임 Scene 구성에 필요한 초기 설정을 세팅하는 함수.
        let box = this.physics.add.sprite(350,350,"box");
        
        this.player = this.physics.add.sprite(300,300, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.7);


        this.physics.add.collider(box, this.player);
        //box.setImmovable();
        box.setCollideWorldBounds(true);
        box.setDrag(300,300);
        box.setBounce(1);
        

        this.cursor = this.input.keyboard.createCursorKeys(); //this. 으로 멤버 필드로 만듬.
        
    }
    update(){
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