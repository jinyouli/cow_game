// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var cow_skin = cc.Class({
    name: "cow_skin",
    properties: {

        cow_anim:{
            type: cc.SpriteFrame,
            default:[],
        },
    }
});

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

        cow_skin_set:{
            default:[],
            type:cow_skin, 
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function(){
        this.game_scene = cc.find("UI_ROOT").getComponent("game_scenes");

        this.anim_com = this.node.addComponent("frame_anim");
        this.cow_type = Math.random() * 3 + 1;
        this.cow_type = Math.floor(this.cow_type);
        if (this.cow_type >= 4) {
            this.cow_type = 1;
        };
        this._play_cow_walk();
        this.speed_x = -(Math.random() * 200 + 200);
    },

    _play_cow_walk: function(){
        this.anim_com.sprite_frames = this.cow_skin_set[this.cow_type - 1].cow_anim;
        this.anim_com.duration = 0.2;
        this.anim_com.play_loop();
    },

    update: function (dt){
        var s = this.speed_x * dt;
        this.node.x += s;

        if (this.node.x <= -540) {
            this.game_scene.remove_from_cow_set(this.node);
            this.node.removeFromParent();
        };
    },
    
});








