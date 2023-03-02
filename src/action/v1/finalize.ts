/**
 * @author WMXPY
 * @namespace Action_V1
 * @description Finalize
 */

import { PostRealizeV1ProxyResponse } from "@barksh/authentication-types";
import { postRealizeV1Proxy } from "../../proxy/v1/post-realize";
import { executeInquiryActionFromResponse } from "../../util/action";

export type BarkFinalizeV1Request = {

    readonly exposureKey: string;
    readonly accountIdentifier: string;
    readonly password: string;
};

export const barkFinalizeV1 = async (
    authenticationHost: string,
    config: BarkFinalizeV1Request,
): Promise<void> => {

    const realizeResponse: PostRealizeV1ProxyResponse = await postRealizeV1Proxy(authenticationHost, {
        exposureKey: config.exposureKey,
        accountIdentifier: config.accountIdentifier,
        password: config.password,
    });

    executeInquiryActionFromResponse(realizeResponse);
};
