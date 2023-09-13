class rhythm extends Phaser.Scene{
    constructor(){
        super({
            key : "Scene01"
        });
        this.frame = 0;
        this.leftbtn;
        this.rightbtn;
        this.downbtn;
        this.Judgement;
        this.jg_point = 0;
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
        this.Judgement = this.add.text(350,50,"판정");
        this.registerTexture();
        
        this.cursor = this.input.keyboard.createCursorKeys(); 

        let BottomBoundary = this.add.rectangle(0,this.cameras.main.height+10, this.cameras.main.width,5, 0xFFFFFF);
        BottomBoundary.setOrigin(0,0);
        this.physics.add.existing(BottomBoundary, true);

        let JudgeLine1 = this.add.rectangle(0,this.cameras.main.height-100, 150,5, 0xFFFFFF);
        JudgeLine1.setOrigin(0,0);
        this.physics.add.existing(JudgeLine1, true);

        let JudgeLine2 = this.add.rectangle(200,this.cameras.main.height-100, 150,5, 0xFFFFFF);
        JudgeLine2.setOrigin(0,0);
        this.physics.add.existing(JudgeLine2, true);

        let JudgeLine3 = this.add.rectangle(400,this.cameras.main.height-100, 150,5, 0xFFFFFF);
        JudgeLine3.setOrigin(0,0);
        this.physics.add.existing(JudgeLine3, true);

        let JudgeLine4 = this.add.rectangle(600,this.cameras.main.height-100, 150,5, 0xFFFFFF);
        JudgeLine4.setOrigin(0,0);
        this.physics.add.existing(JudgeLine4, true);

        this.boxes = [];

        this.physics.add.overlap(JudgeLine1, this.boxes, function(line,box){
            
            console.log(this.jg_point);
            if(this.cursor.left.isDown){
                this.jg_point++;
                this.boxes.forEach(element => {
                    box.destroy();
                    this.Judgement.setText(this.jg_point);
                });
            }

        }, null, this);

        this.physics.add.overlap(JudgeLine2, this.boxes, function(line,box){
            
            console.log(this.jg_point);
            if(this.cursor.up.isDown){
                this.jg_point++;
                this.boxes.forEach(element => {
                    box.destroy();
                    this.Judgement.setText(this.jg_point);
                });
            }

        }, null, this);

        this.physics.add.overlap(JudgeLine3, this.boxes, function(line,box){
            
            console.log(this.jg_point);
            if(this.cursor.down.isDown){
                this.jg_point++;
                this.boxes.forEach(element => {
                    box.destroy();
                    this.Judgement.setText(this.jg_point);
                });
            }

        }, null, this);

        this.physics.add.overlap(JudgeLine4, this.boxes, function(line,box){
            
            console.log(this.jg_point);
            if(this.cursor.right.isDown){
                this.jg_point++;
                this.boxes.forEach(element => {
                    box.destroy();
                    this.Judgement.setText(this.jg_point);
                });
            }

        }, null, this);

        this.physics.add.overlap(BottomBoundary, this.boxes,function(boundary, box){
            box.destroy();
        });
    }
    
    update(){
        this.frame++;
        if(this.frame%(Math.floor(Math.random()*(80-20)+80)) == 0){
            let box1 = this.physics.add.sprite(50,10,"box");
            box1.setOrigin(0,0);
            box1.setImmovable();
            box1.setVelocityY(300);
            this.boxes.push(box1);
        }
        if(this.frame%(Math.floor(Math.random()*(80-20)+80)) == 0){
            let box2 = this.physics.add.sprite(250,10,"box");
            box2.setOrigin(0,0);
            box2.setImmovable();
            box2.setVelocityY(300);
            this.boxes.push(box2);
        }
        if(this.frame%(Math.floor(Math.random()*(80-20)+80)) == 0){
            let box3 = this.physics.add.sprite(450,10,"box");
            box3.setOrigin(0,0);
            box3.setImmovable();
            box3.setVelocityY(300);
            this.boxes.push(box3);
        }
        if(this.frame%(Math.floor(Math.random()*(80-20)+80)) == 0){
            let box4 = this.physics.add.sprite(650,10,"box");
            box4.setOrigin(0,0);
            box4.setImmovable();
            box4.setVelocityY(300);
            this.boxes.push(box4);
        }

    }
}