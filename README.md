# Payback Coupon Activation Script

This script automatically logs in to your Payback account and activates available coupons. The script uses [WebdriverIO](https://webdriver.io) to automate the process.

## Quick start using Docker container

The containerized version runs Chromium headless:

**Step 1:** Create file `docker-compose.override.yml` with:

```
version: '3'
services:
  payback_activate:
    environment:
      - PAYBACK_USERNAME=your_username
      - PAYBACK_PASSWORD=your_password
```

**Step 2:** Build image via:

```
docker compose build
```

**Step 3:** Run container `payback_activate` via:

```
docker compose run payback_activate
```

## Contribute and run manually

### Prerequisites

1. Node.js (v14 or later) and npm installed on your system.
2. WebdriverIO and its required dependencies installed in your project folder.

### Setup

1. Clone or download the repository containing the script and the `package.json` file.
2. Open a terminal (Command Prompt on Windows) and navigate to the project folder.
3. Run `npm install` to install the required dependencies.
4. Set the `PAYBACK_USERNAME` and `PAYBACK_PASSWORD` environment variables with your Payback account credentials:

#### Windows (Command Prompt)
   
```
set PAYBACK_USERNAME=your_username
set PAYBACK_PASSWORD=your_password
```

#### Windows (PowerShell)

```
$env:PAYBACK_USERNAME="your_username"
$env:PAYBACK_PASSWORD="your_password"
```

#### Linux and macOS
```
export PAYBACK_USERNAME=your_username
export PAYBACK_PASSWORD=your_password
```

### Running the Script

With the environment variables set, you can now run the script:

```
npm run wdio
```

This command will start the script, which will perform the following steps:

1. Open the Payback login page.
2. Accept cookies.
3. Log in using the provided credentials.
4. Navigate to the coupons page.
5. Activate available coupons.

After the script has completed, you will see the test results in your terminal.

Make sure to set the environment variables for your Payback account credentials every time you open a new terminal or restart your computer.
