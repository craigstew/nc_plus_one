def test_get_events(client):
    response = client.get(f"/events")
    assert response.status_code == 200
    assert len(response.json()["events"]) == 10