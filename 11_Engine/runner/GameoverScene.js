class GameoverScene extends Phaser.Scene{
    constructor(){
        super({
            key:"GameoverScene"});
        }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.width/2,this.cameras.main.height/2,"Game Over",{
            fontSize : "120px",
            fill : "#FF0000"
        }).setOrigin(0.5);
        let restart_btn = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 100,"Click to Retry", {
            fontSize : "30px",
            fill : "#FFFFFF"
        }).setOrigin(0.5).setInteractive().setPadding(15);
        this.cursor = this.input.keyboard.createCursorKeys(); 
        restart_btn.on("pointerover",()=>{
            restart_btn.setBackgroundColor("gray");
            this.game.canvas.style.cursor = "pointer";
        });
        restart_btn.on("pointerout",()=>{
            restart_btn.setBackgroundColor("none");
            this.game.canvas.style.cursor = "default";
        })
        restart_btn.on("pointerdown",()=>{
            this.scene.start("Scene01");
        });
    }
    update(){

    }
    
}