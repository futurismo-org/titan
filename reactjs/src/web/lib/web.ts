export const windowWidth = window.parent.screen.width; // eslint-disable-line
export const windowHeight = window.parent.screen.height; // eslint-disable-line

export const onChange = (setter: any) => (e: any) => {
  e.preventDefault();
  setter(e.target.value);
};

export const isMobile = windowWidth <= 480;
