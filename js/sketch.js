// p5.js的生命周期函数
let firework = [];
let gravity; //重力变量
let cd = 0;//手指放烟花cd
let cd_bless = 0;
let url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/'
let burstSound = ['burst1.mp3', 'burst2.mp3'];
let liftSound = ['lift1.mp3', 'lift2.mp3', 'lift3.mp3'];
let blessingSound = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/crackle1.mp3'
let doorconst = 0.01;//阈值 随时间增加
let info = navigator.userAgent;
let isPhone = /mobile/i.test(info);
let maxRand = isPhone ? 0.0325 : 0.065
let blessings = ['恭喜发财', '身体健康', '龙鸣国瑞', '福寿安康', '岁岁平安', '万事胜意', '龙年大吉', '年年有余', '新春快乐', '阖家幸福', '龙行龘龘', '春暖四季']
let blessingsRate1 = 0.15; //点击触发祝福烟花概率
let blessingsRate2 = 0.01;  //随机触发祝福烟花概率

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
    doorconst += doorconst > maxRand ? 0 : 0.01 / 120;
    blessingsRate2 += blessingsRate2 > 0.1 ? 0 : (0.15 / 450);
    cd_bless -= cd_bless > 0 ? 1 : 0;
    // console.log(doorconst);
    if (mouseIsPressed && cd == 0) {
        // 判断祝福烟花还是普通烟花
        firework.push(new Firework(random(1) < blessingsRate1, mouseX));
        cd = 15;
    } else {
        if (cd > 0) cd--;
        if (random(1) < doorconst) firework.push(new Firework(random(1) < blessingsRate2));
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