def test_login_with_correct_credentials(client):
    response = client.post("/auth/login", json={"email":"alice@example.com", "password":"password123"})
    assert response.status_code == 200

def test_login_with_incorrect_credentials(client):
    response = client.post("/auth/login", json={"email":"craig@example.com", "password":"123password"})
    assert response.status_code == 401

def test_login_with_missing_credential(client):
    response = client.post("/auth/login", json={"email":"craig@example.com", "password":""})
    assert response.status_code == 400

def test_register_with_valid_credentials(client):
    response = client.post("/auth/register", json={"name":"craig", "email":"craig@example.com", "password":"password123"})
    assert response.status_code == 201

def test_register_with_missing_credential(client):
    response = client.post("/auth/register", json={"name":"morgan", "email":"", "password":"password123"})
    assert response.status_code == 400

def test_register_with_existing_email(client):
    response = client.post("/auth/register", json={"name":"craig", "email":"craig@example.com", "password":"password123"})
    assert response.status_code == 409

