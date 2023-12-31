import SmallZongzi from './SmallZongzi'
let Enemy = Hilo.Class.create({
    Extends: Hilo.Container,
    SmallZongziImg: null,
    timer: null, // 定时器
    zongziList: [],
    enemySpeed: 0,
    createSpeed: 0,
    score: [10, 5, -10],
    tween: null,
 
    constructor: function (properties) {
        Enemy.superclass.constructor.call(this, properties);
 
        //this.onUpdate = this.onUpdate.bind(this);
        //this.createSmallZongzi()
        this.tween = Hilo.Tween;
        this.creatEnemy();
        this.beginCreateEnemy();
    },
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    creatEnemy() { // 生成粽子
        let number = this.random(0, 100);
        let index = null;
        if (number < 27) {  //生成不同种类粽子概率
            index = 0
        } else if (number < 55) {
            index = 1
        } else {
            index = 2
        }
        let hold = new SmallZongzi({
            image: this.zongziList[index],
            rect: [0, 0, this.zongziList[index].width, this.zongziList[index].height]
        }).addTo(this);
 
        hold.x = this.random(100, (this.width - 100));
 
        hold.y = -300 * Math.random();
 
        hold.score = this.score[index]
 
        this.tween.to(hold, {
            y: this.height + 200
        }, {
            duration: 1400 / this.enemySpeed * 1000,
            loop: false,
            onComplete: () => {
                hold.removeFromParent()
            }
        });
 
    },
    beginCreateEnemy() {//开始生成
        this.timer = setInterval(() => {
            this.creatEnemy();
 
        }, this.createSpeed);
    },
    stopCreateEnemy() {//停止生成并全部移除
        clearInterval(this.timer)
        this.removeAllChildren()
    },
    checkCollision(enemy) {//碰撞检测
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (enemy.hitTestObject(this.children[i], true)) {
                return true;
            }
        }
        return false;
    }
})
 
export default Enemy