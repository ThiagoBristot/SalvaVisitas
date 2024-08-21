from flask import Flask, render_template, request, jsonify
from mariadb import connect

app = Flask(__name__)

@app.route('/Cdata', methods=['GET'])
def get_client_data():
    conn = connect(host="127.0.0.1", user="mysql", password="mysql", database="SalvaVisitas")
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM cliente;')
        data = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
    return jsonify(data)

@app.route('/Vdata', methods=['GET'])
def get_visit_data():
    conn = connect(host="127.0.0.1", user="mysql", password="mysql", database="SalvaVisitas")
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM visita;')
        data = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
    return jsonify(data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consultaclientes')
def consulta_clientes():
    return render_template('consultaclientes.html')

@app.route('/consultavisitas')
def consulta_visitas():
    return render_template('consultavisitas.html')

@app.route('/novocliente')
def add_cliente():
    return render_template('novocliente.html')

@app.route('/novavisita')
def add_visita():
    return render_template('novavisita.html')

if __name__ == '__main__':
    app.run(debug=True)