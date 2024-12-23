const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                dark: "#1a1a19",
                "semi-dark": "#31511e",
                "semi-light": "#859f3d",
                light: "#f6fcdf",
            },
        },
    },
    plugins: [flowbite.plugin()],
};
