from typing import List

from fastapi import APIRouter, Depends, status
from app.schemas.pydantic.Food import FoodSchema, FoodLabelHierarchySchema
from app.services.FoodService import FoodService
from app.utils.error.error_response import ErrorResponseModel, ErrorResponse

FoodRouter = APIRouter(
    prefix="/food", tags=['food']
)


@FoodRouter.get("/big_label/{big_label}", response_model=List[FoodLabelHierarchySchema], responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
    status.HTTP_404_NOT_FOUND: {
        "model": ErrorResponseModel,
    }
})
async def get(big_label: int, foodService: FoodService = Depends()):
    try:
        result = [
            foodSmallLabel.normalize()
            for foodSmallLabel in foodService.getSmallLabel(big_label)
        ]
        if not result:
            return ErrorResponse.not_found_error

        return result

    except:
        return ErrorResponse.internal_server_error
