from sqlalchemy import (
    Column,
    Integer,
    PrimaryKeyConstraint,
    String,
)


from app.models.BaseModel import EntityMeta


class User(EntityMeta):
    __tablename__ = "user"

    u_id = Column(Integer, nullable=False)
    u_name = Column(String(45), nullable=False)
    u_department = Column(String(45), nullable=False)
    u_auth = Column(Integer, nullable=False)

    PrimaryKeyConstraint(u_id)

    def normalize(self):
        return{
            'user_id': self.u_id.__str__(),
            'user_name': self.u_name.__str__(),
            'user_department': self.u_department.__str__(),
            'user_auth': self.u_auth.__str__(),
        }
