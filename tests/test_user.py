def test_users_rsvps_without_token(client):
    response = client.get("user/me/events")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "NOT_AUTHENTICATED"
    assert response.json()["error"]["message"] == "User not authenticated!"

def test_users_rsvps(client, auth_headers):
    response = client.get("user/me/events", headers=auth_headers)
    assert response.status_code == 200