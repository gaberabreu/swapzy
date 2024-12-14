import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom";

vi.mock("react-toastify");
vi.mock("zustand");
vi.mock("@tanstack/react-router");
vi.mock("@/services/auth.service");

afterEach(() => {
  cleanup();
});
