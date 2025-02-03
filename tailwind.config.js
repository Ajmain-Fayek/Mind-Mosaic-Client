const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                dark: "#295F98",
                "semi-dark": "#CDC2A5",
                "semi-light": "#E1D7C6",
                light: "#EAE4DD",
            },
        },
    },
    plugins: [flowbite.plugin()],
};
