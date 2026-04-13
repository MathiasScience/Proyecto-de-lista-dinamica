from flask import Flask, render_template, request, jsonify, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'super_secret_key'

def get_db():
    conn = sqlite3.connect('todo_app.db')
    conn.row_factory = sqlite3.Row
    return conn

# Crear tablas al iniciar
with get_db() as db:
    db.execute('''CREATE TABLE IF NOT EXISTS users 
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT UNIQUE, pw TEXT)''')
    db.execute('''CREATE TABLE IF NOT EXISTS tasks 
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, content TEXT, status INTEGER)''')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET', 'POST'])
def manage_tasks():
    user_id = session.get('user_id', 1) # Por ahora usamos un ID por defecto para pruebas
    db = get_db()
    
    if request.method == 'POST':
        data = request.json
        db.execute('INSERT INTO tasks (user_id, content, status) VALUES (?, ?, ?)',
                   (user_id, data['content'], 0))
        db.commit()
        return jsonify({"status": "ok"})
    
    tasks = db.execute('SELECT * FROM tasks WHERE user_id = ?', (user_id,)).fetchall()
    return jsonify([dict(t) for t in tasks])

if __name__ == '__main__':
    app.run(debug=True)
###32-bits-or-64###
