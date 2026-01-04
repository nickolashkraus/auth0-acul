import ULThemeLink from "@/components/ULThemeLink";
import { cn } from "@/lib/utils";

import { useLoginManager } from "../hooks/useLoginManager";

function Footer() {
  const { texts, locales, signupLink } = useLoginManager();

  if (!signupLink) {
    return null;
  }

  const baseTextStyles = cn(
    "theme-universal:font-body",
    "theme-universal:text-body-text",
    "theme-universal:text-(length:--ul-theme-font-body-text-size)"
  );

  return (
    <div className="text-center">
      <hr className={cn("mb-4 border-t border-[var(--function-khaki-150)]")} />
      <span className={cn("text-sm", baseTextStyles)}>
        {texts?.signupActionText || locales?.footer?.signupActionText}{" "}
      </span>
      <ULThemeLink href={signupLink} className="font-medium">
        {texts?.signupActionLinkText || locales?.footer?.signupActionLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
