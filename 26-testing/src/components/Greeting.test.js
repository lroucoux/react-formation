import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("should renders It's good to see you! if the button was NOT clicked", () => {
    render(<Greeting />);

    const paragraphElem = screen.getByText("It's good to see you", {
      exact: false,
    });
    expect(paragraphElem).toBeInTheDocument();
  });

  test("should renders Changed! if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const paragraphElem = screen.getByText("Changed!");
    expect(paragraphElem).toBeInTheDocument();
  });

  test('should NOT renders "good to see you" if button was clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const paragraphElem = screen.queryByText("It's good to see you", {
      exact: false,
    });
    expect(paragraphElem).toBeNull();
  });
});
