from typing import List
from fastapi import Depends

from app.models.FoodModel import Food
from app.repositories.FoodRepository import FoodRepository


class FoodService:
    FoodRepository: FoodRepository

    def __init__(self, foodRepository: FoodRepository = Depends()) -> None:
        self.foodRepository = foodRepository

    def getSmallLabel(self, food_class: str, big_label: int) -> List[Food]:
        return self.foodRepository.getSmallLabel(
            food_class=food_class,
            big_label=big_label
        )

    def getBigLabel(self, food_class: str) -> List[Food]:
        return self.foodRepository.getBigLabel(
            food_class
        )
