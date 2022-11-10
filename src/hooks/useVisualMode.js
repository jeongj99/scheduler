import { useState } from "react";

// A custom hook that returns a mode, transition functiona and back function
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  let mode = history[history.length - 1]; // mode depends on the history state

  // It will add a newMode to the history state unless replace is true; if replace is true, it will replace the last element in history with the new one
  const transition = (newMode, replace = false) => {
    setHistory(prev => replace ? [...(prev.slice(0, prev.length - 1)), newMode] : [...prev, newMode]);
  };

  // It will remove the last element of the history array and set that new array as the history state
  const back = () => {
    setHistory(prev => prev.length === 1 ? prev : prev.slice(0, prev.length - 1));
  };

  return { mode, transition, back };
}