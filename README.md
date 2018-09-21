# README

Automatisiert das Aktivieren von [Payback eCoupons](https://www.payback.de) via Selenium und Docker.

[![Known Vulnerabilities](https://snyk.io/test/github/sedden/payback-activate/badge.svg?targetFile=requirements.txt)](https://snyk.io/test/github/sedden/payback-activate?targetFile=requirements.txt)

**Schritt 1:** Erstellen der `docker-compose.override.yml` mit folgendem Inhalt:

    payback_activate:
      environment:
        - PAYBACK_USERNAME=me@example.com
        - PAYBACK_PASSWORD=topsecret

**Schritt 2:** Docker Images bauen

    docker-compose build

**Schritt 3:** Ausführung payback_activate via headless Firefox

    docker-compose run payback_activate

    Account: me@example.com, Coupons activated: 6
