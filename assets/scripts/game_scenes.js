// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        cow_prefab:{
            type: cc.Prefab,
            default: null,
        },

    },

    onLoad: function(){
        this.is_start = false;
        this.cow_set = [];

        this.checkout_root = cc.find("UI_ROOT/checkout_root");
        this.checkout_src = cc.find("UI_ROOT/checkout_root/bg_mask/score").getComponent(cc.Label);
        this.time_src = cc.find("UI_ROOT/time").getComponent(cc.Label);
        this.cow_src = cc.find("UI_ROOT/cow_count").getComponent(cc.Label);

        this.start_game();
    },

    _on_timer: function(){
        this.time_count --;
        this.time_src.string = "" + this.time_count;

        if (this.time_count <= 0) {
            this.unscheduleAllCallbacks();
            this.checkout_root.active = true;
            this.checkout_src.string = "分数：" + this.cow_count;
            this.is_start == false;
            return;
        };
        this.scheduleOnce(this._on_timer.bind(this),1);
    },

    start_game: function(){

        console.log("测试开始");
        // if (this.is_start == true){
        //     return;
        // }

        this.checkout_root.active = false;
        this.is_start = true;
        this.cow_count = 0;
        this.cow_src.string = "" + this.cow_count;

        this.time_count = 60;
        this.time_src.string = "" + this.time_count;
        this.checkout_root.setLocalZOrder(3000);

        this.unscheduleAllCallbacks();
        this.scheduleOnce(this._on_timer.bind(this),1);
        this._gen_cow();
    },

    remove_from_cow_set: function(cow){
        var i = this.cow_set.indexOf(cow);
        this.cow_set.splice(i,1);
    },

    hit_cow: function(){
        var cow_type = -1;
        for (var i = 0; i < this.cow_set.length; i++) {
            if (this.cow_set[i].x >= 70 && this.cow_set[i].y <= 130) {

                cow_type = this.cow_set[i].getComponent("cow").cow_type;
                this.cow_set[i].removeFromParent();
                this.cow_set.splice(i,1);

                this.cow_count ++;
                this.cow_src.string = "" + this.cow_count;

                return cow_type;
            }
        }
        return -1;
    },

    _gen_cow: function(){
        var cow = cc.instantiate(this.cow_prefab);
        this.node.addChild(cow);
        cow.active = true;
        cow.x = 640;
        cow.y = -100;
        this.cow_set.push(cow);
        this.scheduleOnce(this._gen_cow.bind(this),Math.random() * 3 + 4);
    },

    start:function(){
        var shoot_bt = this.node.getChildByName("shoot_action");
        shoot_bt.setLocalZOrder(2000);

        var rope = this.node.getChildByName("rope");
        rope.setLocalZOrder(1000);
    },
    
});









