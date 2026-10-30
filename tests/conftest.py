import pytest
from fastapi.testclient import TestClient
from main import app
from src.auth import create_access_token
from routes.auth_route import login, LoginRequest

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def auth_headers():

    token = create_access_token(1)

    return {"Authorization": f"Bearer {token}"}