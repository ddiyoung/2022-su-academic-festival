from typing import List
from fastapi import Depends

from app.models.FoodModel import FoodSmallLabel
from app.repositories.FoodRepository import FoodRepository


class FoodService:
    FoodRepository: FoodRepository

    def __init__(self, foodRepository: FoodRepository = Depends()) -> None:
        self.foodRepository = foodRepository

    def getSmallLabel(self, big_label: int) -> List[FoodSmallLabel]:
        return self.foodRepository.getSmallLabel(
            big_label
        )
