import click, random
from api.models import db, User, Invoice

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are useful to run cronjobs or tasks outside of the API but still in integration 
with your database, for example: Import the price of bitcoin every night at 12am
"""

def setup_commands(app):
    user_list = [
        {
            'email': 'sammysmith123@gmail.com',
            'password': 'abc123'
        },
        {
            'email': 'mustangsally456@aol.com',
            'password': 'abc123'
        },
        {
            'email': 'johndoe987@gmail.com',
            'password': 'abc123'
        },
    ]

    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 
    """
    @app.cli.command("insert-test-users")
    def insert_test_users():
        print("Creating test users")
        for user_data in user_list:
            user = User()
            user.email = user_data['email']
            user.set_password(user_data['password'])
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print(f'User {user.email} created.')
        print("All test users created")

    @app.cli.command('create-invoices')
    def insert_test_invoices():
        print('Creating test invoices in database...')
        invoices_list = [
            {
                'date': '2025-06-11',
                'number': 'abc345',
                'amount': 32.46,
            },
            {
                'date': '2024-03-11',
                'number': 'a1b2c5',
                'amount': 102.50,
            },
            {
                'date': '2024-09-21',
                'number': 'p3jh4p5',
                'amount': 65.45,
            },
            {
                'date': '2022-10-30',
                'number': 'd34jd',
                'amount': 71.28,
            },
            {
                'date': '2022-01-04',
                'number': '0965y09',
                'amount': 82.51,
            },
            {
                'date': '2021-08-09',
                'number': 'f43598ufv',
                'amount': 99.45,
            },
            {
                'date': '2025-03-13',
                'number': 'd489ej',
                'amount': 131.54,
            },
            {
                'date': '2025-04-02',
                'number': 'f34059fj',
                'amount': 128.42,
            },
            {
                'date': '2024-06-30',
                'number': '45f0ov',
                'amount': 115.31,
            },
            {
                'date': '2022-02-27',
                'number': 'rfv00l',
                'amount': 15.24,
            },
        ]
        
        for invoice_data in invoices_list:
            new_invoice = Invoice()
            new_invoice.invoice_date = invoice_data['date']
            new_invoice.invoice_number = invoice_data['number']
            new_invoice.invoice_amount = invoice_data['amount']
           
            random_user_position = random.randint(0, len(user_list) - 1)
            user = User.query.filter_by(email=user_list[random_user_position]['email']).first()
            
            if user is None:
                print(f"Warning: User not found for email {user_list[random_user_position]['email']}")
                continue
                
            print(user)
            new_invoice.user_id = user.id
            db.session.add(new_invoice)
            db.session.commit()
            print(f'Invoice {new_invoice.invoice_number} created for user {user.email}.')
        
        print('All invoices created.')

    @app.cli.command("insert-test-data")
    def insert_test_data():
        """Insert all test data (users and invoices)"""
        print("Inserting all test data...")
        insert_test_users()
        insert_test_invoices()
        print("All test data inserted successfully!")