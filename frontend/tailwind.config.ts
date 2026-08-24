import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(214 24% 88%)",
        background: "hsl(210 30% 98%)",
        foreground: "hsl(222 35% 12%)",
        primary: { DEFAULT: "hsl(172 65% 32%)", foreground: "white" },
        accent: { DEFAULT: "hsl(38 88% 54%)", foreground: "hsl(222 35% 12%)" },
        muted: { DEFAULT: "hsl(210 20% 94%)", foreground: "hsl(215 16% 38%)" },
        card: { DEFAULT: "white", foreground: "hsl(222 35% 12%)" },
        destructive: { DEFAULT: "hsl(0 72% 51%)", foreground: "white" }
      }
    }
  },
  plugins: []
} satisfies Config;
