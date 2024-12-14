import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "react-toastify";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useNavigate } from "@tanstack/react-router";

import { register } from "@/services/auth.service";

import Register from "./Register";

describe("Register", () => {
  let mockNavigate: Mock;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render Register properly", () => {
    const { getByText } = render(<Register />);

    expect(getByText("Register")).toBeInTheDocument();
  });

  it("should navigate to / when form submission succeeds", async () => {
    vi.mocked(register).mockResolvedValue(null);

    const { getByText, getByLabelText } = render(<Register />);

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: "testuser@example.com",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  it("Should toast an error when form submission fails", async () => {
    vi.mocked(register).mockRejectedValue({ title: "Registration failed" });

    const { getByText, getByLabelText } = render(<Register />);

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "testuser@example.com" },
    });

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Registration failed");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
