/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css", // ✅ CSS 파일 포함!
  ],
  theme: {
    extend: {
      fontFamily: {
        godick: ["Pretendard", "Noto Sans KR"],
        display: ["'1973MimiWorld'", "Pretendard"],
      },
      colors: {
        bgColor: "#FAF3E0",
        oliveGr: "#A6A57A",
        pinkColor: "#F7D4B4",
        orgColor: "#F4A261",
        grayColor: "gray",
      },
    },
  },
  plugins: [],
};
