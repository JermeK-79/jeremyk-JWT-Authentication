"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Invoice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
CORS(api)


@api.route('/token', methods=['POST'])
def generate_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    email = email.lower()
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    if not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    response = {
        'access_token': access_token,
        'user_id': user.id,
        'message': f'Welcome {user.email}!'
    }
    return jsonify(response), 200


@api.route('/signup', methods=['POST'])
def new_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    
    email = email.lower()
    user = User.query.filter_by(email=email).first()
    
    if user is not None:
        response = {
            "msg": f'{email} already exists. Please login.'
        }
        return jsonify(response), 403
    
    new_user = User()
    new_user.email = email
    new_user.set_password(password)
    new_user.is_active = True
    
    db.session.add(new_user)
    db.session.commit()
    
    access_token = create_access_token(identity=new_user.id)
    
    response = {
        "msg": f'{new_user.email} was successfully added!',
        "access_token": access_token,
        "user_id": new_user.id
    }
    return jsonify(response), 201

@api.route('/invoices', methods=['GET'])
@jwt_required()
def get_invoices():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    user_invoices = Invoice.query.filter_by(user_id=user_id).all()
    processed_invoices = [each_invoice.serialize() for each_invoice in user_invoices]
    
    if len(processed_invoices) == 0:
        response = {
            "message": f'{user.email}, you have no invoices.',
            "invoices": processed_invoices
        }  
        return jsonify(response), 200
    
    response = {
        "message": f'Here are your invoices, {user.email}!',
        "invoices": processed_invoices,
    }
    return jsonify(response), 200
