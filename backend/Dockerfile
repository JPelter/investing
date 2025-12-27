FROM python:3.11

# NOW CREATE APP FOLDER, COPY CODE, INSTALL PYTHON DEPDENCIES, AND RUN THE APP
WORKDIR /app
COPY src .
RUN pip install --no-cache-dir -r requirements.txt
CMD [ "python", "server.py" ]