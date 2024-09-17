const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fakeDelay = async (time: number) => {
    await delay(time);
};