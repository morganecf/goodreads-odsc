#!/bin/bash

set -e

cd "$(dirname "$0")"/..

if [[ -x "$(command -v python3)" ]]; then
  echo "Using Python 3"
  python3 -m http.server
elif [[ -x "$(command -v python)" ]]; then
echo "Using Python 2"
  python -m SimpleHTTPServer
else
  echo "Python not found" >&2
fi
