from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta, datetime
from .credentials import CLIENT_SECRET, CLIENT_ID, REDIRECT_URI
from requests import post


def get_user_tokens(session_id):
    user_token = SpotifyToken.objects.filter(user=session_id)
    if user_token.exists():
        return user_token[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token,token_type=token_type,expires_in=expires_in)
        tokens.save()

# def is_spotify_authenticated(session_id):
#     tokens = get_user_tokens(session_id)
#     if tokens:
#         expiry = tokens.expires_in
#         if expiry <= timezone.now():
#             refresh_spotify_token(session_id)
        
#         return True

#     return False

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        expiry_datetime = timezone.make_aware(datetime.strptime(expiry[:19], '%Y-%m-%d %H:%M:%S'))
        if expiry_datetime <= timezone.now():
            refresh_spotify_token(session_id)
            return True

    return False

def refresh_spotify_token(session_id):
    refresh_token =  get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)