import { useState } from "react";

import { useUser } from "@auth0/auth0-acul-react/consent";

import { BarChartIcon } from "@/assets/icons";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeLink from "@/components/ULThemeLink";
import { cn } from "@/lib/utils";

type ConsentContentProps = {
  onAccept: () => Promise<void> | void;
  onDeny: () => Promise<void> | void;
};

const ConsentContent = ({ onAccept, onDeny }: ConsentContentProps) => {
  // Hook to access user information and profile data.
  // See: https://auth0.com/docs/libraries/acul/react-sdk/API-Reference/Screens/consent#param-use-user
  const user = useUser();

  const [isSubmitting, setIsSubmitting] = useState<"accept" | "deny" | null>(
    null
  );

  const baseTextStyles = cn(
    "theme-universal:font-body",
    "theme-universal:text-body-text",
    "theme-universal:text-(length:--ul-theme-font-body-text-size)"
  );

  const handleAction = async (action: "accept" | "deny") => {
    try {
      setIsSubmitting(action);
      if (action === "accept") {
        await onAccept();
      } else {
        await onDeny();
      }
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 m-auto max-w-xs", baseTextStyles)}>
      {user?.email && (
        <p
          className={cn(
            "m-auto max-w-xs text-center text-xs text-[var(--function-gray-600)]"
          )}
        >
          {user.email}
        </p>
      )}
      <p className={cn("m-auto max-w-xs text-center text-xl")}>
        <strong>ChatGPT</strong> would like your permission to receive and use
        the following information:
      </p>

      <hr className={cn("border-t border-[var(--function-khaki-150)]")} />

      <div className="flex items-start gap-3 m-auto max-w-xs">
        <BarChartIcon
          color="var(--function-orange-500)"
          className="shrink-0 size-4 mt-[2px] theme-universal:text-icons"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-2">
          <p className="leading-5">
            <strong>Biomarker range data on Function</strong>
          </p>
          <p>
            For each of your biomarkers, whether it is "within the recommended
            range", "above range", or "below range".
          </p>
        </div>
      </div>

      <hr className={cn("border-t border-[var(--function-khaki-150)]")} />

      <div className={cn("m-auto max-w-xs", baseTextStyles)}>
        <p>
          Please Note: This does not authorize <strong>ChatGPT</strong> to
          receive any other lab data from Function.
        </p>
        <br />
        <p>
          You can disconnect at any time in your <strong>ChatGPT</strong>{" "}
          account settings under "Apps"; however, <strong>ChatGPT</strong> will
          process any information you share as agreed between you and{" "}
          <strong>ChatGPT</strong>. For full information about how Function
          Health processes your information, see{" "}
          <ULThemeLink href="https://www.functionhealth.com/legal/privacy-policy">
            Function's Privacy Policy
          </ULThemeLink>
          .
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <ULThemeButton
            className="w-full"
            onClick={() => handleAction("accept")}
            disabled={isSubmitting !== null}
          >
            Agree
          </ULThemeButton>
          <ULThemeButton
            className="w-full bg-[var(--function-khaki-50)]"
            variant="outline"
            onClick={() => handleAction("deny")}
            disabled={isSubmitting !== null}
          >
            Cancel
          </ULThemeButton>
        </div>
      </div>
    </div>
  );
};

export default ConsentContent;
