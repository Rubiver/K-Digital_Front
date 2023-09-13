class Scene01 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
    }

    init(){
        this.frame = 0;
        this.horses = [];
        this.arrive;
        this.check = true;
    }
    preload(){
        //asset loading
        //this.load.image("horse","horse.png");
        this.load.spritesheet("cat","cat.png",{frameWidth:221, frameHeight:154});
    }

    create(){
        
        this.anims.create({
            key : "run",
            frames:this.anims.generateFrameNumbers("cat",{start:0, end:7}),
            frameRate : 30,
            repeat:-1
        });

        // let cat = this.physics.add.sprite(100,this.cameras.main.height-154,"cat");
        // cat.play("run");
        // cat.setOrigin(0,0);

        this.arrive = this.add.text(350,350,"",{
            fontSize : "30px",
            fill : "#000000"
        }).setOrigin(0,0);

        this.horse1 = this.physics.add.sprite(0,150,"cat");
        this.horse1.setScale(128 / 512);
        this.horse1.setSize(20/(50/512),40/(50/268));
        this.horse1.setOrigin(0,0);
        this.horse1.setCollideWorldBounds(true);
        this.horse1.setData("name",1);
        this.horse1.play("run");
        this.physics.add.existing(this.horse1,true);
        this.horses.push(this.horse1);
        

        this.horse2 = this.physics.add.sprite(0,250,"cat");
        this.horse2.setScale(128 / 512);
        this.horse2.setSize(20/(50/512),40/(50/268));
        this.horse2.setOrigin(0,0);
        this.horse2.setCollideWorldBounds(true);
        this.horse2.setData("name",2);
        this.horse2.play("run");
        this.physics.add.existing(this.horse2,true);
        this.horses.push(this.horse2);

        this.horse3 = this.physics.add.sprite(0,350,"cat");
        this.horse3.setScale(128 / 512);
        this.horse3.setSize(20/(50/512),40/(50/268));
        this.horse3.setOrigin(0,0);
        this.horse3.setCollideWorldBounds(true);
        this.horse3.setData("name",3);
        this.horse3.play("run");
        this.physics.add.existing(this.horse3,true);
        this.horses.push(this.horse3);

        this.horse4 = this.physics.add.sprite(0,450,"cat");
        this.horse4.setScale(128 / 512);
        this.horse4.setSize(20/(50/512),40/(50/268));
        this.horse4.setOrigin(0,0);
        this.horse4.setCollideWorldBounds(true);
        this.horse4.setData("name",4);
        this.horse4.play("run");
        this.physics.add.existing(this.horse4,true);
        this.horses.push(this.horse4);

        this.horse5 = this.physics.add.sprite(0,550,"cat");
        this.horse5.setScale(128 / 512);
        this.horse5.setSize(20/(50/512),40/(50/268));
        this.horse5.setOrigin(0,0);
        this.horse5.setCollideWorldBounds(true);
        this.horse5.setData("name",5);
        this.horse5.play("run");
        this.physics.add.existing(this.horse5,true);
        this.horses.push(this.horse5);

        let finish = this.add.rectangle(this.cameras.main.width-20, 5, 5, this.cameras.main.height, 0xFFFFFF);
        finish.setOrigin(0,0);
        this.physics.add.existing(finish,true);
        this.physics.add.overlap(finish, this.horses,function(line, horse){
            this.check = false;
            this.arrive.setText(horse.getData("name")+"번묘가 1등으로 도착.");
            finish.destroy();
            this.horse1.stop();
            this.horse2.stop();
            this.horse3.stop();
            this.horse4.stop();
            this.horse5.stop();
        },null,this);
        
        
    }
    update(){
        this.frame++;
        if(this.check){
            this.horse1.setVelocityX(Math.floor(Math.random()*300));

            this.horse2.setVelocityX(Math.floor(Math.random()*300));

            this.horse3.setVelocityX(Math.floor(Math.random()*300));

            this.horse4.setVelocityX(Math.floor(Math.random()*300));

            this.horse5.setVelocityX(Math.floor(Math.random()*300));
        }else{
            this.horse1.setVelocityX(0);

            this.horse2.setVelocityX(0);

            this.horse3.setVelocityX(0);

            this.horse4.setVelocityX(0);

            this.horse5.setVelocityX(0);
        }
    }
}