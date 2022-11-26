from pydantic import BaseModel


class FoodLabelHierarchySchema(BaseModel):
    label_hierarchy: int


class FoodBigClassSchema(FoodLabelHierarchySchema):
    id: int
    big_class_label: int


class FoodFoodClassSchema(FoodBigClassSchema):
    food_class: str


class FoodIsSoupSchema(FoodFoodClassSchema):
    is_soup: bool


class FoodIsSpicySchema(FoodIsSoupSchema):
    is_spicy: bool


class FoodSchema(FoodIsSpicySchema):
    name: str
    represent_name: str
    big_class_name: str
    middle_class_name: str
