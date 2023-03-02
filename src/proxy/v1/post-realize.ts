/**
 * @author WMXPY
 * @namespace Proxy_V1
 * @description Post Realize
 */

import { buildUrlForPostRealizeV1, PostRealizeV1ProxyRequest, PostRealizeV1ProxyResponse } from "@barksh/authentication-types";
import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { ERROR_CODE } from "../../error/code";
import { panic } from "../../error/panic";

export const postRealizeV1Proxy = async (
    authenticationHost: string,
    config: PostRealizeV1ProxyRequest,
): Promise<PostRealizeV1ProxyResponse> => {

    const path: string = buildUrlForPostRealizeV1(authenticationHost);

    const response: Response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
    });

    if (response.status !== HTTP_RESPONSE_CODE.OK) {
        throw panic.code(
            ERROR_CODE.REQUEST_FAILED_1,
            await response.json(),
        );
    }

    return await response.json();
};
