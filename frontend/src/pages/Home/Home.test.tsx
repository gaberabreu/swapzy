import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import Home from "./Home";

describe("Home", () => {
  it("should render Home properly", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Home")).toBeInTheDocument();
  });
});
