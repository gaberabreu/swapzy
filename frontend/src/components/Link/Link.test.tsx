import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import Link from "./Link";

describe("Link", () => {
  it("should render Link properly", () => {
    const { getByText } = render(<Link to="/">Link</Link>);

    expect(getByText("Link")).toBeInTheDocument();
  });
});
