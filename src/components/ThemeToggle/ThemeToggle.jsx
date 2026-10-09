import { useEffect, useState } from "react";
import "./ThemeToggle.css";

const KEY = "bbp-theme";

// Tema inicial: el guardado por la persona; si no hay, el del dispositivo.
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    /* sin almacenamiento: se usa el del dispositivo */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* se aplica igualmente, pero no se recordará */
    }
  };

  const label =
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <button
      type="button"
      className="themetoggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? (
        /* sol: pulsar lleva al modo claro */
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
        </svg>
      ) : (
        /* luna: pulsar lleva al modo oscuro */
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
