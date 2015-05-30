
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //ut.run();
        ut.start();
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
