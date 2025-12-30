# Auth0 Advanced Customizations for Universal Login (ACUL)

Advanced Customizations for Universal Login (ACUL) lets you build fully custom
authentication screens while still using Universal Login under the hood. For
this use case, ACUL is used to apply specific brand standards to the OAuth
authentication flow, which cannot be accomplished using the standard Universal
Login.

## How it works

ACUL works by redirecting users to your own custom authentication screens
(e.g., login, consent, etc.), which leverage the
[Auth0 ACUL SDK][Auth0 ACUL SDK] for managing user interactions, instead of the
default authentication screens. Custom authentication screens can be developed
using any frontend framework and are hosted as static assets on a CDN.

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

**NOTE**: Only a subset of all available screen have been implemented.

### Launch the Universal Login (UL) Context Inspector

The Auth0 Universal Login (UL) Context Inspector is a developer tool designed
for debugging and developing Advanced Customizations for Universal Login (ACUL)
screens.

```bash
auth0 acul dev
```

To test the login flow, run `auth0 test login`.

## Deploying ACUL for an Auth0 tenant

### Deploy via the command line

#### 1. Build project (`tsc` + `vite`)

```bash
cd acul/
npm install && npm run build
```

This compiles the TypeScript and creates optimized bundles for each screen in
the `dist/` directory.

#### 2. Upload assets

**Amazon S3**

```bash
aws s3 sync ./dist s3://$BUCKET/ \
  --delete \
  --cache-control "max-age=31536000,public,immutable"
```

**Google Cloud Storage**

```bash
gcloud storage rsync ./dist gs://$BUCKET/ \
  --recursive \
  --delete-unmatched-destination-objects \
  --cache-control="max-age=31536000,public,immutable"
```

#### 3. Configure Auth0 screens via Auth0 CLI

```bash
auth0 login
```

Run the deploy scripts (generated via `auth0 acul init`).

```bash
export CDN_URL=$URL
export DEPLOY_CONFIG_PATH=".github/config/deploy_config.yml"
```

**NOTE**: `$URL` is the URL of the Amazon CloudFront distribution, Amazon S3 or
Google Cloud CDN.

```bash
source .github/actions/configure-auth0-screens/scripts/setup-and-config.sh
.github/actions/configure-auth0-screens/scripts/process-screen.sh 'login'
.github/actions/configure-auth0-screens/scripts/process-screen.sh 'consent'
```

**NOTE**: Requires `jq`, `yq`, and AWS CLI.

### Deploy via GitHub Actions

The ACUL production deployment workflow builds and deploys ACUL screens and
configures a tenant to use them (see `.github/`).

It uses GitHub Actions to:

**Build screen asset bundles**

1. The workflow reads the `.github/config/deploy_config.yml` file to determine which
   screens are marked for deployment (ex. `"login": true`).
2. If deployment targets are found, the workflow builds ACUL assets with Vite,
   which outputs the bundled assets to `/dist`.

**Upload assets to AWS S3**

1. The workflow authenticates with AWS using OpenID Connect (OIDC).
2. Uploads the contents of `/dist` to the specified S3 bucket.

**Configure the Auth0 tenant**

1. The workflow uses Auth0 CLI with an M2M application to configure the screens
   for the tenant. It maps each screen to the correct Auth0 screen using the
   `config/screen-to-prompt-mapping.js` file and updates the Auth0 screen
   customization settings to point to the assets via Amazon CloudFront or S3.

## Troubleshooting

### Cross-Origin Request Blocked

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at [...].
```

If the screen assets are hosted at an origin that is not the same as the custom
domain for your Auth0 tenant, the browser will refuse to load the assets, since
loading ES modules enforces CORS[^1].

To fix the issue, the origin must send the required CORS headers to the Auth0
page's origin. This is accomplished by enabling CORS on the bucket and ensuring
the CDN forwards the CORS response headers.

## References

- [ACUL | Overview][ACUL | Overview]
- [ACUL | Configure ACUL][ACUL | Configure ACUL]
- [ACUL | Quickstart][ACUL | Quickstart]
- [ACUL | Development Workflow][ACUL | Development Workflow]
- [ACUL | Deployment Workflow][ACUL | Deployment Workflow]

[^1]: The Auth0 login page loads JavaScript as ES modules. Browsers treat
module loads as cross-origin requests and require CORS headers. If your assets
are served from a different origin (different domain, scheme, or port) than
your Auth0 tenant's custom domain, the browser will block them unless the asset
origin explicitly allows your Auth0 domain with `Access-Control-Allow-Origin`.

[ACUL | Overview]: https://auth0.com/docs/customize/login-pages/advanced-customizations
[ACUL | Configure ACUL]: https://auth0.com/docs/customize/login-pages/advanced-customizations/configure
[ACUL | Quickstart]: https://auth0.com/docs/customize/login-pages/advanced-customizations/quickstart
[ACUL | Development Workflow]: https://auth0.com/docs/customize/login-pages/advanced-customizations/development-workflow
[ACUL | Deployment Workflow]: https://auth0.com/docs/customize/login-pages/advanced-customizations/deployment-workflow
[First Party Application]: https://auth0.com/docs/get-started/auth0-overview/create-applications
[Auth0 ACUL SDK]: https://github.com/auth0/universal-login
[Auth0 CLI]: https://github.com/auth0/auth0-cli
