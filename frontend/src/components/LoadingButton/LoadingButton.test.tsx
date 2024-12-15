import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import LoadingButton from "./LoadingButton";

describe("LoadingButton", () => {
  it("should render LoadingButton properly", () => {
    const { getByText } = render(<LoadingButton>LoadingButton</LoadingButton>);

    const button = getByText("LoadingButton").parentElement;
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("should be disabled when disabled is true", () => {
    const { getByText } = render(<LoadingButton disabled>LoadingButton</LoadingButton>);

    expect(getByText("LoadingButton").parentElement).toBeDisabled();
  });

  it("should be disabled and show circular progress when loading is true", () => {
    const { getByText, getByLabelText } = render(
      <LoadingButton loading>LoadingButton</LoadingButton>
    );

    expect(getByText("LoadingButton").parentElement).toBeDisabled();
    expect(getByLabelText("circular progress")).toBeInTheDocument();
  });
});
