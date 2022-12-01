from sqlalchemy import (
    Column,
    Boolean,
    PrimaryKeyConstraint,
    String,
    Integer
)

from app.models.BaseModel import EntityMeta


class Food(EntityMeta):
    __tablename__ = "food"

    id = Column(Integer, nullable=False)
    big_class_label = Column(Integer, nullable=True)
    label_hierarchy = Column(Integer, nullable=True)
    food_class = Column(String(10), nullable=True)
    is_spicy = Column(Boolean, nullable=False)
    is_soup = Column(Boolean, nullable=False)
    name = Column(String(20), nullable=False)
    represent_name = Column(String(20), nullable=True)
    big_class_name = Column(String(20), nullable=True)
    middle_class_name = Column(String(20), nullable=True)

    PrimaryKeyConstraint(id)

    def big_class_label_normalize(self):
        return {
            'big_class_label': self.big_class_label.__str__()
        }

    def label_hierarchy_normalize(self):
        return {
            'label_hierarchy': self.label_hierarchy.__int__()
        }

    def is_spicy_normalize(self):
        return {
            'is_spicy': self.is_spicy.__str__()
        }

    def is_soup_normalize(self):
        return {
            'is_soup': self.is_soup.__str__()
        }

    def menu_normalize(self):
        return {
            'name': self.name.__str__(),
            'represent_name': self.represent_name.__str__(),
            'big_class_name': self.big_class_name.__str__()
        }



