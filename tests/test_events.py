def test_get_events(client, auth_headers):
    response = client.get("events", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json()["events"]) == 10

def test_get_event_with_valid_event_id_returns_200(client, auth_headers):
    response = client.get("events/2", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["events"]["id"] == 2
    
def test_get_event_with_invalid_event_id_returns_404(client, auth_headers):
    response = client.get("events/999999999", headers=auth_headers)
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
    assert response.json()["error"]["message"] == "Event not found"

def test_get_event_with_non_integer_input_returns_400(client, auth_headers):
    response = client.get("events/craig", headers=auth_headers)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "BAD_REQUEST"
    assert response.json()["error"]["message"] == "Event_ID is not Integer!"

def test_add_user_to_event(client, auth_headers):
    response = client.post("events/1/rsvp", headers=auth_headers)
    assert response.status_code == 201
    assert response.json()["rsvps"]["id"] == 29
    assert response.json()["rsvps"]["attendee_id"] == 1
    assert response.json()["rsvps"]["event_id"] == 1

def test_add_user_to_event_missing_token(client):
    response = client.post("events/1/rsvp")
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "NOT_AUTHENTICATED"
    assert response.json()["error"]["message"] == "User not authenticated!"

def test_add_user_to_event_doesnt_exist(client, auth_headers):
    response = client.post("events/100/rsvp", headers=auth_headers)
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
    assert response.json()["error"]["message"] == "Event not found"

def test_add_user_to_event_theyre_already_attending(client, auth_headers):
    response = client.post("events/2/rsvp", headers=auth_headers)
    assert response.status_code == 409
    assert response.json()["error"]["code"] == "CONFLICT"
    assert response.json()["error"]["message"] == "User has already RSVPed to this event"

def test_remove_user_from_event(client):
    response = client.delete("events/1/rsvp/me")
    assert response.status_code == 401

def test_remove_user_from_event_with_valid_token(client, auth_headers):
    response = client.delete("events/2/rsvp/me", headers=auth_headers)
    assert response.status_code == 204

def test_remove_user_from_event_their_not_rsvp(client, auth_headers):
    response = client.delete("events/4/rsvp/me", headers=auth_headers)
    assert response.status_code == 404

def test_user_creates_event(client, auth_headers):
    new_event = {
        "title": "Summer Rooftop Social",
        "description": "An evening of networking and good vibes.",
        "starts_at": "2025-08-15T18:00:00Z",
        "ends_at": "2025-08-15T21:00:00Z",
        "venue_id": 2
    }

    response = client.post("events", headers=auth_headers, json=new_event)
    assert response.status_code == 201

def test_user_creates_event_without_token(client):
    new_event = {
        "title": "Northcoders Bootcamp",
        "description": "An event for coders!",
        "starts_at": "2025-09-15T18:00:00Z",
        "ends_at": "2025-09-15T21:00:00Z",
        "venue_id": 3
    }

    response = client.post("events", json=new_event)
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "NOT_AUTHENTICATED"
    assert response.json()["error"]["message"] == "User not authenticated!"

def test_user_creates_event_with_missing_fields(client, auth_headers):
    new_event = {
        "title": "Northcoders Bootcamp",
        "description": "",
        "starts_at": "2025-09-15T18:00:00Z",
        "ends_at": "2025-09-15T21:00:00Z",
        "venue_id": 3
    }

    response = client.post("events", headers=auth_headers, json=new_event)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "BAD_REQUEST"
    assert response.json()["error"]["message"] == "Either 'title, 'description', 'starts_at', 'ends_at' or 'venue_id' is missing!"

def test_user_creates_event_with_invalid_datetime_format(client, auth_headers):
    new_event = {
        "title": "Northcoders Bootcamp",
        "description": "An event for coders!",
        "starts_at": "01-01-2026",
        "ends_at": "02-01-2026",
        "venue_id": 3
    }

    response = client.post("events", headers=auth_headers, json=new_event)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "BAD_REQUEST"
    assert response.json()["error"]["message"] == "Datetime doesn't match correct format!"