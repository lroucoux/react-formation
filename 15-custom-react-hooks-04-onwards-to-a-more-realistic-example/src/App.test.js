import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("should show tasks", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "t1", text: "First Task" }],
    });
    render(<App />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).toHaveLength(1);
  });

  test("should show 'try again' if error when fetch", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => [{ id: "t1", text: "First Task" }],
    });
    render(<App />);

    const textElement = await screen.findByText("Try again");
    expect(textElement).toBeInTheDocument();
  });
});
