from typing import List, Optional
from fastapi import Depends
from sqlalchemy.orm import Session
from app.configs.Database import (
    get_db_connection
)
from app.configs.Redis import My_Redis
from app.utils.keyword import keywordrank
from app.models.FoodModel import Food


class FoodRepository:
    db: Session

    def __init__(self, db: Session = Depends(get_db_connection)) -> None:
        self.db = db

    def getBigLabel(self, food_class: str) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(food_class=food_class)

        return query.group_by(Food.big_class_label)

    def getSmallLabel(self, food_class: str, big_label: int) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(big_class_label=big_label, food_class=food_class)

        return query.group_by(Food.label_hierarchy)

    def getIsSpicy(self, food_class: str, big_label: int, small_label: int) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(food_class=food_class, big_class_label=big_label, label_hierarchy=small_label)

        return query.group_by(Food.is_spicy)

    def getIsSoup(self,
                  food_class: str,
                  big_label: int,
                  small_label: int,
                  is_spicy: bool) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(food_class=food_class,
                                big_class_label=big_label,
                                label_hierarchy=small_label,
                                is_spicy=is_spicy)

        return query.group_by(Food.is_soup)

    def getMenu(self,
                food_class: str,
                big_label: int,
                small_label: int,
                is_spicy: bool,
                is_soup: bool) -> List[Food]:
        query = self.db.query(Food)

        query = query.filter_by(food_class=food_class,
                                big_class_label=big_label,
                                label_hierarchy=small_label,
                                is_spicy=is_spicy,
                                is_soup=is_soup)

        return query

    def getKeyword(self,
                   keyword: str):

        list_keyword = keywordrank(keyword)

        result = []

        for key in list_keyword:
            result.append(My_Redis.get(key))

        result = set(result)

        result.remove(None)

        result = list(result)

        query = self.db.query(Food)

        query = query.filter(Food.label_hierarchy.in_(result))

        return query

