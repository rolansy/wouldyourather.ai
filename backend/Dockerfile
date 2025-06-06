FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP="app:create_app()"
ENV FLASK_ENV=production

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]