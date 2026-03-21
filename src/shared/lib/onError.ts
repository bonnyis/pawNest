import noImg from "@img/Image.png";

export const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = noImg;
};
