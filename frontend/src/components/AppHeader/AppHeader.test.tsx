import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import { useNavigate } from "@tanstack/react-router";

import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render AppHeader properly", () => {
    const { getByLabelText } = render(<AppHeader />);

    expect(getByLabelText("toggle menu")).toBeInTheDocument();
  });

  it("should call logout and navigate to /auth/login on logout", () => {
    const { getByLabelText } = render(<AppHeader />);

    fireEvent.click(getByLabelText("logout"));

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth/login" });
  });
});
