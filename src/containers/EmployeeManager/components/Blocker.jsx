import { useEffect, useContext  } from "react";
import {  UNSAFE_NavigationContext } from "react-router-dom";

function useCustomBlocker(when = true) {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    navigator.push = (...args) => {
      const confirmLeave = window.confirm(
        "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?"
      );
      if (confirmLeave) {
        navigator.push = push;
        navigator.push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, when]);
}

export default useCustomBlocker;