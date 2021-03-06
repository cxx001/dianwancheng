
/**
 * 进入前加载
 */
class ResLoading extends eui.Component implements fany.IDispose {
    private txtStr: eui.Label;
    private btnClose: eui.Label;
    private res: string;
    private txtTips: eui.BitmapLabel;
    //    private isNetLoadCom: boolean = false;
    //    private isResLoadCom: boolean = false;
    private r: any = null;
    public constructor() {
        super();
        this.skinName = "resource/skins/other/ResLoadingPanelSkin.exml";
    }
    public init(res): void {
        this.res = res;
        switch (res) {
            case "jinsha":
                if (!GlobalData.isLodingComJinSha) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                } else {
                    this.callback(res);
                }
                break;
            case "jinhua":
                if (!GlobalData.isLodingComJinHua) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                } else {
                    this.callback(res);
                }
                break;
            case 'niuniu':
                if (!GlobalData.isLodingComNiuNiu) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
            case 'blackjack':
                if (!GlobalData.isLodingComBlackJack) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
            case 'pk':
                if (!GlobalData.isLodingComPK) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
            case 'ddz':
                if (!GlobalData.isLodingComDDZ) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
            case 'clown':
                if (!GlobalData.isLodingComClown) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
            case 'fruit':
                if (!GlobalData.isLodingComFruit) {
                    ResManage.init(res, true, this.callback.bind(this, res));
                }
                else {
                    this.callback(res);
                }
                break;
        }
    }
    private netcallback(r): void {
        this.r = r;
        this.openPanel();
        this.dispose();
    }
    private zhuan: eui.Image;
    public childrenCreated(): void {
        this.setTouchEnabled();
        this.txtStr.text = "正在加载界面资源...";
        this.zhuan.anchorOffsetX = 25;
        this.zhuan.anchorOffsetY = 25;
        EnterFrameManage.add(this.gogo.bind(this), "ResLoading.gogo");
        EventManage.addOnceEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    }
    public gogo(): void {
        this.zhuan.rotation += 8;
    }
    public setProgress(current, total): void {
        this.txtStr.text = "正在加载资源...";
        this.txtTips.text = Math.floor((current / total) * 100) + "%";
    }
    private callback(res): void {
        this.txtStr.text = "正在加载数据...";
        switch (res) {
            case "jinsha":
                Net.send(Protocol.JOIN_JINSHA_GAME, {}, this.netcallback.bind(this));
                break;
            case "jinhua":
                Net.send(Protocol.JOIN_GOLDEN_GAME, {}, this.netcallback.bind(this));  //请求初始化数据
                break;
            case 'niuniu':
                Net.send(Protocol.JOIN_NIUNIU_GAME, {}, this.netcallback.bind(this));
                break;
            case 'blackjack':
                Net.send(Protocol.BLACK_JACK_JOIN, {}, this.netcallback.bind(this));
                break;
            case 'pk':
                // Net.send(Protocol.BLACK_JACK_JOIN, {}, this.netcallback.bind(this));
                this.netcallback({ code: '200' }); //没有初始化数据
                break;
            case 'ddz':
                //Net.send(Protocol.JOIN_DDZ_GAME, {}, this.netcallback.bind(this));
                this.netcallback({ code: '200' }); //没有初始化数据
                break;
            case 'clown':
                Net.send(Protocol.CLOWN_CLOWNHANDLER_JOINGAME, {}, this.netcallback.bind(this));
                break;
            case "fruit":
                Net.send(Protocol.FRUIT_JOIN_GAME, {}, this.netcallback.bind(this));
                break;
        }
    }
    private openPanel(): void {
        if (this.r == null) {
            TipsManage.showTips("数据异常！请重新操作！");
            return;
        }
        if (this.r.code != 200) {
            TipsManage.showTips("数据异常！请重新操作！" + JSON.stringify(this.r));
            return;
        }
        switch (this.res) {
            case "jinsha":
                PanelManage.openJinSha(this.r);
                GlobalData.isLodingComJinSha = true;
                break;
            case "jinhua":
                PanelManage.openZhaJinHua(this.r);
                GlobalData.isLodingComJinHua = true;
                break;
            case 'niuniu':
                PanelManage.openNiuNiu(this.r);
                GlobalData.isLodingComNiuNiu = true;
                break;
            case 'blackjack':
                PanelManage.openBlackJack(this.r);
                GlobalData.isLodingComBlackJack = true;
                break;
            case 'pk':
                PanelManage.openPk(this.r);
                GlobalData.isLodingComPK = true;
                break;
            case 'ddz':
                MusicManage.closeBgMuisc();
                MusicManage.playGameBgMuisc("hallBgm", 0.5, -1);
                PanelManage.openDdz(this.r);
                GlobalData.isLodingComDDZ = true;
                break;
            case 'clown':
                PanelManage.openClown(this.r);
                GlobalData.isLodingComClown = true;
                break;
            case "fruit":
                PanelManage.openFruit(this.r);
                GlobalData.isLodingComFruit = true;
                break;
        }
    }
    public dispose(): void {
        EnterFrameManage.remove("ResLoading.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}
