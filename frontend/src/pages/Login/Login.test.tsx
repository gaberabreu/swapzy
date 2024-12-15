import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { toast } from "react-toastify";

import { useNavigate } from "@tanstack/react-router";

import { postLogin } from "@/services/auth.service";

import Login from "./Login";

describe("Login", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render Login properly", () => {
    const { getByText } = render(<Login />);

    expect(getByText("Login")).toBeInTheDocument();
  });

  it("should navigate to / when form submission succeeds", async () => {
    vi.mocked(postLogin).mockResolvedValue({
      accessToken: "fakeAccessToken",
      expiresIn: 300,
      refreshToken: "fakeRefreshToken",
      tokenType: "fake",
    });

    const { getByText, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(postLogin).toHaveBeenCalledWith({
        email: "testuser@example.com",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("should toast an error when form submission fails", async () => {
    vi.mocked(postLogin).mockRejectedValue({ title: "Login failed" });

    const { getByText, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login failed");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
