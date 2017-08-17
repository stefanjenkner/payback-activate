#!/usr/bin/env python3

import os
import time

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

XPATH_JETZT_AKTIVIEREN = '//div[contains(@class, "clickable") and contains(@class, "not-activated") and contains(., "JETZT AKTIVIEREN")]'

def main():

    # credentials
    payback_username = os.environ.get('PAYBACK_USERNAME')
    payback_password = os.environ.get('PAYBACK_PASSWORD')

    # wait 5 seconds for selenium
    time.sleep(5)

    # init browser
    browser = get_browser()

    # login
    browser.get('https://www.payback.de/pb/authenticate/id/713416/#loginSecureTab')
    browser.find_element_by_xpath('//a[@id="loginSecureTabLink"]').click()
    browser.find_element_by_xpath('//input[@id="aliasInputSecure"]').send_keys(payback_username)
    browser.find_element_by_xpath('//input[@id="passwordInput"]').send_keys(payback_password)
    browser.find_element_by_xpath('//input[@id="loginSubmitButtonSecure"]').click()

    # open couponcenter
    WebDriverWait(browser, 10).until(lambda x: x.find_element_by_xpath('//a[@href="/pb/couponcenter/id/68726/"]')).click()

    # check for coupons
    try:
        WebDriverWait(browser, 10).until(lambda x: x.find_element_by_xpath(XPATH_JETZT_AKTIVIEREN))
    except TimeoutException:
        browser.close()
        return

    # activate coupons
    for element in browser.find_elements_by_xpath(XPATH_JETZT_AKTIVIEREN):
        try:
            element.click()
        except ElementNotInteractableException:
            continue

    # quit
    browser.close()


def get_browser():
    # use environment variables for connecting to linked services (deprecated)
    if os.environ.has_attr('SELENIUM_PORT_4444_TCP_ADDR') and os.environ.has_attr('SELENIUM_PORT_4444_TCP_PORT'):
        selenium_host = os.environ.get('SELENIUM_PORT_4444_TCP_ADDR')
        selenium_port = os.environ.get('SELENIUM_PORT_4444_TCP_PORT')
        return webdriver.Remote(command_executor='http://{}:{}/wd/hub'.format(selenium_host, selenium_port),
                                desired_capabilities=DesiredCapabilities.FIREFOX)
    # fallback
    return webdriver.Firefox()

if __name__ == '__main__':
    main()