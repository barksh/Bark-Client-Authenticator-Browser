/**
 * @author WMXPY
 * @namespace Portal
 * @description Portal
 */

import { ERROR_CODE } from "../error/code";
import { panic } from "../error/panic";
import { resetWindowLocation } from "../util/window";

export class Portal {

    private static _registered: boolean = false;
    private static _instance: Portal | undefined;

    public static isRegistered(): boolean {
        return this._registered;
    }

    public static register(): Portal {

        if (this._registered) {
            throw panic.code(ERROR_CODE.ALREADY_REGISTERED);
        }
        this._registered = true;

        const url: URL = new URL(window.location.href);
        const exposureKey: string | null = url.searchParams.get("key");

        if (!exposureKey) {
            throw panic.code(ERROR_CODE.EXPOSURE_KEY_IS_REQUIRED);
        }

        const callback: string | null = url.searchParams.get("callback");
        const webhook: string | null = url.searchParams.get("webhook");

        this._instance = new Portal(
            exposureKey,
            callback,
            webhook,
        );
        resetWindowLocation();

        return this._instance;
    }

    public static getInstance(): Portal {

        if (!this._instance) {

            throw panic.code(ERROR_CODE.NOT_REGISTERED);
        }
        return this._instance;
    }

    private readonly _exposureKey: string;

    private readonly _callback: string | null;
    private readonly _webhook: string | null;

    private constructor(
        exposureKey: string,
        callback: string | null,
        webhook: string | null,
    ) {

        this._exposureKey = exposureKey;

        this._callback = callback;
        this._webhook = webhook;
    }

    public get exposureKey(): string {
        return this._exposureKey;
    }

    public get callback(): string | null {
        return this._callback;
    }

    public get webhook(): string | null {
        return this._webhook;
    }
}
