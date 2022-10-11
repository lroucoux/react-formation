import { act, renderHook } from "@testing-library/react-hooks";
import useHttp from "./use-http";

describe("useHttp hook", () => {
  test("should useHttp initial state", () => {
    const { result } = renderHook(() => useHttp());

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.sendRequest).toBe("function");
  });

  test("should sendRequest with useHttp when ok", async () => {
    const applyData = jest.fn();
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "p1", title: "First Post" }],
    });
    const { result, waitForNextUpdate } = renderHook(() => useHttp());

    act(() => {
      result.current.sendRequest({ url: "toto" }, applyData);
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(applyData).toHaveBeenCalledTimes(1);
  });

  test("should sendRequest with useHttp when KO", async () => {
    const applyData = jest.fn();
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => [{ id: "p1", title: "First Post" }],
    });
    const { result, waitForNextUpdate } = renderHook(() => useHttp());

    act(() => {
      result.current.sendRequest({ url: "toto" }, applyData);
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error).toEqual("Request failed!");
    expect(applyData).toHaveBeenCalledTimes(0);
  });
});
