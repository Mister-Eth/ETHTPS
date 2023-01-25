import React from "react";
import { useState } from "react";

export function useLoadValuesHook<T>(
  //setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  loadFunction: () => Promise<T>,
  setValueFunction: (value?: T) => void
) {
  const [completed, setCompleted] = useState(false);
  React.useEffect(() => {
    loadFunction()
      .then((value) => {
        setValueFunction(value);
        setCompleted(true);
      })
      .catch((reason) => {
        console.log("Error: " + reason);
        setCompleted(true);
      });
  }, []);
  return completed;
}
