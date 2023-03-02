/**
 * @author WMXPY
 * @namespace Error
 * @description List
 */

import { ERROR_CODE } from "./code";

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.EXPOSURE_KEY_IS_REQUIRED]: "Exposure Key is required",

    [ERROR_CODE.REQUEST_FAILED_1]: "Request failed, message: {}",

    [ERROR_CODE.ALREADY_REGISTERED]: "Already registered",
    [ERROR_CODE.NOT_REGISTERED]: "Not registered",
};
