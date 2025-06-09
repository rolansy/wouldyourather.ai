#!/bin/sh
set -e

# Replace environment variables in the nginx config
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the CMD from the Dockerfile
exec "$@"