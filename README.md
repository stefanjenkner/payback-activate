# README

Automatisiert die Aktivierung von [Payback eCoupons](https://www.payback.de) via Selenium und Docker.

[![Dependency Status](https://gemnasium.com/badges/github.com/sedden/payback-activate.svg)](https://gemnasium.com/github.com/sedden/payback-activate)

**Schritt 1:** Erstellen der `docker-compose.override.yml` mit folgendem Inhalt:

    payback_activate:
      environment:
        - PAYBACK_USERNAME=me@example.com
        - PAYBACK_PASSWORD=topsecret

**Schritt 2:** Docker Image bauen

    docker-compose build

**Schritt 3:** Ausführung

    docker-compose run payback_activate && docker-compose stop selenium

    Starting paybackactivate_selenium_1 ... done
    Coupons activated: 6
    Stopping paybackactivate_selenium_1 ... done