let CREATE_ALL_NUMBERS = 7;
let nums = $(".nums");
$("#start").on("click",function(){
    console.log(nums.length);
    let rand = [];
    for(let i=0; i<CREATE_ALL_NUMBERS; i++){
        let nums = Math.floor(Math.random()*45+1);
        if(rand.indexOf(nums)<0){
            rand.push(nums);
        }
    }
    rand.sort(function(a,b){
        return a-b;
    });
    for(let i=0; i<CREATE_ALL_NUMBERS; i++){
        $(nums[i]).text(rand[i]);
    }
    
});

$("#reset").on("click",function(){
    for(let i=0; i<CREATE_ALL_NUMBERS; i++){
        $(nums[i]).text("");
    }
});
let colors = ["red","green","blue","cyan","forestgreen","dodgerblue","white"]
for(let i=0; i<CREATE_ALL_NUMBERS; i++){
    $(nums[i]).css("background-color",colors[i]);
}