import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";

import Home from "./Home";

describe("Home", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render Home properly", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("should call logout on button click", () => {
    const { getByText } = render(<Home />);

    fireEvent.click(getByText("Logout"));

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/register" });
  });
});
