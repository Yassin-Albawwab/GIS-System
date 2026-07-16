/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./dynamic-table/**/*.{js,ts,jsx,tsx,mdx}",
    "./clients/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      // padding: "70px",
      padding: {
        DEFAULT: "16px",
        // sm: "20px",
        lg: "70px",
        xl: "70px",
      },
      screens: {
        // DEFAULT: "1512px",
        // sm: "1280px",
        // md: "868px",
        lg: "1280px",
        xl: "1512px",
        // xl: "1512px",
        // "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "#FFF",
        },
        primary: "rgb(var(--primary) , <alpha-value>)",
      },
      boxShadow: {
        small: "0px 0px 14px 0px #00000026",
        big: "0px 8px 64px 0px #29417314",
        // note: "0px 8px 64px 0px #29417314",
      },
      fontSize: {
        xxs: ["10.5px", "12.5px"],
      },
      keyframes: {
        zoomOut: {
          "0%": {
            opacity: "0",
            transform: "scale(125%)",

            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
          "10%": {
            opacity: "1",
            transform: "scale(125%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
          "100%": {
            transform: "scale(100%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
        },
        zoomInOut: {
          "0%": {
            transform: "scale(85%)",

            animationTimingFunction: "cubic-bezier(0.47, 0.0, 0.745, 0.715)",
          },
          "5%": {
            transform: "scale(85%)",

            animationTimingFunction: "cubic-bezier(0.47, 0.0, 0.745, 0.715)",
          },
          "60%": {
            transform: "scale(100%)",
            animationTimingFunction: "ease-out",
          },
          "67%": {
            transform: "scale(100%)",
            animationTimingFunction: "ease-out",
          },
          "100%": {
            transform: "scale(85%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
        },
        txRight: {
          "0%": {
            transform: "translateX(-70%) rotate(-15deg)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
          "50%": {
            transform: "translateX(-55%) rotate(-15deg)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },

          "100%": {
            transform: "translateX(-70%)  rotate(-15deg)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
        },
        // "0%, 100%": {
        //   transform: "scale(125%)",
        //   // animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        // },

        cartCount: {
          // "0%": {
          //   transform: "translateX(0%)",
          //   animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          // },
          "20%": {
            transform: "translateX(50%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.963, 0.235, 0.983)",
          },

          "100%": {
            transform: "translateX(0%) ",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
        },
        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(75%)",

            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
          "10%": {
            opacity: "1",
            transform: "scale(75%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
          "100%": {
            transform: "scale(100%)",
            animationTimingFunction: "cubic-bezier(0.138, 0.563, 0.235, 0.983)",
          },
        },

        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "none",
          },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        fadeInTop: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0,50%,0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        scrollAnim: {
          "0%": { top: "5px", opacity: "1" },
          "100%": { top: "15px", opacity: "0" },
        },

        arrowAnim: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        zoomOut: "zoomOut 1.2s ease-out",
        zoomIn: "zoomIn   1.2s ease-out",
        zoomInOut: "zoomInOut 6s ease-out infinite",
        txRight: "txRight 4s ease-out infinite",
        cartCount: "cartCount 2s ease-out infinite",
        typing: "typing 5s, cursor .4s step-end infinite alternate",
        fadeInLeft: "fadeInLeft 1s ease-out forwards",
        arrowAnim: "arrowAnim 1.2s infinite ",
        scrollAnim: "scrollAnim 1.1s infinite",
        fadeInTop: "fadeInTop 0.4s ease-out forwards",
        slideLeft: "slideLeft 1s ease-out forwards",
        fadeIn: "fadeIn 0.5s linear",
      },
    },
  },
  plugins: [require("tailwindcss")],
};
