var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/rank/RankPanelSkin.exml";
        return _this;
    }
    RankPanel.prototype.childrenCreated = function () {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.GET_RANK_LIST, {}, this.ranklistcallback.bind(this));
        EventManage.addButtonEvent(this, this.btnCaifu, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnShu, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 2));
        EventManage.addButtonEvent(this, this.btnYing, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 3));
    };
    RankPanel.prototype.clickBtn = function (num) {
        this.btnShu.source = "rank.btnShuan";
        this.btnYing.source = "rank.btnYingan";
        this.btnCaifu.source = "rank.btnCaifuan";
        switch (num) {
            case 1:
                this.btnCaifu.source = "rank.btnCaifu";
                Net.send(Protocol.GET_RANK_LIST, {}, this.ranklistcallback.bind(this));
                break;
            case 2:
                this.btnShu.source = "rank.btnShu";
                Net.send(Protocol.GET_RANK_LIST2, { win: "0" }, this.ranklistcallback.bind(this));
                break;
            case 3:
                this.btnYing.source = "rank.btnYing";
                Net.send(Protocol.GET_RANK_LIST2, { win: "1" }, this.ranklistcallback.bind(this));
                break;
        }
    };
    RankPanel.prototype.ranklistcallback = function (r) {
        if (r.code == 200) {
            this.clearItems();
            var list = r.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("RankItemPanel");
                item.y = i * 100;
                this.itemGroup.addChild(item);
                item.setData({ name: list[i].name, vip: list[i].vip, gold: list[i].gold, rank: i + 1, headurl: list[i].headurl });
                this.arr.push(item);
            }
        }
    };
    RankPanel.prototype.clearItems = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("RankItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    };
    RankPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    RankPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return RankPanel;
}(eui.Component));
__reflect(RankPanel.prototype, "RankPanel", ["fany.IDispose"]);