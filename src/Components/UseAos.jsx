// src/Components/UseAos.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const UseAos = (deps = []) => {
  useEffect(() => {
    // Initialize AOS with repeat+mirror enabled
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,    // allow re-animate
      mirror: true,   // animate out on scroll past
      offset: 100,
    });

    // Extra: force a full refresh after a short tick to account for React rendering timing
    // refreshHard is more aggressive than refresh
    setTimeout(() => {
      try { AOS.refreshHard(); } catch (e) { AOS.refresh(); }
    }, 50);

    // On scroll/resize, call refreshHard to ensure AOS sees element leaving viewport in real time
    const onScroll = () => {
      // throttle: tiny throttle to avoid too many calls
      if (typeof window._aos_refresh_timeout !== "undefined") {
        clearTimeout(window._aos_refresh_timeout);
      }
      window._aos_refresh_timeout = setTimeout(() => {
        try { AOS.refreshHard(); } catch (e) { AOS.refresh(); }
      }, 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (window._aos_refresh_timeout) clearTimeout(window._aos_refresh_timeout);
    };
  }, deps);
};

export default UseAos;
