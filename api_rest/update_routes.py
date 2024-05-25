from flask import Flask, request, jsonify
from flask_cors import CORS

import json
import os
import random

app = Flask(__name__)
CORS(app)

@app.route('/update-routes', methods=['POST'])
def update_routes():
    data = request.get_json()
    new_route = {
        "departure_cod": "BIO",
        "arrival_cod": data.get("arrival_cod"),
        "date_start": data.get("date_start"),
        "date_end": data.get("date_end"),
        "user_id": data.get("user_id")  # Añadir el user_id a la nueva ruta
    }
    
    routes_file_path = '/app/Data/rutas.json'

    try:
        with open(routes_file_path, 'r+') as f:
            routes = json.load(f)
            
            # Verificar si la nueva ruta ya existe
            if any(route['arrival_cod'] == new_route['arrival_cod'] and route['user_id'] == new_route['user_id'] for route in routes):
                return jsonify({"message": "Route already exists"}), 409
            
            routes.append(new_route)

            
            # Escribir las rutas actualizadas al archivo
            f.seek(0)
            json.dump(routes, f, indent=2)
            f.truncate()

        return jsonify({"message": "Routes updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-routes', methods=['GET'])
def get_routes():
    routes_file_path = '/app/Data/rutas.json'

    try:
        with open(routes_file_path, 'r') as f:
            routes = json.load(f)
        return jsonify(routes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/shuffle-routes', methods=['POST'])
def shuffle_routes():
    routes_file_path = '/app/Data/rutas.json'
    try:
        with open(routes_file_path, 'r+') as f:
            routes = json.load(f)
            random.shuffle(routes)
            f.seek(0)
            json.dump(routes, f, indent=2)
            f.truncate()
        return jsonify({"message": "Routes shuffled successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
