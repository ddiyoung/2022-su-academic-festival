from pydantic import BaseModel


class UserPostRequestSchema(BaseModel):
    user_id: int


class UserSchema(UserPostRequestSchema):
    user_name: str
    user_department: str
    user_auth: int
