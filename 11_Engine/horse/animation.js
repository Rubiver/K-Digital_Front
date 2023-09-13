class animation extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene02"
        });
    }

    init(){
        this.frame = 0;
        this.horses = [];
        this.arrive;
        this.check = true;
        this.player;
        this.arrow;
    }
    preload(){
        //asset loading
        //this.load.image("horse","horse.png");
        this.load.spritesheet("link","link.png",{frameWidth:90, frameHeight:97});
        
    }

    create(){
        this.player = this.physics.add.sprite(350,500, "link");
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key : "right",
            frames:this.anims.generateFrameNumbers("link",{start:30, end:39}),
            frameRate : 20,
            repeat:-1
        });
        this.anims.create({
            key : "left",
            frames:this.anims.generateFrameNumbers("link",{start:10, end:19}),
            frameRate : 20,
            repeat:-1
        });
        this.anims.create({
            key : "up",
            frames:this.anims.generateFrameNumbers("link",{start:20, end:29}),
            frameRate : 20,
            repeat:-1
        });
        this.anims.create({
            key : "down",
            frames:this.anims.generateFrameNumbers("link",{start:0, end:9}),
            frameRate : 20,
            repeat:-1
        });

        this.cursor = this.input.keyboard.createCursorKeys(); 
        
        
    }
    update(){
        let player = this.player;
        
    
        if(!this.cursor.down.isDown && !this.cursor.up.isDown && !this.cursor.left.isDown && !this.cursor.right.isDown){
            this.player.setFrame(0);
            if(this.arrow == "up"){
                this.player.play("up",false);
            }else if(this.arrow == "down"){
                this.player.play("down",false);
            }else if(this.arrow == "left"){
                this.player.play("left",false);    
            }else if(this.arrow == "right"){
                this.player.play("right",false);
            }
        }
        this.player.setVelocity(0);

        if(this.cursor.left.isDown){
            this.player.setVelocityX(-200);
            this.player.play("left",true);
            this.arrow = "left";
        }
        if(this.cursor.right.isDown){
            this.player.setVelocityX(200);
            this.player.play("right",true);
            this.arrow = "right";
        }
        if(this.cursor.up.isDown){
            this.player.setVelocityY(-200);
            this.player.play("up",true);
            this.arrow = "up";
        }
        if(this.cursor.down.isDown){
            this.player.setVelocityY(200);
            this.player.play("down",true);
            this.arrow = "down";
        }

        
    }
}