FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP="app:create_app()"
ENV FLASK_ENV=production

CMD ["gunicorn", "--config", "gunicorn_config.py", "wsgi:app"]