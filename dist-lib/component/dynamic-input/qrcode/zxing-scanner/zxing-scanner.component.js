"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var browser_qr_code_reader_1 = require("./browser-qr-code-reader");
var ZXingScannerComponent = /** @class */ (function () {
    /**
     * Constructor to build the object and do some DI.
     */
    function ZXingScannerComponent() {
        /**
         * The ZXing code reader.
         */
        this.codeReader = new browser_qr_code_reader_1.BrowserQRCodeReader(1500);
        /**
         * The scan throttling (time between scans) in milliseconds.
         */
        this.scanThrottling = 1500;
        /**
         * Allow start scan or not.
         */
        this.scannerEnabled = true;
        /**
         * Enable or disable autofocus of the camera (might have an impact on performance)
         */
        this.autofocusEnabled = true;
        /**
         * Emitts events when a scan is successful performed, will inject the string value of the QR-code to the callback.
         */
        this.scanSuccess = new core_1.EventEmitter();
        /**
         * Emitts events when a scan fails without errors, usefull to know how much scan tries where made.
         */
        this.scanFailure = new core_1.EventEmitter();
        /**
         * Emitts events when a scan throws some error, will inject the error to the callback.
         */
        this.scanError = new core_1.EventEmitter();
        /**
         * Emitts events when a scan is performed, will inject the Result value of the QR-code scan (if available) to the callback.
         */
        this.scanComplete = new core_1.EventEmitter();
        /**
         * Emitts events when no cameras are found, will inject an exception (if available) to the callback.
         */
        this.camerasFound = new core_1.EventEmitter();
        /**
         * Emitts events when no cameras are found, will inject an exception (if available) to the callback.
         */
        this.camerasNotFound = new core_1.EventEmitter();
        /**
         * Emitts events when the users answers for permission.
         */
        this.permissionResponse = new core_1.EventEmitter();
        this.isEnumerateDevicesSuported = !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }
    /**
     * Manages the bindinded property changes.
     * @param changes
     */
    ZXingScannerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.scannerEnabled) {
            if (!this.scannerEnabled) {
                this.resetScan();
            }
            else if (this.videoInputDevice) {
                this.scan(this.videoInputDevice.deviceId);
            }
        }
        if (changes.device) {
            if (this.device) {
                this.changeDevice(this.device);
            }
            else {
                console.warn('zxing-scanner', 'device', 'Unselected device.');
                this.resetScan();
            }
        }
        if (changes.scanThrottling) {
            this.setCodeReaderThrottling(this.scanThrottling);
        }
    };
    /**
     * Executed after the view initialization.
     */
    ZXingScannerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Chrome 63 fix
        if (!this.previewElemRef) {
            console.warn('zxing-scanner', 'Preview element not found!');
            return;
        }
        // iOS 11 Fix
        this.previewElemRef.nativeElement.setAttribute('autoplay', false);
        this.previewElemRef.nativeElement.setAttribute('muted', true);
        this.previewElemRef.nativeElement.setAttribute('playsinline', true);
        this.previewElemRef.nativeElement.setAttribute('autofocus', this.autofocusEnabled);
        this.askForPermission().subscribe(function (hasPermission) {
            if (hasPermission) {
                // gets and enumerates all video devices
                _this.enumarateVideoDevices(function (videoInputDevices) {
                    if (videoInputDevices && videoInputDevices.length > 0) {
                        _this.camerasFound.next(videoInputDevices);
                    }
                    else {
                        _this.camerasNotFound.next();
                    }
                });
                _this.startScan(_this.videoInputDevice);
            }
            else {
                console.warn('User has denied permission.');
            }
        });
    };
    /**
     * Executes some actions before destroy the component.
     */
    ZXingScannerComponent.prototype.ngOnDestroy = function () {
        this.resetScan();
    };
    /**
     * Starts a new QR-scanner to set a new scan throttling.
     *
     * @param throttling The scan speed in milliseconds.
     */
    ZXingScannerComponent.prototype.setCodeReaderThrottling = function (throttling) {
        this.codeReader = new browser_qr_code_reader_1.BrowserQRCodeReader(throttling);
    };
    /**
     * Properly changes the actual target device.
     *
     * @param device
     */
    ZXingScannerComponent.prototype.changeDevice = function (device) {
        this.videoInputDevice = device;
        this.startScan(device);
    };
    /**
     * Properly changes the actual target device using it's deviceId.
     *
     * @param deviceId
     */
    ZXingScannerComponent.prototype.changeDeviceById = function (deviceId) {
        this.changeDevice(this.getDeviceById(deviceId));
    };
    /**
     * Properly returns the target device using it's deviceId.
     *
     * @param deviceId
     */
    ZXingScannerComponent.prototype.getDeviceById = function (deviceId) {
        return this.videoInputDevices.find(function (device) { return device.deviceId === deviceId; });
    };
    /**
     * Gets and registers all cammeras.
     */
    ZXingScannerComponent.prototype.askForPermission = function () {
        var _this = this;
        // Will try to ask for permission
        navigator
            .mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then(function (stream) {
            try {
                // Start stream so Browser can display permission-dialog ("Website wants to access your camera, allow?")
                _this.previewElemRef.nativeElement.srcObject = stream;
                // After permission was granted, we can stop it again
                stream.getVideoTracks().forEach(function (track) {
                    track.stop();
                });
                _this.previewElemRef.nativeElement.srcObject = undefined;
                // if the scripts lives until here, that's only one mean:
                // permission granted
                _this.hasPermission = true;
                _this.permissionResponse.next(_this.hasPermission);
            }
            catch (err) {
                console.error('zxing-scanner', 'askForPermission', err);
                // permission aborted
                _this.hasPermission = undefined;
                _this.permissionResponse.next(undefined);
            }
        })["catch"](function (err) {
            // failed to grant permission to video input
            console.warn('zxing-scanner', 'askForPermission', err);
            switch (err.name) {
                case 'NotAllowedError':
                    // permission denied
                    _this.hasPermission = false;
                    _this.permissionResponse.next(_this.hasPermission);
                    break;
                case 'NotFoundError':
                    _this.camerasNotFound.next(err);
                    break;
                default:
                    _this.permissionResponse.next(undefined);
                    break;
            }
        });
        // Returns the event emitter, so thedev can subscribe to it
        return this.permissionResponse;
    };
    /**
     * Starts the continuous scanning for the given device.
     *
     * @param deviceId The deviceId from the device.
     */
    ZXingScannerComponent.prototype.scan = function (deviceId) {
        var _this = this;
        try {
            this.codeReader.decodeFromInputVideoDevice(function (result) {
                console.debug('zxing-scanner', 'scan', 'result: ', result);
                if (result) {
                    _this.dispatchScanSuccess(result);
                }
                else {
                    _this.dispatchScanFailure();
                }
                _this.dispatchScanComplete(result);
            }, deviceId, this.previewElemRef.nativeElement);
        }
        catch (err) {
            this.dispatchScanError(err);
            this.dispatchScanComplete(undefined);
        }
    };
    /**
     * Starts the scanning if allowed.
     *
     * @param device The device to be used in the scan.
     */
    ZXingScannerComponent.prototype.startScan = function (device) {
        if (this.scannerEnabled && device) {
            this.scan(device.deviceId);
        }
    };
    /**
     * Stops the scan service.
     */
    ZXingScannerComponent.prototype.resetScan = function () {
        this.codeReader.reset();
    };
    /**
     * Dispatches the scan success event.
     *
     * @param result the scan result.
     */
    ZXingScannerComponent.prototype.dispatchScanSuccess = function (result) {
        this.scanSuccess.next(result.getText());
    };
    /**
     * Dispatches the scan failure event.
     */
    ZXingScannerComponent.prototype.dispatchScanFailure = function () {
        this.scanFailure.next();
    };
    /**
     * Dispatches the scan error event.
     *
     * @param err the error thing.
     */
    ZXingScannerComponent.prototype.dispatchScanError = function (error) {
        this.scanError.next(error);
    };
    /**
     * Dispatches the scan event.
     *
     * @param result the scan result.
     */
    ZXingScannerComponent.prototype.dispatchScanComplete = function (result) {
        this.scanComplete.next(result);
    };
    /**
     * Enumerates all the available devices.
     *
     * @param successCallback
     */
    ZXingScannerComponent.prototype.enumarateVideoDevices = function (successCallback) {
        var _this = this;
        if (!this.isEnumerateDevicesSuported) {
            console.error('zxing-scanner', 'enumarateVideoDevices', 'Can\'t enumerate devices, method not supported.');
            return;
        }
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            _this.videoInputDevices = [];
            for (var _i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
                var deviceI = devices_1[_i];
                // @todo type this as `MediaDeviceInfo`
                var device = {};
                // tslint:disable-next-line:forin
                for (var key in deviceI) {
                    device[key] = deviceI[key];
                }
                if (device.kind === 'video') {
                    device.kind = 'videoinput';
                }
                if (!device.deviceId) {
                    device.deviceId = device.id;
                }
                if (!device.label) {
                    device.label = 'Camera (no-permission)';
                }
                if (device.kind === 'videoinput') {
                    _this.videoInputDevices.push(device);
                }
            }
            successCallback(_this.videoInputDevices);
        });
    };
    __decorate([
        core_1.ViewChild('preview')
    ], ZXingScannerComponent.prototype, "previewElemRef");
    __decorate([
        core_1.Input()
    ], ZXingScannerComponent.prototype, "scanThrottling");
    __decorate([
        core_1.Input()
    ], ZXingScannerComponent.prototype, "scannerEnabled");
    __decorate([
        core_1.Input()
    ], ZXingScannerComponent.prototype, "device");
    __decorate([
        core_1.Input()
    ], ZXingScannerComponent.prototype, "cssClass");
    __decorate([
        core_1.Input()
    ], ZXingScannerComponent.prototype, "autofocusEnabled");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "scanSuccess");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "scanFailure");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "scanError");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "scanComplete");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "camerasFound");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "camerasNotFound");
    __decorate([
        core_1.Output()
    ], ZXingScannerComponent.prototype, "permissionResponse");
    ZXingScannerComponent = __decorate([
        core_1.Component({
            selector: 'zxing-scanner',
            templateUrl: './zxing-scanner.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ZXingScannerComponent);
    return ZXingScannerComponent;
}());
exports.ZXingScannerComponent = ZXingScannerComponent;
