class Scene02 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene02"
        });
    }

    init(){
        this.player;
    }
    preload(){
        this.load.image("grass","grass.png");
    }

    create(){
        let back = this.add.tileSprite(0,0,900,442,"grass");
        this.physics.world.setBounds(0,0,back.width, back.height);
        back.setOrigin(0,0);

        this.player = this.physics.add.sprite(100,100, "player");
        this.player.setCollideWorldBounds(true);

        this.cursor = this.input.keyboard.createCursorKeys(); 

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,back.width,back.height);

    }
    update(){
        this.player.setVelocity(0);

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