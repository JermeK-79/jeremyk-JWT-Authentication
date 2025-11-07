from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    invoice_list: Mapped[list["Invoice"]] = relationship(back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }

    def set_password(self, password):
        """Hash and set the user's password"""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the hashed password"""
        return check_password_hash(self.password, password)


class Invoice(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    invoice_date: Mapped[str] = mapped_column(String(60), nullable=False)
    invoice_number: Mapped[str] = mapped_column(String(60), nullable=False)
    invoice_amount: Mapped[float] = mapped_column(Float(), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates='invoice_list')

    def __repr__(self):
        return f'<Invoice {self.invoice_number}>'

    def serialize(self):
        return {
            "id": self.id,
            "invoice_date": self.invoice_date,
            "invoice_number": self.invoice_number,
            "invoice_amount": self.invoice_amount,
        }