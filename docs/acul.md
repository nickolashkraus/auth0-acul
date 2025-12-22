# Auth0 Advanced Customizations for Universal Login (ACUL)

Advanced Customizations for Universal Login (ACUL) lets you build fully custom
authentication screens while still using Universal Login under the hood. For
this use case, ACUL is used to apply specific brand standards to the OAuth
authentication flow, which cannot be accomplished using the standard Universal
Login.

## How it works

ACUL works by redirecting users to your own custom authentication screens
(e.g., login, consent, etc.), which leverage the [Auth0 ACUL SDK][Auth0 ACUL
SDK] for managing user interactions, instead of the default authentication
screens. Custom authentication screens can be developed using any frontend
framework and are hosted as static assets on a CDN.

## Requirements

- An Auth0 tenant configured with Universal Login and a custom domain.
- An Auth0 [First Party Application][First Party Application].
- A CDN (Amazon CloudFront, Google Cloud CDN) with a CI/CD pipeline, such as
  GitHub, to host assets.

**NOTE**: The `auth0 acul init` command generates a new ACUL project from
a template, which includes GitHub Actions workflows for building and deploying
static assets and configuring your Auth0 tenant.

## Configuring ACUL for an Auth0 tenant

ACUL can be configured through three main paths: the Auth0 Dashboard, the Auth0
Management API (e.g., via [Auth0 CLI][Auth0 CLI]), and Infrastructure-as-Code
(IaC) tooling. A key prerequisite for configuration is that your custom
configuration files and frontend assets must be hosted on a public CDN.

## Getting started with ACUL

### Prerequisites

- Node.js 22
- [Auth0 CLI][Auth0 CLI]

### Install and configure Auth0 CLI

Install via Homebrew:

```bash
brew tap auth0/auth0-cli && brew install auth0
```

Authenticate to an Auth0 tenant:

```bash
auth0 login
```

**NOTE**: Make sure you are using a development/staging tenant.

### Initialize an ACUL sample application

Run the following command:

```bash
auth0 acul init "acul"
```

Follow the prompts:
1. Select **React (with ACUL React SDK)**.
2. Select `login`.
3. Install dependencies using `npm install`.

Next:
1. Navigate to `acul/`.
2. Run `npm install` if dependencies were not installed.
3. Start the local development server using `auth0 acul dev`.

### Add additional screens to your project

Additional screens can be added with the following command:

```bash
auth0 acul screen add <screen-name>
```

### Launch the Universal Login (UL) Context Inspector

The Auth0 Universal Login (UL) Context Inspector is a developer tool designed
for debugging and developing Advanced Customizations for Universal Login (ACUL)
screens.

```bash
auth0 acul dev
```

To test the login flow, run `auth0 test login`.

## Deploying ACUL for an Auth0 tenant

TBD

## References

- [ACUL | Overview][ACUL | Overview]
- [ACUL | Configure ACUL][ACUL | Configure ACUL]
- [ACUL | Quickstart][ACUL | Quickstart]
- [ACUL | Development Workflow][ACUL | Development Workflow]
- [ACUL | Deployment Workflow][ACUL | Deployment Workflow]

[ACUL | Overview]: https://auth0.com/docs/customize/login-pages/advanced-customizations
[ACUL | Configure ACUL]: https://auth0.com/docs/customize/login-pages/advanced-customizations/configure
[ACUL | Quickstart]: https://auth0.com/docs/customize/login-pages/advanced-customizations/quickstart
[ACUL | Development Workflow]: https://auth0.com/docs/customize/login-pages/advanced-customizations/development-workflow
[ACUL | Deployment Workflow]: https://auth0.com/docs/customize/login-pages/advanced-customizations/deployment-workflow
[First Party Application]: https://auth0.com/docs/get-started/auth0-overview/create-applications
[Auth0 ACUL SDK]: https://github.com/auth0/universal-login
[Auth0 CLI]: https://github.com/auth0/auth0-cli
