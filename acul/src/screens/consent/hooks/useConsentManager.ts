import { useMemo } from "react";

import Consent from "@auth0/auth0-acul-js/consent";
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

import locales from "@/screens/consent/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useConsentManager = () => {
  const consent = useConsent();
  const user = useUser();
  const tenant = useTenant();
  const branding = useBranding();
  const client = useClient();
  const organization = useOrganization();
  const prompt = usePrompt();
  const untrustedData = useUntrustedData();
  const consentManager = useMemo(() => new Consent(), []);

  const handleAccept = async () => {
    executeSafely("Accept consent", () => consentManager.accept());
  };

  const handleDeny = async () => {
    executeSafely("Deny consent", () => consentManager.deny());
  };

  return {
    consent,
    user,
    tenant,
    branding,
    client,
    organization,
    prompt,
    untrustedData,
    locales,
    handleAccept,
    handleDeny,
  };
};
