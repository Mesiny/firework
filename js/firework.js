class Firework {
    constructor(font, x) {
        // 必须加上this.
        this.colorH = random(255);
        this.x = x ? x : random(50, width - 50);
        this.firework = new Particle(this.x, height, true, this.colorH);
        this.fireworks = [];
        this.exploded = false;
        this.brith = true;
        let url_site = url + burstSound[Math.floor(random(2))];
        let url_site2 = url + liftSound[Math.floor(random(3))];
        this.brust = new Audio(url_site);
        this.lift = new Audio(url_site2);
        this.blessing = new Audio(blessingSound);
        this.brust.volume = 0.3;
        this.lift.preload = 'auto';
        this.brust.preload = 'auto';
        this.lift.volume = 0.5;
        this.blessing.volume = 0.5;
        this.blessing.preload = 'auto';
        this.font = font ? font : false  // 默认非字体烟花
    }

    update() {
        if (this.brith === true) {
            this.lift.play();
            this.brith = false;
        }
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0) {
                this.exploded = true;//改的是指针
                if (this.font === false)
                    this.explode(); //爆破
                else
                    this.createFont();
            }
        }
        //必须倒序索引 这样不会影响前面的下标
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            this.fireworks[i].applyForce(gravity);
            this.fireworks[i].update();
            if (this.fireworks[i].done()) {
                this.fireworks.splice(i, 1); //从数组中删除i元素 删除1个
            }
        }
    }
    show() {
        if (!this.exploded) this.firework.show();
        for (let i = 0; i < this.fireworks.length; i++) {
            this.fireworks[i].show();
        }
        if (this.exploded === true && this.font) { //字体烟花
            // console.log(this.fireworkFont);
            this.fireworkFont.update();
            this.fireworkFont.show();
        }
    }
    explode() { //不需要定义函数语法 
        this.brust.play();
        for (let i = 0; i < 100; i++) { //增加100个粒子
            const p = new Particle(this.firework.pos.x, this.firework.pos.y, false, this.colorH);
            this.fireworks.push(p);
        }
    }
    done() {
        // 所有烟花已经爆破完成 
        if (this.exploded && !this.fireworks.length && !this.font) return true;
        if (this.exploded && this.font && this.fireworkFont.done()) return true;
        return false;
    }
    createFont() {
        this.brust.play();
        let txt = blessings[Math.floor(random(blessings.length))];
        this.fireworkFont = new fireworkFont(this.firework.pos.x, this.firework.pos.y, txt, this.colorH);
    }
}

class tiptext {
    constructor(txt, size) {
        this.txt = txt;
        this.size = size;
        this.af = 0;
        this.a = -1; //af 的变化速率
    }
    //加入声音：两个地方 1.开始 lift 2.爆炸 brust 随机从列表中取音乐
    // 放在每个烟花里， 每个烟花从起始位置开始响一次，爆炸响一次 结束自动收回
    show() {
        colorMode(RGB);
        if (this.af < 0 || this.af > 200) this.a *= -1;
        this.af += this.a;
        textSize(this.size);
        textAlign(LEFT, TOP);
        fill(255, 255, 255, this.af); //上升粒子颜色不衰减  设置颜色和粗细
        stroke(255, 255, 255, 0);
        text(this.txt, 20, height - this.size);
    }
}

class fireworkFont {  //烟花字体类
    constructor(x, y, txt, colorH) {
        this.x = x ? x : 200;
        this.y = y ? y : 200;
        this.txt = txt;
        this.size = 0;   // 大小从0开始变大
        this.lifespan = 300;
        this.lifespanchange = -2;  //lifespan的变化速率
        this.sizechange = random(9, 10);   //size 的变化速率
        if (isPhone) this.sizechange *= 8 / 15;
        this.colorH = colorH;
    }
    update() {
        // 改变lifepan和size 以及sizechange
        this.lifespan += this.lifespanchange;
        this.size += this.sizechange;
        this.sizechange *= 0.88;
    }
    show() {
        colorMode(HSB);
        // if (this.af < 0 || this.af > 200) this.a *= -1;
        // this.af += this.a;
        textSize(this.size);
        noFill();
        stroke(this.colorH, 255, 255, this.af);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(this.txt, this.x, this.y);
    }
    done() {
        return this.lifespan < 0;
    }
}