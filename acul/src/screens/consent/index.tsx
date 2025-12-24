import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import ConsentContent from "./components/Consent";
import { useConsentManager } from "./hooks/useConsentManager";

function ConsentScreen() {
  const { consent, handleAccept, handleDeny } = useConsentManager();

  // Set <title> HTML element for page.
  document.title = "Consent";

  applyAuth0Theme(consent);

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <ConsentContent onAccept={handleAccept} onDeny={handleDeny} />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ConsentScreen;
