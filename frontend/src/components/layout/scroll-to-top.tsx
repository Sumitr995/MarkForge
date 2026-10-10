import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top whenever the page (pathname) changes.
// Ignores hash changes so in-page anchors (e.g. /#features) keep working.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
