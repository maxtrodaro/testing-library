import { renderHook, act } from "@testing-library/react-hooks";

import useKonamiCode from "./useKonamiCode";

describe("useKonamiCode", () => {
  it("should return the use sequence", () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(result.current.sequence).toEqual(["ArrowUp"]);
  });
});
