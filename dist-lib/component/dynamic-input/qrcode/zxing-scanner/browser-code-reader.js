"use strict";
exports.__esModule = true;
var zxing_library_4ng4_1 = require("@soghband/zxing-library-4ng4");
/**
 * Based on zxing-typescript BrowserCodeReader
 */
var BrowserCodeReader = /** @class */ (function () {
    /**
     * Constructor for dependency injection.
     *
     * @param reader The barcode reader to be used to decode the stream.
     * @param timeBetweenScans The scan throttling in milliseconds.
     */
    function BrowserCodeReader(reader, timeBetweenScans) {
        if (timeBetweenScans === void 0) { timeBetweenScans = 500; }
        this.reader = reader;
        this.timeBetweenScans = timeBetweenScans;
    }
    /**
     * Starts the decoding from the actual or a new video element.
     *
     * @param callbackFn The callback to be executed after every scan attempt
     * @param deviceId The device's to be used Id
     * @param videoElement A new video element
     */
    BrowserCodeReader.prototype.decodeFromInputVideoDevice = function (callbackFn, deviceId, videoElement) {
        var _this = this;
        this.reset();
        this.prepareVideoElement(videoElement);
        var video = deviceId === undefined
            ? { facingMode: { exact: 'environment' } }
            : { deviceId: { exact: deviceId } };
        var constraints = {
            audio: false,
            video: video
        };
        navigator
            .mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) { return _this.startDecodeFromStream(stream, callbackFn); })["catch"](function (err) {
            /* handle the error, or not */
            console.error(err);
        });
    };
    /**
     * Sets the new stream and request a new decoding-with-delay.
     *
     * @param stream The stream to be shown in the video element.
     * @param callbackFn A callback for the decode method.
     */
    BrowserCodeReader.prototype.startDecodeFromStream = function (stream, callbackFn) {
        var _this = this;
        this.stream = stream;
        // Older browsers may not have srcObject
        if ('srcObject' in this.videoElement) {
            // @NOTE Throws Exception if interrupted by a new loaded request
            this.videoElement.srcObject = stream;
        }
        else {
            // @NOTE Avoid using this in new browsers, as it is going away.
            this.videoElement.src = window.URL.createObjectURL(stream);
        }
        this.videoPlayingEventListener = function () {
            _this.decodeWithDelay(callbackFn);
        };
        this.videoElement.addEventListener('playing', this.videoPlayingEventListener);
        this.videoLoadedMetadataEventListener = function () {
            _this.videoElement.play();
        };
        this.videoElement.addEventListener('loadedmetadata', this.videoLoadedMetadataEventListener);
    };
    /**
     * Sets a HTMLVideoElement for scanning or creates a new one.
     *
     * @param videoElement The HTMLVideoElement to be set.
     */
    BrowserCodeReader.prototype.prepareVideoElement = function (videoElement) {
        if (!videoElement) {
            this.videoElement = document.createElement('video');
            this.videoElement.width = 200;
            this.videoElement.height = 200;
        }
        else {
            this.videoElement = videoElement;
        }
    };
    /**
     *
     * @param callbackFn
     */
    BrowserCodeReader.prototype.decodeWithDelay = function (callbackFn) {
        this.timeoutHandler = window.setTimeout(this.decode.bind(this, callbackFn), this.timeBetweenScans);
    };
    /**
     * Does the real image decoding job.
     *
     * @param callbackFn
     * @param retryIfNotFound
     * @param retryIfChecksumOrFormatError
     * @param once
     */
    BrowserCodeReader.prototype.decode = function (callbackFn, retryIfNotFound, retryIfChecksumOrFormatError, once) {
        var _this = this;
        if (retryIfNotFound === void 0) { retryIfNotFound = true; }
        if (retryIfChecksumOrFormatError === void 0) { retryIfChecksumOrFormatError = true; }
        if (once === void 0) { once = false; }
        if (undefined === this.canvasElementContext) {
            this.prepareCaptureCanvas();
        }
        this.canvasElementContext.drawImage(this.videoElement || this.imageElement, 0, 0);
        var luminanceSource = new zxing_library_4ng4_1.HTMLCanvasElementLuminanceSource(this.canvasElement);
        var binaryBitmap = new zxing_library_4ng4_1.BinaryBitmap(new zxing_library_4ng4_1.HybridBinarizer(luminanceSource));
        try {
            var result = this.readerDecode(binaryBitmap);
            callbackFn(result);
            if (!once && !!this.stream) {
                setTimeout(function () { return _this.decodeWithDelay(callbackFn); }, this.timeBetweenScans);
            }
        }
        catch (re) {
            console.debug(retryIfChecksumOrFormatError, re);
            if (retryIfNotFound && zxing_library_4ng4_1.Exception.isOfType(re, zxing_library_4ng4_1.Exception.NotFoundException)) {
                console.debug('zxing-scanner', 'QR-code not-found, trying again...');
                this.decodeWithDelay(callbackFn);
            }
            else if (retryIfChecksumOrFormatError &&
                (zxing_library_4ng4_1.Exception.isOfType(re, zxing_library_4ng4_1.Exception.ChecksumException) ||
                    zxing_library_4ng4_1.Exception.isOfType(re, zxing_library_4ng4_1.Exception.FormatException))) {
                console.warn('zxing-scanner', 'Checksum or format error, trying again...', re);
                this.decodeWithDelay(callbackFn);
            }
        }
    };
    /**
     * Alias for this.reader.decode
     *
     * @param binaryBitmap
     */
    BrowserCodeReader.prototype.readerDecode = function (binaryBitmap) {
        return this.reader.decode(binaryBitmap);
    };
    /**
     * 🖌 Prepares the canvas for capture and scan frames.
     */
    BrowserCodeReader.prototype.prepareCaptureCanvas = function () {
        var canvasElement = document.createElement('canvas');
        var width;
        var height;
        if (undefined !== this.videoElement) {
            width = this.videoElement.videoWidth;
            height = this.videoElement.videoHeight;
        }
        else {
            width = this.imageElement.naturalWidth || this.imageElement.width;
            height = this.imageElement.naturalHeight || this.imageElement.height;
        }
        canvasElement.style.width = width + 'px';
        canvasElement.style.height = height + 'px';
        canvasElement.width = width;
        canvasElement.height = height;
        this.canvasElement = canvasElement;
        this.canvasElementContext = canvasElement.getContext('2d');
    };
    /**
     * Stops the continuous scan and cleans the stream.
     */
    BrowserCodeReader.prototype.stop = function () {
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
        if (this.stream) {
            this.stream.getTracks()[0].stop();
            this.stream = null;
        }
    };
    /**
     * Resets the scanner and it's configurations.
     */
    BrowserCodeReader.prototype.reset = function () {
        // stops the camera, preview and scan 🔴
        this.stop();
        if (this.videoElement) {
            // first gives freedon to the element 🕊
            if (undefined !== this.videoPlayEndedEventListener) {
                this.videoElement.removeEventListener('ended', this.videoPlayEndedEventListener);
            }
            if (undefined !== this.videoPlayingEventListener) {
                this.videoElement.removeEventListener('playing', this.videoPlayingEventListener);
            }
            if (undefined !== this.videoLoadedMetadataEventListener) {
                this.videoElement.removeEventListener('loadedmetadata', this.videoLoadedMetadataEventListener);
            }
            // then forgets about that element 😢
            this.videoElement.srcObject = undefined;
            this.videoElement.removeAttribute('src');
            this.videoElement = undefined;
        }
        if (this.imageElement) {
            // first gives freedon to the element 🕊
            if (undefined !== this.videoPlayEndedEventListener) {
                this.imageElement.removeEventListener('load', this.imageLoadedEventListener);
            }
            // then forgets about that element 😢
            this.imageElement.src = undefined;
            this.imageElement.removeAttribute('src');
            this.imageElement = undefined;
        }
        // cleans canvas references 🖌
        this.canvasElementContext = undefined;
        this.canvasElement = undefined;
    };
    return BrowserCodeReader;
}());
exports.BrowserCodeReader = BrowserCodeReader;
