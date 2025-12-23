// Modules to be mocked.
import {
  useBranding,
  useClient,
  useConsent,
  useOrganization,
  usePrompt,
  useTenant,
  useUntrustedData,
  useUser,
} from "@auth0/auth0-acul-react/consent";
// React Testing Library
//
// See: https://testing-library.com/docs/react-testing-library/intro
import { render, screen } from "@testing-library/react";

// Module under test.
import ConsentScreen from "../index";

// Mock Consent class (@auth0/auth0-acul-js/consent).
jest.mock("@auth0/auth0-acul-js/consent", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    accept: jest.fn(),
    deny: jest.fn(),
  })),
}));

// Mock Consent React component hooks (@auth0/auth0-acul-react/consent).
jest.mock("@auth0/auth0-acul-react/consent", () => ({
  useConsent: jest.fn(),
  useUser: jest.fn(),
  useTenant: jest.fn(),
  useBranding: jest.fn(),
  useClient: jest.fn(),
  useOrganization: jest.fn(),
  usePrompt: jest.fn(),
  useUntrustedData: jest.fn(),
}));

describe("ConsentScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useConsent as jest.Mock).mockReturnValue({ branding: {} });
    (useUser as jest.Mock).mockReturnValue({
      email: "first.last@functionhealth.com",
    });
    (useTenant as jest.Mock).mockReturnValue({});
    (useBranding as jest.Mock).mockReturnValue({});
    (useClient as jest.Mock).mockReturnValue({});
    (useOrganization as jest.Mock).mockReturnValue({});
    (usePrompt as jest.Mock).mockReturnValue({});
    (useUntrustedData as jest.Mock).mockReturnValue({});
  });

  it("renders consent copy and actions", () => {
    render(<ConsentScreen />);

    // Check for unique text content that identifies key sections.
    // Email
    expect(
      screen.getByText(/first.last@functionhealth.com/i)
    ).toBeInTheDocument();
    // Header
    expect(
      screen.getByText(/would like your permission to receive/i)
    ).toBeInTheDocument();
    // Biomarkers
    expect(
      screen.getByText(/Biomarker range data on Function/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/For each of your biomarkers/i)
    ).toBeInTheDocument();
    // Disclaimer
    expect(
      screen.getByText(/Please Note: This does not authorize/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You can disconnect at any time/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /privacy policy/i })
    ).toHaveAttribute(
      "href",
      "https://www.functionhealth.com/legal/privacy-policy"
    );
    // Buttons
    expect(screen.getByRole("button", { name: /agree/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});
