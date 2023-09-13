class QuizScene02 extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
    }
    init(){
        this.frame = 0;
        this.sec = 0;
        this.time;
        this.boxes = [];
        this.boundaries = [];
        this.isPlaying = true;
        this.hp = 3;
    }
    preload(){
        //asset loading
        this.load.image("box","wall.png");
        this.load.image("player","user.png");
        this.load.image("ball","ball.png");
        this.load.image("background","court.jpg");
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

        let back = this.add.tileSprite(0,0,700,700,"background");
        back.setOrigin(0,this.cameras.main.height);
        this.physics.world.setBounds(0,0,back.width, back.height);
        this.time = this.add.text(350,350,"시간");
        this.registerTexture();

        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,back.width,back.height);
        
        this.player = this.physics.add.sprite(350,500, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(35 / 50);
        this.player.setSize(22/(35 / 50),22/(35 / 50));
        this.player.setData("HP",this.hp);

        //this.physics.add.collider(boxes, this.player);

        // let ball = this.add.sprite(75,75,"ball");
        // this.physics.add.existing(ball,true);
        
        this.cursor = this.input.keyboard.createCursorKeys(); 
        let BottomBoundary = this.add.rectangle(0,this.cameras.main.height+20, this.cameras.main.width,5, 0xFFFFFF);
        BottomBoundary.setOrigin(0,0);
        this.physics.add.existing(BottomBoundary, true);

        let TopBoundary = this.add.rectangle(0,-20, this.cameras.main.width,5, 0xFFFFFF);
        TopBoundary.setOrigin(0,0);
        this.physics.add.existing(TopBoundary, true);

        let RightBoundary = this.add.rectangle(this.cameras.main.width+20, 5, 5, this.cameras.main.height, 0xFFFFFF);
        RightBoundary.setOrigin(0,0);
        this.physics.add.existing(RightBoundary, true);

        let LeftBoundary = this.add.rectangle(-10, 5, 5, this.cameras.main.height, 0xFFFFFF);
        LeftBoundary.setOrigin(0,0);
        this.physics.add.existing(LeftBoundary, true);

        this.physics.add.overlap(this.boxes,this.player,(box,player)=>{
            
            player.setData("HP",2);
            this.scene.start("GameoverScene");
        })

        this.physics.add.overlap(BottomBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });

        this.physics.add.overlap(TopBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });
        
        this.physics.add.overlap(RightBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });

        this.physics.add.overlap(LeftBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });

        this.physics.add.overlap(this.player, this.boxes, function(){
            //alert("부딪힘");
        });


    }
    
    update(){
        this.frame++;
        $("#time").text((this.frame/60).toFixed(3));
        if(this.frame%60 == 0){
            let box1 = this.physics.add.sprite(Phaser.Math.Between(0,700),0,"ball");
            //let circle = this.physics.add.sprite(Phaser.Math.Between(0,500),0,"ball");
            box1.setScale(0.6);
            box1.setOrigin(0,0);
            box1.setImmovable();
            box1.setVelocityY(300);
            this.physics.add.collider(box1, this.player);
            this.boxes.push(box1);
            this.sec++;
            this.time.setText(this.sec);
            console.log(this.sec);
            window.gameSec = this.sec;
            

            if(this.sec > 10){
                let box2 = this.physics.add.sprite(Phaser.Math.Between(0,700),650,"ball");
                box2.setScale(0.6);
                box2.setOrigin(0,0);
                box2.setImmovable();
                box2.setVelocityY(-300);
                this.physics.add.collider(box2, this.player);
                this.boxes.push(box2);
            }
            
            if(this.sec > 20){
                let box3 = this.physics.add.sprite(0,Phaser.Math.Between(0,700),"ball");
                box3.setScale(0.6);
                box3.setOrigin(0,0);
                box3.setImmovable();
                box3.setVelocityX(300);
                this.physics.add.collider(box3, this.player);
                this.boxes.push(box3);
            }
            
            if(this.sec > 30){
                let box4 = this.physics.add.sprite(650,Phaser.Math.Between(0,700),"ball");
                box4.setScale(0.6);
                box4.setOrigin(0,0);
                box4.setImmovable();
                box4.setVelocityX(-300);
                this.physics.add.collider(box4, this.player);
                this.boxes.push(box4);
            }
        }

        // if(this.sec == 10){
        //     let box2 = this.physics.add.sprite(Math.floor(Math.random()*700),Math.floor(Math.random()*(600-500+1)+500),"box");
        //     //
        //     box2.setOrigin(0,0);
        //     box2.setImmovable();
        //     box2.setVelocityY(-500);
        //     this.physics.add.collider(box2, this.player);
        //     this.boxes.push(box2);
        //     this.sec = 0;
        // }

        // this.player.setVelocityX(0);
        // this.player.setVelocityY(0);
        this.player.setVelocity(0);
        //Scene 전체에서 모니터 프레임에 맞게 반복 실행되는 함수.
        if(this.cursor.left.isDown){
            this.player.setVelocityX(-200);
            this.back.tilePositionX -= 1;
        }
        if(this.cursor.right.isDown){
            this.player.setVelocityX(200);
            this.back.tilePositionX += 1;
        }
        if(this.cursor.up.isDown){
            this.player.setVelocityY(-200);
            this.back.tilePositionY -= 1;
        }
        if(this.cursor.down.isDown){
            this.player.setVelocityY(200);
            this.back.tilePositionY += 1;
        }
    }
}
