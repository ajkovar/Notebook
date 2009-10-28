# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_test2_session',
  :secret      => '546365b2732bfbcf8253307a5d31a51f3f730d25f4ac304b9c6fa5c176d317d9d5352cb2ae69988f5f2fc332dab1e49bc603a3fc1d79e2a2653197e5aa7a7ee8'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
