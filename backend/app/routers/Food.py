from typing import List

from fastapi import APIRouter, Depends, status
from app.schemas.pydantic.Food import FoodSchema, FoodLabelHierarchySchema, FoodBigClassSchema, FoodIsSpicySchema, FoodIsSoupSchema
from app.services.FoodService import FoodService
from app.utils.error.error_response import ErrorResponseModel, ErrorResponse

FoodRouter = APIRouter(
    prefix="/food", tags=['food']
)


@FoodRouter.post("/food_class", response_model=List[FoodBigClassSchema], responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorResponseModel,

    }
})
async def getBigClass(food_class: str, foodService: FoodService = Depends()):
    try:
        result = [
            foodBigLabel.big_class_label_normalize()
            for foodBigLabel in foodService.getBigLabel(food_class)
        ]
        if not result:
            return ErrorResponse.not_found_error

        return result

    except:
        return ErrorResponse.internal_server_error


@FoodRouter.post("/big_label", response_model=List[FoodLabelHierarchySchema], responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorResponseModel,
    }
})
async def getSmallLabel(food_class: str, big_label: int, foodService: FoodService = Depends()):
    try:
        result = [
            foodSmallLabel.label_hierarchy_normalize()
            for foodSmallLabel in foodService.getSmallLabel(
                food_class=food_class,
                big_label=big_label
            )
        ]
        if not result:
            return ErrorResponse.not_found_error

        return result

    except:
        return ErrorResponse.internal_server_error


@FoodRouter.post("/small_label", response_model=List[FoodIsSpicySchema], responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorResponseModel,
    }
})
async def getIsSpicy(
        food_class: str,
        big_label: int,
        small_label: int,
        foodService: FoodService = Depends()
):
    try:
        result = [
            isSpicy.is_spicy_normalize()
            for isSpicy in foodService.getIsSpicy(
                food_class=food_class,
                big_label=big_label,
                small_label=small_label
            )
        ]
        if not result:
            return ErrorResponse.not_found_error

        return result

    except:
        return ErrorResponse.internal_server_error


@FoodRouter.post("/is_spicy", response_model=List[FoodIsSoupSchema], responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorResponseModel,
    }
})
async def getIsSoup(
        food_class: str,
        big_label: int,
        small_label: int,
        is_spicy: bool,
        foodService: FoodService = Depends()
):
    try:
        result = [
            isSpicy.is_soup_normalize()
            for isSpicy in foodService.getIsSoup(
                food_class=food_class,
                big_label=big_label,
                small_label=small_label,
                is_spicy=is_spicy
            )
        ]
        if not result:
            return ErrorResponse.not_found_error

        return result

    except:
        return ErrorResponse.internal_server_error
