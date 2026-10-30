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

def test_add_user_to_event(client, auth_headers):
    response = client.post(f"events/1/rsvp", headers=auth_headers)
    assert response.status_code == 201
    assert response.json()["rsvps"]["id"] == 29
    assert response.json()["rsvps"]["attendee_id"] == 1
    assert response.json()["rsvps"]["event_id"] == 1

def test_add_user_to_event_missing_token(client):
    response = client.post(f"events/1/rsvp")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "NOT_AUTHENTICATED"
    assert response.json()["error"]["message"] == "User not authenticated!"

def test_add_user_to_event_doesnt_exist(client, auth_headers):
    response = client.post(f"events/100/rsvp", headers=auth_headers)
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
    assert response.json()["error"]["message"] == "Event not found"

def test_add_user_to_event_theyre_already_attending(client, auth_headers):
    response = client.post(f"events/2/rsvp", headers=auth_headers)
    assert response.status_code == 409
    assert response.json()["error"]["code"] == "CONFLICT"
    assert response.json()["error"]["message"] == "User has already RSVPed to this event"

def test_remove_user_from_event(client):
    response = client.delete(f"events/1/rsvp/me")
    assert response.status_code == 401

def test_remove_user_from_event_with_valid_token(client, auth_headers):
    response = client.delete(f"events/2/rsvp/me", headers=auth_headers)
    assert response.status_code == 204

def test_remove_user_from_event_their_not_rsvp(client, auth_headers):
    response = client.delete(f"events/4/rsvp/me", headers=auth_headers)
    assert response.status_code == 404




