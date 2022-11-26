from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from app.configs.Database import (
    get_db_connection
)

from app.models.FoodModel import FoodSmallLabel


class FoodRepository:
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        self.db = db

    def getSmallLabel(self, big_label: int) -> List[FoodSmallLabel]:
        query = self.db.query(FoodSmallLabel)

        query = query.filter_by(big_class_label=big_label)

        return query.group_by(FoodSmallLabel.label_hierarchy)
