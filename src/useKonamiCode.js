import { useEffect, useState, useCallback } from "react";

export const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function useKonamiCode(
  codeSequence = konamiSequence,
  callback = () => {}
) {
  const [sequence, setSequence] = useState([]);
  const [rightSequence, setRightSequence] = useState(false);

  const onKeyDown = (event) => setSequence((prev) => [...prev, event.key]);

  const sequenceFunction = useCallback(
    (sequence) => {
      sequence.forEach((key, i) => {
        if (key !== codeSequence[i]) {
          setSequence([]);
        }
      });

      if (sequence.toString() === codeSequence.toString()) {
        setRightSequence(true);
        callback();
      }
    },
    [callback, codeSequence]
  );

  useEffect(() => {
    sequenceFunction(sequence);
  }, [sequence, sequenceFunction]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return { sequence, rightSequence };
}
