/**
 * @author WMXPY
 * @namespace Util
 * @description Callback
 */

import { InquiryAction, InquiryActionType, PostRealizeV1ProxyResponse } from "@barksh/authentication-types";
import { replaceLocation } from "./window";

const buildRealizeCallbackUrl = (
    callbackUrl: string,
    exposureKey: string,
): string | null => {

    if (typeof callbackUrl !== 'string') {
        return null;
    }

    return callbackUrl.replace('{exposure-key}', exposureKey);
};

export const executeInquiryActionFromResponse = (
    response: PostRealizeV1ProxyResponse,
): void => {

    const actions: InquiryAction[] | undefined = response.actions;

    if (!Array.isArray(actions)) {
        return;
    }

    for (const action of actions) {

        switch (action.type) {
            case 'CALLBACK': {

                const fixedAction: InquiryAction<InquiryActionType.CALLBACK> = action as InquiryAction<InquiryActionType.CALLBACK>;

                const callbackUrl: string | null = buildRealizeCallbackUrl(fixedAction.payload, response.exposureKey);

                if (typeof callbackUrl !== 'string') {
                    return;
                }

                replaceLocation(callbackUrl);
                return;
            }
            case 'WEBHOOK': {
                return;
            }
            case 'CLOSE': {
                return;
            }
        }
    }

};
