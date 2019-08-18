export const windowWidth = window.parent.screen.width; // eslint-disable-line
export const windowHeight = window.parent.screen.height; // eslint-disable-line

console.log(windowWidth);

export const isMobile = windowWidth <= 480;
