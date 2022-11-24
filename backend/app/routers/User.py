from fastapi import APIRouter, Depends, status
from app.schemas.pydantic.User import UserSchema
from app.services.UserService import UserService
from app.utils.error.error_response import ErrorResponseModel, ErrorResponse

UserRouter = APIRouter(
    prefix="/user", tags=['user']
)


@UserRouter.get("/{id}", response_model=UserSchema, responses={
    status.HTTP_500_INTERNAL_SERVER_ERROR: {
        "model": ErrorResponseModel,
    },
})
async def get(id: int, userService: UserService = Depends()):
    try:
        return userService.get(id).normalize()
    except:
        return ErrorResponse.internal_server_error
