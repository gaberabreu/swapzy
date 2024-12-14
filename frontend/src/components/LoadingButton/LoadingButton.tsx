import type { FC } from "react";
import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const LoaderWrapper = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  inset: 0,
});

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({ children, disabled, loading, ...rest }) => {
  return (
    <Button
      {...rest}
      disabled={disabled || loading}
    >
      {loading && (
        <LoaderWrapper>
          <CircularProgress
            size={20}
            color="inherit"
          />
        </LoaderWrapper>
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </Button>
  );
};

export default LoadingButton;
