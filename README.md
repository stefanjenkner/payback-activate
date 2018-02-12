# README

Automatisiert die Aktivierung von [Payback eCoupons](https://www.payback.de) via Selenium und Docker.

[![Dependency Status](https://gemnasium.com/badges/github.com/sedden/payback-activate.svg)](https://gemnasium.com/github.com/sedden/payback-activate)

**Schritt 1:** Erstellen der `docker-compose.override.yml` mit folgendem Inhalt:

    payback_activate:
      environment:
        - PAYBACK_USERNAME=me@example.com
        - PAYBACK_PASSWORD=topsecret

    payback_activate_standalone:
      environment:
        - PAYBACK_USERNAME=me@example.com
        - PAYBACK_PASSWORD=topsecret

**Schritt 2:** Docker Images bauen

    docker-compose build

**Schritt 3a:** Ausführung payback_activate_standalone via headless Firefox

    docker-compose run payback_activate_standalone

    Coupons activated: 6

**Schritt 3b:** Ausführung via payback_activate via remote WebDriver (linked Container)

    docker-compose run payback_activate && docker-compose stop selenium

    Starting paybackactivate_selenium_1 ... done
    Coupons activated: 6
    Stopping paybackactivate_selenium_1 ... done
