import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";

import ConsentContent from "./components/Consent";
import { useConsentManager } from "./hooks/useConsentManager";

function ConsentScreen() {
  const { handleAccept, handleDeny } = useConsentManager();

  // Set <title> HTML element for page.
  document.title = "Consent";

  // Do NOT apply Branding theme set via tenant (Branding > Universal Login).
  // applyAuth0Theme(consent);

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <ConsentContent onAccept={handleAccept} onDeny={handleDeny} />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ConsentScreen;
