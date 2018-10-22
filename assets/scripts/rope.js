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

        rope_empty:{
            type: cc.SpriteFrame,
            default: null,
        },

        rope_with_cow: {
            type: cc.SpriteFrame,
            default: [],
        },
    },

    onLoad: function(){
        this.node.x = 0;
        this.node.y = -560;
        this.is_shooting = false;

        this.game_scene = cc.find("UI_ROOT").getComponent("game_scenes");
        this._set_rope_empty();
    },

    _set_rope_empty: function(){
        var s = this.getComponent(cc.Sprite);

        //s.SpriteFrame = new cc.SpriteFrame(cc.url.raw('resources/ropeCow1.png'));
          // s.spriteFrame.setTexture(cc.url.raw('resources/ropeCow1.png')); 
          s.spriteFrame = this.rope_empty;
    },

    _set_rope_with_cow: function (cow_type){
        if (cow_type < 1 || cow_type > 3) {
            return;
        };

         console.log('嘻嘻' + cow_type);
        var s = this.getComponent(cc.Sprite);
       // s.spriteFrame.setTexture(cc.url.raw('resources/ropeCow2.png')); 
         s.spriteFrame = this.rope_with_cow[cow_type - 1];
    },

    shoot_out: function (){

        if (this.is_shooting == true) {
            return;
        };

        
        this.is_shooting = true;
        
        var m1 = cc.moveTo(0.5,0,-100);
        var mid_func = cc.callFunc(function(){
            var cow_type = this.game_scene.hit_cow();

            if (cow_type >= 1 && cow_type <= 3) {
                // this.node.y = 112;
                this._set_rope_with_cow(cow_type);
            };

        }.bind(this),this.node);

        var m2 = cc.moveTo(0.5,0,-560);
        var end_func = cc.callFunc(function(){
            this._set_rope_empty();
            this.is_shooting = false;
        }.bind(this),this.node);

        var seq = cc.sequence([m1,mid_func,m2,end_func]);
        this.node.runAction(seq);
    },
});












