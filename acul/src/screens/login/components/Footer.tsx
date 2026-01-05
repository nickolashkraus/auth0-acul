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

  // Override sign up link.
  const signupLinkOverride =
    "https://my.functionhealth.com/signup?code=928AA4E1CD199B9D73A1A3B7DBC7F4F7&utm_source=chatgpt&utm_medium=gpt_app&utm_campaign=connect_signup&utm_content=login_page";

  // Set 'Learn More' link.
  const learnMoreLink =
    "https://www.functionhealth.com/?utm_source=chatgpt&utm_medium=gpt_app&utm_campaign=connect_signup&utm_content=login_page";

  return (
    <div className="text-center">
      <hr className={cn("mb-4 border-t border-[var(--function-khaki-150)]")} />
      <span className={cn("text-sm", baseTextStyles)}>
        {texts?.signupActionText || locales?.footer?.signupActionText}{" "}
      </span>
      <ULThemeLink href={signupLinkOverride} className="font-medium">
        {texts?.signupActionLinkText || locales?.footer?.signupActionLinkText}
      </ULThemeLink>
      <span className={cn("text-sm", baseTextStyles)}> or </span>
      <ULThemeLink href={learnMoreLink} className="font-medium">
        learn more
      </ULThemeLink>
      <span className={cn("text-sm", baseTextStyles)}>.</span>
    </div>
  );
}

export default Footer;
