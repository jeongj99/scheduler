import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  let mode = history[history.length - 1];

  const transition = (newMode) => {
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    setHistory(prev => prev.slice(0, prev.length - 1));
  };

  return { mode, transition, back };
}