from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from app.configs.Database import (
    get_db_connection
)

from app.models.FoodModel import Food


class FoodRepository:
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        self.db = db

    def getSmallLabel(self, food_class: str, big_label: int) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(big_class_label=big_label, food_class=food_class)

        return query.group_by(Food.label_hierarchy)

    def getBigLabel(self, food_class: str) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(food_class=food_class)

        return query.group_by(Food.big_class_label)
