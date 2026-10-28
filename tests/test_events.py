def test_get_events(client, auth_headers):
    response = client.get(f"/events", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json()["events"]) == 10

def test_get_event_with_valid_event_id_returns_200(client, auth_headers):
    response = client.get(f"events/2", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["events"]["id"] == 2
    
def test_get_event_with_invalid_event_id_returns_404(client, auth_headers):
    response = client.get(f"events/999999999", headers=auth_headers)
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
    assert response.json()["error"]["message"] == "Event not found"

def test_get_event_with_non_integer_input_returns_400(client, auth_headers):
    response = client.get(f"events/craig", headers=auth_headers)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "BAD_REQUEST"
    assert response.json()["error"]["message"] == "Event_ID is not Integer!"

