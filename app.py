from flask import Flask, render_template, request, jsonify
from mariadb import connect
from mariadb import mariadb

app = Flask(__name__)

def get_db_connection():
    conn = connect(host="127.0.0.1", user="mysql", password="mysql", database="SalvaVisitas")
    return conn

@app.route('/Cdata', methods=['GET'])
def get_client_data():
    conn = get_db_connection()
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
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT VisitaSequencia, VisitaNome, VisitaEndereco, VisitaDescricao, VisitaPreco, VisitaData from visita;')
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

@app.route('/novocliente', methods=['GET'])
def novo_cliente_form():
    return render_template('novocliente.html')

@app.route('/novo_cliente', methods=['POST'])
def novo_cliente():
    cliente_nome = request.json.get('nome')
    endereco = request.json.get('endereco')
    descricao = request.json.get('descricao')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "INSERT INTO Cliente (ClienteNome, Endereco, ClienteDescricao) VALUES (?, ?, ?)"
    cursor.execute(query, (cliente_nome, endereco, descricao))
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({'status': 'Cliente adicionado com sucesso!'})
    
@app.route('/novavisita', methods=['GET'])
def nova_visita_form():
    return render_template('novavisita.html')

@app.route('/nova_visita', methods=['POST'])
def nova_visita():
    # Pegar dados do formulário
    data = request.json
    cliente_id = data.get('cliente_id')
    nome = data.get('nome')
    endereco = data.get('endereco')
    descricao = data.get('descricao')
    preco = data.get('preco')
    visita_data = data.get('data')

    # Conectar ao banco de dados e realizar o INSERT
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
            INSERT INTO Visita (VisitaCliente, VisitaNome, VisitaEndereco, VisitaDescricao, VisitaPreco, VisitaData)
            VALUES (?, ?, ?, ?, ?, ?)
        """
        cursor.execute(insert_query, (cliente_id, nome, endereco, descricao, preco, visita_data))
        conn.commit()

        return jsonify({"success": True})

    except mariadb.Error as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "error": str(e)})

    finally:
        cursor.close()
        conn.close()

@app.route('/clientes', methods=['GET'])
def clientes():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT ClienteID, ClienteNome, Endereco FROM Cliente")
        clientes = cursor.fetchall()
        return jsonify(clientes)
    except mariadb.Error as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()


@app.route('/update_visita', methods=['POST'])
def update_visita():
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """UPDATE Visita 
                   SET VisitaNome=?, VisitaEndereco=?, VisitaDescricao=?, VisitaPreco=?, VisitaData=? 
                   WHERE VisitaSequencia=?"""
        cursor.execute(query, (
            data['nome'], data['endereco'], data['descricao'], 
            data['preco'], data['data'], data['id']
        ))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'status': 'success'})
    except Exception as e:
        print(f"Erro ao atualizar visita: {e}")
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/delete_visita', methods=['POST'])
def delete_visita():
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "DELETE FROM Visita WHERE VisitaSequencia=?"
        cursor.execute(query, (data['id'],))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'status': 'success'})
    except Exception as e:
        print(f"Erro ao atualizar visita: {e}")
        return jsonify({'status': 'error', 'message': str(e)})


@app.route('/update_cliente', methods=['POST'])
def update_cliente():
    data = request.get_json()
    cliente_id = data.get('id')
    nome = data.get('nome')
    endereco = data.get('endereco')
    descricao = data.get('descricao')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE Cliente
            SET ClienteNome = %s, Endereco = %s, ClienteDescricao = %s
            WHERE ClienteID = %s
        """, (nome, endereco, descricao, cliente_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/delete_cliente', methods=['POST'])
def delete_cliente():
    data = request.get_json()
    cliente_id = data.get('id')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE Visita SET VisitaCliente = NULL WHERE VisitaCliente = %s", (cliente_id,))
        query = "DELETE FROM Cliente WHERE ClienteID = %s"
        cursor.execute(query, (cliente_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'})
    except Exception as e:
        print(f"Error deleting cliente: {e}")
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/estoquemenu')
def estoquemenu():
    return render_template('estoquemenu.html')

@app.route('/entradaestoque')
def entradaestoque():
    return render_template('entradaestoque.html')

@app.route('/saidaestoque')
def saidaestoque():
    return render_template('saidaestoque.html')

@app.route('/consultaestoque')
def consultaestoque():
    return render_template('consultaestoque.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')