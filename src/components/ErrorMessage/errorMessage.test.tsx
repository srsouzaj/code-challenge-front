import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from ".";

describe("ErrorMessage component", () => {
  it("should render the error message when message is provided", () => {
    render(<ErrorMessage message="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should not render anything when no message is provided", () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });

  it("should have accessibility attributes", () => {
    render(<ErrorMessage message="Invalid input" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "polite");
    expect(alert).toHaveTextContent("Invalid input");
  });

  it("should use the provided id or fallback to default", () => {
    const customId = "custom-error-id";
    const { rerender } = render(
      <ErrorMessage message="Error with custom ID" id={customId} />
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", customId);

    rerender(<ErrorMessage message="Error with default ID" />);
    expect(screen.getByRole("alert")).toHaveAttribute("id", "form-error");
  });
});
