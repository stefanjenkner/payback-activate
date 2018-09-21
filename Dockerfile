FROM selenium/standalone-firefox:3.8.1

RUN sudo apt-get update
RUN sudo apt-get -qqy install python-virtualenv
USER seluser

WORKDIR /home/seluser
RUN virtualenv -p python3.5 venv
COPY requirements.txt ./
RUN venv/bin/pip install --no-cache-dir -r requirements.txt

ADD run.py run.py

CMD [ "venv/bin/python3.5", "./run.py" ]
