"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var LockScreenServiceP2 = /** @class */ (function () {
    function LockScreenServiceP2() {
        var styleTag = document.createElement("style");
        var lockScreenAnime = document.getElementById("lockScreenCss");
        if (lockScreenAnime == null) {
            styleTag.innerText = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid rgba(139,196,63,0.8);  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n" +
                ".loader2 { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid rgba(0,173,31,0.8);  border-radius: 50%; width: 90px; height: 90px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -45px 0 0 -45px; -webkit-animation: spin 1.2s linear infinite; animation: spin 1.2s linear infinite;} \n" +
                "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
            styleTag.id = "lockScreenCss";
            document.head.appendChild(styleTag);
        }
    }
    LockScreenServiceP2.prototype.lockScreen = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 20000; }
        var lockScreenElement = document.getElementById("lockScreenLoading");
        if (lockScreenElement == null) {
            var lockScreenDiv = document.createElement("div");
            lockScreenDiv.id = "lockScreenLoading";
            lockScreenDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            lockScreenDiv.style.width = "100vw";
            lockScreenDiv.style.height = "100vh";
            lockScreenDiv.style.position = "fixed";
            lockScreenDiv.style.top = "0px";
            lockScreenDiv.style.left = "0px";
            lockScreenDiv.style.zIndex = "1051";
            var loading = document.createElement("div");
            var loading2 = document.createElement("div");
            loading.className = "loader";
            loading2.className = "loader2";
            lockScreenDiv.appendChild(loading);
            lockScreenDiv.appendChild(loading2);
            document.body.appendChild(lockScreenDiv);
            this.subscribeProcess = Observable_1.Observable.timer(timeout)
                .subscribe(function () {
                _this.unLockScreen();
            });
        }
        else {
            if (typeof (this.subscribeProcess) != "undefined") {
                this.subscribeProcess.unsubscribe();
                this.subscribeProcess = Observable_1.Observable.timer(timeout)
                    .subscribe(function () {
                    _this.unLockScreen();
                });
            }
        }
    };
    LockScreenServiceP2.prototype.unLockScreen = function () {
        var _this = this;
        Observable_1.Observable.timer(500)
            .subscribe(function () {
            var lockScreenElement = document.getElementById("lockScreenLoading");
            if (lockScreenElement != null) {
                document.body.removeChild(lockScreenElement);
                if (typeof (_this.subscribeProcess) != "undefined") {
                    _this.subscribeProcess.unsubscribe();
                }
            }
        });
    };
    LockScreenServiceP2 = __decorate([
        core_1.Injectable()
    ], LockScreenServiceP2);
    return LockScreenServiceP2;
}());
exports.LockScreenServiceP2 = LockScreenServiceP2;
