from app.utils.error.error_model import ErrorInfoContainer, ErrorResponseModel
from fastapi.responses import JSONResponse


class ErrorResponse:
    internal_server_error = JSONResponse(status_code=ErrorInfoContainer.internal_server_error.code, content=ErrorInfoContainer.internal_server_error.normalize())
    could_not_get_excepted_response = JSONResponse(status_code=ErrorInfoContainer.could_not_get_excepted_response.code, content=ErrorInfoContainer.could_not_get_excepted_response.normalize())
    unauthorized_response = JSONResponse(status_code=ErrorInfoContainer.unauthorized_response.code, content=ErrorInfoContainer.unauthorized_response.normalize())
    model_validation_error = JSONResponse(status_code=ErrorInfoContainer.model_validation_error.code, content=ErrorInfoContainer.model_validation_error.normalize())
    not_found_error = JSONResponse(status_code=ErrorInfoContainer.not_found_error.code, content=ErrorInfoContainer.not_found_error.normalize())
    forbidden_error = JSONResponse(status_code=ErrorInfoContainer.forbidden_error.code, content=ErrorInfoContainer.forbidden_error.normalize())
