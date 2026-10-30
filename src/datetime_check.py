from datetime import datetime
from fastapi import HTTPException

def check_valid_datetime_format(date: str):
    try:
        datetime.fromisoformat(date)
    except ValueError:
        raise HTTPException (
            status_code=400,
            detail={"code": "BAD_REQUEST", "message": "Datetime doesn't match correct format!"},
        )