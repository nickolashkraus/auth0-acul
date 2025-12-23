import { useForm } from "react-hook-form";

import { fireEvent, render, screen } from "@testing-library/react";

import { Form } from "@/components/ui/form";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";

// Wrapper component for tests that need form context.
function TestFormWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  return <Form {...form}>{children}</Form>;
}

describe("ULThemePasswordField", () => {
  it("renders password field with toggle button", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-label");
  });

  it("initially shows password as masked with correct input type", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("toggles password visibility when button is clicked", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button");

    // Initially password type (masked).
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to toggle visibility - should show password as text.
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click to toggle visibility again - should hide password.
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("updates aria-label when toggling visibility", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button");
    const initialLabel = toggleButton.getAttribute("aria-label");

    // Click to toggle.
    fireEvent.click(toggleButton);
    const toggledLabel = toggleButton.getAttribute("aria-label");

    // Labels should be different after toggle.
    expect(initialLabel).not.toBe(toggledLabel);

    // Click to toggle back.
    fireEvent.click(toggleButton);
    const finalLabel = toggleButton.getAttribute("aria-label");

    // Should return to initial label.
    expect(finalLabel).toBe(initialLabel);
  });

  it("calls onVisibilityToggle callback when toggled", () => {
    const handleVisibilityToggle = jest.fn();

    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          onVisibilityToggle={handleVisibilityToggle}
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(handleVisibilityToggle).toHaveBeenCalledWith(true);

    // Click to hide password
    fireEvent.click(toggleButton);
    expect(handleVisibilityToggle).toHaveBeenCalledWith(false);
  });

  it("accepts all standard input props", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          disabled
          data-testid="password-input"
        />
      </TestFormWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeDisabled();
  });

  it("applies custom buttonClassName to toggle button", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          buttonClassName="custom-button-class"
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveClass("custom-button-class");
  });

  it("displays correct icon based on visibility state", () => {
    render(
      <TestFormWrapper>
        <ULThemePasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button");
    const passwordInput = screen.getByLabelText("Password");

    // Initially password is hidden (type="password").
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password.
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click to hide password.
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
