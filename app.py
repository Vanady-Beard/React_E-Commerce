# from flask import Flask, jsonify
# from flask_cors import CORS
# import mysql.connector

# app = Flask(__name__)
# CORS(app)  # Ensure CORS is enabled

# # Database connection
# try:
#     db = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="newyork12",
#         database="ec_commerce_db"
#     )
#     cursor = db.cursor(dictionary=True)
#     print("Connected to the database successfully")
# except mysql.connector.Error as err:
#     print(f"Error: {err}")
#     exit(1)

# @app.route('/api/customers', methods=['GET'])
# def get_customers():
#     try:
#         cursor.execute("SELECT * FROM Customer")
#         customers = cursor.fetchall()
#         if customers:
#             return jsonify(customers)
#         else:
#             return jsonify({"message": "No customers found"}), 404
#     except mysql.connector.Error as err:
#         print(f"Error: {err}")
#         return jsonify({"error": "Failed to fetch customers"}), 500

# @app.route('/api/products', methods=['GET'])
# def get_products():
#     try:
#         cursor.execute("SELECT * FROM Product")
#         products = cursor.fetchall()
#         if products:
#             return jsonify(products)
#         else:
#             return jsonify({"message": "No products found"}), 404
#     except mysql.connector.Error as err:
#         print(f"Error: {err}")
#         return jsonify({"error": "Failed to fetch products"}), 500

# @app.route('/api/orders', methods=['GET'])
# def get_orders():
#     try:
#         query = """
#         SELECT o.orderID, o.orderDate, c.name as customerName
#         FROM OrderTable o
#         JOIN Customer c ON o.customerID = c.customerID
#         """
#         cursor.execute(query)
#         orders = cursor.fetchall()
#         if orders:
#             return jsonify(orders)
#         else:
#             return jsonify({"message": "No orders found"}), 404
#     except mysql.connector.Error as err:
#         print(f"Error: {err}")
#         return jsonify({"error": "Failed to fetch orders"}), 500

# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="newyork12",
        database="ec_commerce_db"
    )
    cursor = db.cursor(dictionary=True)
    print("Connected to the database successfully")
except mysql.connector.Error as err:
    print(f"Error: {err}")
    exit(1)

@app.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        cursor.execute("SELECT * FROM Customer")
        customers = cursor.fetchall()
        if customers:
            return jsonify(customers)
        else:
            return jsonify({"message": "No customers found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to fetch customers"}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        cursor.execute("SELECT * FROM Product")
        products = cursor.fetchall()
        if products:
            return jsonify(products)
        else:
            return jsonify({"message": "No products found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to fetch products"}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        query = """
        SELECT o.orderID, o.orderDate, c.name as customerName
        FROM OrderTable o
        JOIN Customer c ON o.customerID = c.customerID
        """
        cursor.execute(query)
        orders = cursor.fetchall()
        if orders:
            return jsonify(orders)
        else:
            return jsonify({"message": "No orders found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to fetch orders"}), 500

if __name__ == '__main__':
    app.run(debug=True)
