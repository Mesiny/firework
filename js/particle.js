// 单个烟花粒子
class Particle {
    constructor(x, y, isFirework, colorH) {
        this.isFirework = isFirework; //不用声明变量
        //x,y表示位置
        this.pos = createVector(x, y);
        this.colorH = colorH;

        //createVector()产生位置向量
        if (this.isFirework) {
            this.vel = createVector(0, random(-14, -10));
        } else {
            this.vel = p5.Vector.random2D(); //随机产生二维向量
            // p5.Vector.random2D()产生的向量为单位向量 即模为1
            // console.log(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
            this.vel = this.vel.mult(random(2, isPhone ? 8 : 15)); //改变向量的模
        }

        this.acc = createVector(0, 0); //加速度?
        this.lifespan = 255;
    }
    update() {//新的节点的横纵坐标
        if (!this.isFirework) {
            this.vel = this.vel.mult(0.9); //粒子速度越来越小
            this.lifespan -= 4;
        }
        this.vel.add(this.acc); //速度+加速度
        this.pos.add(this.vel); //位置+速度
        this.acc.mult(0); //加速度的变化？

    }
    show() { //show方法：展示粒子
        colorMode(HSB);
        if (this.isFirework) {
            strokeWeight(4);
            stroke(this.colorH, 255, 255); //上升粒子颜色不衰减  设置颜色和粗细
            point();

        } else {
            strokeWeight(2);
            stroke(this.colorH, 255, 255, this.lifespan);  //若lifespan为负，则绘制不出来
        }
        point(this.pos.x, this.pos.y);
        // 单个烟花粒子=>画点
    }
    applyForce(gravity) {
        this.acc.add(gravity); //加速度减
    }
    done() {
        return this.lifespan < 0;
    }
}