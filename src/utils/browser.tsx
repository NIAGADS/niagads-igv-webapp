// functions for maninpulating IGV browser object

export const loadTrack = async (config: any, browser: any) => {
    await browser.loadTrack(config);
};
