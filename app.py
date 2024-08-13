
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

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

@app.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.json
    try:
        query = "INSERT INTO Customer (name, email, phone) VALUES (%s, %s, %s)"
        cursor.execute(query, (data['name'], data['email'], data['phone']))
        db.commit()
        return jsonify({"message": "Customer created", "customerID": cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to create customer"}), 500

@app.route('/api/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.json
    try:
        query = "UPDATE Customer SET name = %s, email = %s, phone = %s WHERE customerID = %s"
        cursor.execute(query, (data['name'], data['email'], data['phone'], id))
        db.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Customer updated"})
        else:
            return jsonify({"error": "Customer not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to update customer"}), 500

@app.route('/api/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        cursor.execute("DELETE FROM Customer WHERE customerID = %s", (id,))
        db.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Customer deleted"})
        else:
            return jsonify({"error": "Customer not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to delete customer"}), 500


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

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    try:
        query = "INSERT INTO Product (name, price, description) VALUES (%s, %s, %s)"
        cursor.execute(query, (data['name'], data['price'], data['description']))
        db.commit()
        return jsonify({"message": "Product created", "productID": cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to create product"}), 500

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    try:
        query = "UPDATE Product SET name = %s, price = %s, description = %s WHERE productID = %s"
        cursor.execute(query, (data['name'], data['price'], data['description'], id))
        db.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Product updated"})
        else:
            return jsonify({"error": "Product not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to update product"}), 500

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        cursor.execute("DELETE FROM Product WHERE productID = %s", (id,))
        db.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Product deleted"})
        else:
            return jsonify({"error": "Product not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to delete product"}), 500


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

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    try:
        query = "INSERT INTO OrderTable (customerID, orderDate) VALUES (%s, %s)"
        cursor.execute(query, (data['customerID'], data['orderDate']))
        db.commit()
        return jsonify({"message": "Order created", "orderID": cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to create order"}), 500

@app.route('/api/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    try:
        cursor.execute("DELETE FROM OrderTable WHERE orderID = %s", (id,))
        db.commit()
        if cursor.rowcount > 0:
            return jsonify({"message": "Order deleted"})
        else:
            return jsonify({"error": "Order not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Failed to delete order"}), 500

if __name__ == '__main__':
    app.run(debug=True)
