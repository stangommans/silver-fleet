## 🏗 Infrastructure Overview
*   **Provider:** Hetzner Cloud (CX22 Instance)
*   **OS:** Ubuntu 24.04
*   **Orchestration:** CapRover (Docker Swarm)
*   **Domain:** `[YOUR-SUBDOMAIN].[YOUR-DOMAIN].nl`
*   **SSL/TLS:** Automated via Let's Encrypt (Managed by CapRover)

## 🚀 The Build Pipeline
The deployment is fully automated via GitHub Webhooks.
1.  **Push to GitHub:** Triggers the CapRover webhook.
2.  **Container Build:** CapRover pulls the repo and builds the image using the `captain-definition`.
3.  **Environment:** Uses **Node.js 24** (as required by our current build configuration).
4.  **Networking:** Internal container port **3000** is mapped to the public domain.

## 🛠 Management & Maintenance

### Accessing the Dashboard
The admin panel is available at your configured Captain root:
`https://captain.[YOUR-SUBDOMAIN].[YOUR-DOMAIN].nl`

### View Logs
To view the trading bot's real-time logs or debugging output:
1. Log in to CapRover.
2. Select the application from the dashboard.
3. Click **Log Viewer**.

### Manual Restart / Force Build
If an automated build fails or a manual restart is needed:
*   Use the **Deployment** tab in CapRover to "Force Build".
*   Use the **App Configs** tab to trigger a "Restart App".

## 📦 Key Files
*   `captain-definition`: Configures the Node.js 24 runtime for CapRover.
*   **Environment Variables:** Managed via the CapRover UI (**App Configs** tab). 
    *   *Note: Do not commit `.env` files to the repository.*

---
*Last updated: May 5, 2026*