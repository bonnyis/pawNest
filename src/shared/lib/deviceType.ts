// PC/MB 유형 체크
export const getIsMobile = () => {
  const userAgent: string = navigator.userAgent;
  const isMobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  const isMobileWidth = window.innerWidth <= 768;
  return isMobileUA || isMobileWidth;
};
