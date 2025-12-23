// This file runs before Jest's test environment is set up.
// It filters out known third-party library console warnings.

const originalError = global.console.error;

global.console.error = (...args) => {
  // Get the error message - could be first arg or join all args.
  const message = args
    .map((arg) => (typeof arg === "string" ? arg : String(arg)))
    .join(" ");

  // Suppress third-party captcha library event handler warnings.
  if (message.includes("Unknown event handler property")) {
    const captchaProps = ["onVerify", "onExpire", "onExpired", "onError"];
    if (captchaProps.some((prop) => message.includes(prop))) {
      return; // Suppress
    }
  }

  // Suppress React 19 unrecognized prop warnings from SVG/third-party
  // components.
  if (message.includes("React does not recognize")) {
    const ignoredProps = ["maskType", "imageUrl"];
    if (ignoredProps.some((prop) => message.includes(prop))) {
      return; // Suppress
    }
  }

  // Pass through all other console.error calls.
  originalError.apply(console, args);
};
