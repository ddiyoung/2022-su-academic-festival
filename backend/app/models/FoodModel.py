from sqlalchemy import (
    Column,
    Boolean,
    PrimaryKeyConstraint,
    String,
    Integer
)

from app.models.BaseModel import EntityMeta


class FoodSmallLabel(EntityMeta):
    __tablename__ = "food"

    id = Column(Integer, nullable=False)
    big_class_label = Column(Integer, nullable=True)
    label_hierarchy = Column(Integer, nullable=True)

    PrimaryKeyConstraint(id)

    def normalize(self):
        return{
            'label_hierarchy': self.label_hierarchy.__int__()
        }



