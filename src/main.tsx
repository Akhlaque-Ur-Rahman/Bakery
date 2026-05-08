import Lenis from "lenis";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.1,
});

const raf = (time: number) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(<App />);