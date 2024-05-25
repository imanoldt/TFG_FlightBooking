# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY update_routes.py /app/
COPY Data /app/Data

RUN pip install flask
RUN pip install flask-cors

CMD ["python", "update_routes.py"]
