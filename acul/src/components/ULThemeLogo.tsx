import { FunctionLogoV2 } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { Avatar } from "./ui/avatar";

export interface ULThemeLogoProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional image url of the logo.
   */
  imageUrl?: string;
  /**
   * Alt Text for the logo image
   */
  altText: string;
  /**
   * Optional Classes for custom overrides
   */
  className?: string;
}

const ULThemeLogo = ({ altText, className, ...rest }: ULThemeLogoProps) => {
  // Using extractTokenValue utility to extract the logo URL, Logo Visible flags from CSS variable
  const isLogoHidden =
    extractTokenValue("--ul-theme-widget-logo-position") === "none";
  const themedStylesAvatar = "flex flex-wrap justify-widget-logo";
  const themedStylesAvatarImg = "h-(--height-widget-logo)";

  return (
    !isLogoHidden && (
      <div className={cn(themedStylesAvatar, className)} {...rest}>
        <Avatar className="size-auto rounded-none">
          <FunctionLogoV2
            role="img"
            aria-label={altText}
            className={cn(themedStylesAvatarImg)}
          />
        </Avatar>
      </div>
    )
  );
};

export default ULThemeLogo;
