#!/bin/bash

# If you do not have the firebase emulator, you can install with the following command:
# curl -sL firebase.tools | bash
pkill -f firebase
pkill -f next
set -e

# if we are running in CI we don't need to export and import data
if [[ ! -z "$CI" ]]; then
    # we want to sleep to make sure everything was killed
    sleep 5
    firebase emulators:start --debug &
else
    sleep 5
    firebase emulators:start --import=./firebase-emulator-data --export-on-exit=./firebase-emulator-data &
fi


cross-env NEXT_PUBLIC_GIT_SHA=$(git rev-parse --short HEAD) GCLOUD_PROJECT=sign-in-form-d02de FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099" FIRESTORE_EMULATOR_HOST="127.0.0.1:8081" PORT=3000 FIREBASE_STORAGE_EMULATOR_HOST="127.0.0.1:9199" yarn next dev -p 3000
