/**
 * @author WMXPY
 * @namespace Util
 * @description Window
 */

export const resetWindowLocation = (): void => {

    const url: URL = new URL(window.location.href);
    window.history.replaceState({}, document.title, url.origin);
};

export const replaceLocation = (href: string): void => {

    window.location.replace(href);
};
