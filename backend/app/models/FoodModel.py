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
    food_class = Column(String(20), nullable=True)

    PrimaryKeyConstraint(id)

    def label_hierarchy_normalize(self):
        return {
            'label_hierarchy': self.label_hierarchy.__int__()
        }

    def big_class_label_normalize(self):
        return {
            'big_class_label': self.big_class_label.__str__()
        }



