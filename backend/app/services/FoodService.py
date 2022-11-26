from typing import List
from fastapi import Depends

from app.models.FoodModel import Food
from app.repositories.FoodRepository import FoodRepository


class FoodService:
    FoodRepository: FoodRepository

    def __init__(self, foodRepository: FoodRepository = Depends()) -> None:
        self.foodRepository = foodRepository

    def getBigLabel(self, food_class: str) -> List[Food]:
        return self.foodRepository.getBigLabel(
            food_class
        )

    def getSmallLabel(self, food_class: str, big_label: int) -> List[Food]:
        return self.foodRepository.getSmallLabel(
            food_class=food_class,
            big_label=big_label
        )

    def getIsSpicy(self, food_class: str, big_label: int, small_label: int) -> List[Food]:
        return self.foodRepository.getIsSpicy(
            food_class=food_class,
            big_label=big_label,
            small_label=small_label
        )

    def getIsSoup(self,
                  food_class: str,
                  big_label: int,
                  small_label: int,
                  is_spicy: bool) -> List[Food]:
        return self.foodRepository.getIsSoup(
            food_class=food_class,
            big_label=big_label,
            small_label=small_label,
            is_spicy=is_spicy
        )
