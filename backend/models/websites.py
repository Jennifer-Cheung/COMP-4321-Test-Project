from pydantic import BaseModel, Field
from typing import Optional
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator
PyObjectId = Annotated[str, BeforeValidator(str)]

class Website(BaseModel):
    id: Optional[PyObjectId] | None = Field(default=None)
    title: str
    url: str
    content: str
