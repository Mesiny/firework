class Firework {
    constructor(x) {
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
        this.brust.volume = 0.3;
        this.lift.preload = 'auto';
        this.brust.preload = 'auto';
        this.lift.volume = 0.5;
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
                this.explode(); //爆破 
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
        if (this.exploded && !this.fireworks.length) return true;
        return false;
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
        fill(255, 255, 255, this.af); //上升粒子颜色不衰减  设置颜色和粗细
        stroke(255, 255, 255, 0);
        text(this.txt, 20, height - this.size);
    }
}