#!/usr/bin/env python3

import os
import sys

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException

XPATH_JETZT_AKTIVIEREN = '//div[contains(@class, "clickable") and contains(@class, "not-activated") and contains(., "JETZT AKTIVIEREN")]'

def main(payback_username, payback_password):

    # init browser
    browser = get_browser()

    # login
    browser.get('https://www.payback.de/login')
    WebDriverWait(browser, 10).until(lambda x: x.find_element_by_id('aliasInputSecure').is_displayed())
    browser.find_element_by_xpath('//input[@id="aliasInputSecure"]').send_keys(payback_username)
    browser.find_element_by_xpath('//input[@id="passwordInput"]').send_keys(payback_password)
    browser.find_element_by_xpath('//button[@id="loginSubmitButtonSecure"]').click()

    # open coupon center
    WebDriverWait(browser, 20).until(lambda x: x.find_element_by_xpath('//a[@href="/pb/couponcenter/id/68726/"]')).click()

    # check for coupons
    counter = 0
    try:
        while True:
            WebDriverWait(browser, 10).until(lambda x: x.find_element_by_xpath(XPATH_JETZT_AKTIVIEREN))
            element = browser.find_element_by_xpath(XPATH_JETZT_AKTIVIEREN)
            try:
                element.click()
                counter = counter + 1
                # close popup?
                try:
                    WebDriverWait(browser, 2).until(lambda x: x.find_element_by_xpath('//*[@id="close_button"]').is_displayed())
                    browser.find_element_by_xpath('//*[@id="close_button"]').click()
                    print('Closed popup', file=sys.stderr)
                except:
                    continue
            except:
                break

    except TimeoutException:
        # no coupons found
        return

    finally:
        print('Account: {}, Coupons activated: {}'.format(payback_username, counter), file=sys.stderr)
        browser.close()


def get_browser():
    firefox_options = webdriver.firefox.options.Options()
    firefox_options.add_argument('--headless')
    return webdriver.Firefox(firefox_options=firefox_options)


if __name__ == '__main__':
    payback_username = os.environ.get('PAYBACK_USERNAME', None)
    payback_password = os.environ.get('PAYBACK_PASSWORD', None)
    if payback_username and payback_password:
        main(payback_username, payback_password)