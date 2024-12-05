import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render App properly", () => {
    const { getByText } = render(<App />);

    expect(getByText("App")).toBeInTheDocument();
  });
});
