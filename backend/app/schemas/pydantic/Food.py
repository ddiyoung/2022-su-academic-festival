from pydantic import BaseModel


class FoodLabelHierarchySchema(BaseModel):
    label_hierarchy: int


class FoodBigClassSchema(BaseModel):
    big_class_label: int


class FoodFoodClassSchema(BaseModel):
    food_class: str


class FoodIsSoupSchema(BaseModel):
    is_soup: bool


class FoodIsSpicySchema(BaseModel):
    is_spicy: bool


class FoodSchema(BaseModel):
    name: str
