// p5.js的生命周期函数
let firework = [];
let gravity; //重力变量
let cd = 0;//手指放烟花cd
let url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/'
let burstSound = ['burst1.mp3', 'burst2.mp3'];
let liftSound = ['lift1.mp3', 'lift2.mp3', 'lift3.mp3'];
let doorconst = 0.01;//阈值 随时间增加
let info = navigator.userAgent;
let isPhone = /mobile/i.test(info);

function setup() {
    // 创建画布 
    createCanvas(window.innerWidth, window.innerHeight);
    stroke(255); //白色
    strokeWeight(4); //粒子大小
    gravity = createVector(0, 0.15);
    // heigth:为画布的高度! random(width) 产生0-width的随机数
    txt = new tiptext('点击任意处释放烟花', 15);
}
function draw() {
    colorMode(RGB);
    background(0, 0, 0, 25); //黑色背景
    doorconst += doorconst > 0.065 ? 0 : 0.01 / 120;
    // console.log(doorconst);
    if (mouseIsPressed && cd == 0) {
        firework.push(new Firework(mouseX));
        cd = 10;
    } else {
        if (cd > 0) cd--;
        if (random(1) < doorconst) firework.push(new Firework());
    }
    for (let i = firework.length - 1; i >= 0; i--) {
        firework[i].update();
        firework[i].show();
        if (firework[i].done()) {
            firework.splice(i, 1);
        }
    }
    txt.show();
}   