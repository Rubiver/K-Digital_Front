class Scene01 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
    }

    init(){
        this.frame = 0;
        this.obstacles = [];
        this.coins = [];
        this.arrive;
        this.check = true;
        this.isJump = false;
        this.point = 0;
        this.music;
    }
    preload(){
        this.load.spritesheet("cat","cat.png",{frameWidth:221, frameHeight:154});
        this.load.spritesheet("coin","coin.png",{frameWidth:200, frameHeight:171});
        this.load.image("grass","grass.png");
        this.load.image("pillar","pillar.png");
        this.load.audio("getCoin","Coin_Sound.mp3");
        this.load.image("l_grass","large_grass.png");
    }

    create(){
        this.music = this.sound.add('getCoin');
        this.cursor = this.input.keyboard.createCursorKeys(); 

        this.anims.create({
            key : "run",
            frames:this.anims.generateFrameNumbers("cat",{start:0, end:7}),
            frameRate : 20,
            repeat:-1
        });

        this.anims.create({
            key : "turn",
            frames:this.anims.generateFrameNumbers("coin",{start:0, end:3}),
            frameRate : 20,
            repeat:-1
        })

        this.back = this.add.tileSprite(0,0,1440,600,"l_grass");
        this.back.setOrigin(0,0);
        this.physics.world.setBounds(0,0,this.back.width, this.back.height);

        this.cat = this.physics.add.sprite(30,635,"cat");
        this.cat.body.gravity.y = 800;
        this.cat.setOrigin(0,0);
        this.cat.setScale(100/221);
        
        this.cat.setCollideWorldBounds(true);
        this.physics.add.existing(this.cat, true);
        this.cat.play("run");


        this.cameras.main.startFollow(this.cat);
        this.cameras.main.setBounds(0,0,this.back.width,this.back.height);

        let BottomBoundary = this.add.rectangle(0, 630, this.cameras.main.width,5, 0xFFFFFF);
        BottomBoundary.setOrigin(0,0);
        this.physics.add.existing(BottomBoundary, true);

        this.physics.add.collider(this.cat,BottomBoundary, function(){
            this.isJump = false;
        },null,this);
        
        this.obs1 = this.add.rectangle(1000,0, 50,300, 0xFFFFFF);
        this.physics.add.existing(this.obs1, true);
        this.obs1.setOrigin(0.5);

        this.physics.add.overlap(this.cat, this.obstacles,function(cat, obs){
            this.scene.start("GameoverScene");
        },null,this);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //space 키 가져옴

        this.physics.add.overlap(this.cat, this.coins,function(cat, coin){
            coin.destroy();
            console.log("점수+1");
            this.music.play();
            this.point++;
            this.text.setText("점수 : "+this.point);
        },null,this);

        this.text = this.add.text(this.cameras.main.width/2,50,"점수");


    }
    update(){
        this.frame++;
        this.cat.setSize(80/(100/221),90/(100/154));
        if(this.frame%120==0){
            let obs = this.physics.add.sprite(900,Phaser.Math.Between(510,600),"pillar");
            obs.setScale(0.3);
            obs.setOrigin(0,0);
            obs.setImmovable();
            obs.setVelocityX(-300);
            this.obstacles.push(obs);

            let coin = this.physics.add.sprite(900,Phaser.Math.Between(100,630),"coin");
            coin.play("turn");
            coin.setVelocityX(-200);
            coin.setScale(0.2);
            this.physics.add.existing(coin,true);
            this.coins.push(coin);
        }
        this.cat.setVelocityX(0);
        this.back.tilePositionX += 4;
        // this.cat.setVelocityY(1);
        if(this.cursor.up.isDown){
            this.cat.setVelocityY(-250);
        }

        if(this.cursor.right.isDown){
            this.cat.setVelocityX(200);
        }
        
        if(this.cursor.left.isDown){
            this.cat.setVelocityX(-220);
        }

        if(this.cursor.down.isDown){
            this.cat.setVelocityX(0);
            this.cat.setSize(80/(100/221),50/(100/154));
        }

        if(!this.isJump){
            if(Phaser.Input.Keyboard.JustDown(this.space)){
                this.cat.setVelocityY(-450);
                this.isJump = true;
            }
        }
        
    }
}