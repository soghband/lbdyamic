import { OnInit, EventEmitter } from '@angular/core';
import { any } from 'codelyzer/util/function';
export declare class DynamicPopupComponent implements OnInit {
    callback: EventEmitter<{}>;
    confirmStatus: boolean;
    showStatus: boolean;
    queue: boolean;
    statusPopup: string;
    popupProperties: any;
    tempData: any;
    constructor();
    ngOnInit(): void;
    set(type: any, message: any, eventCode?: string, data?: typeof any): void;
    showModel(): void;
    hideModal(): void;
    checkModalOpening(): void;
    confirm(): void;
    close(): void;
}
