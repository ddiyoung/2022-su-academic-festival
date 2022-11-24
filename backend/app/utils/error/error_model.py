from pydantic import BaseModel


class ErrorInfoModel:
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message

    def __repr__(self):
        return f'code:{self.code},message:{self.message}'

    def normalize(self):
        return {
            'error_code': self.code,
            'error_message': self.message
        }


class ErrorInfoContainer:
    # General errors
    internal_server_error = ErrorInfoModel(code=500, message='Internal server error')
    could_not_get_excepted_response = ErrorInfoModel(code=400, message='Could not get expected response')
    unauthorized_response = ErrorInfoModel(code=401, message='Unauthorized')
    model_validation_error = ErrorInfoModel(code=3, message='Model validation error')
    not_found_error = ErrorInfoModel(code=404, message='Not found')
    forbidden_error = ErrorInfoModel(code=403, message="Forbidden")

    # Custom errors
    todo_not_found_error = ErrorInfoModel(code=101, message='Todo not found')


class ErrorResponseModel(BaseModel):
    status: int = None
    error_message: str = None
