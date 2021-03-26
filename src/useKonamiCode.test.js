import { renderHook, act } from "@testing-library/react-hooks";

import useKonamiCode, { konamiSequence } from "./useKonamiCode";

describe("useKonamiCode", () => {
  it("should return the use sequence", () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(result.current.sequence).toEqual(["ArrowUp"]);
  });

  it("should reset the sequence if the user types a wrong sequence", () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
    });

    expect(result.current.sequence).toEqual([]);
  });

  it("should reset true when user types a right sequence", () => {
    const { result } = renderHook(() => useKonamiCode());

    konamiSequence.forEach((key) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });

    expect(result.current.rightSequence).toBe(true);
  });
});
