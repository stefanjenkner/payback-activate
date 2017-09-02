# README

Automatisiert die Aktivierung von [Payback eCoupons](https://www.payback.de) via Selenium und Docker.

[![Dependency Status](https://gemnasium.com/badges/github.com/sedden/payback-activate.svg)](https://gemnasium.com/github.com/sedden/payback-activate)

**Schritt 1:** Erstellen der `docker-compose.yml` mit folgendem Inhalt:

    selenium:
      image: selenium/standalone-firefox:3.4.0
    payback_activate:
      build: .
      links:
        - selenium:selenium
      environment:
        - PAYBACK_USERNAME=me@example.com
        - PAYBACK_PASSWORD=topsecret

**Schritt 2:** Docker Image bauen

    docker-compose build

**Schritt 3:** Ausführung

    docker-compose run payback_activate && docker-compose stop selenium
