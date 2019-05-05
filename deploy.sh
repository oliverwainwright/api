#!/usr/bin/env bash

# CHANGE THESE TO MATCH YOUR RESOURCE NAMES AND VALUES
TASK_DEFINITION="awsdevops-api"
SERVICE="api-service"
CLUSTER="awsdevops-cluster"

# exit if the script fails
set -e

echo "Building image ..."

# $IMAGE is available through our command in the deploy job.  It's sourced via $BASH_ENV which is a CircleCI var.
# $CIRCLE_SHA1 is also a CircleCI var for the SHA of this build.  Useful for unique tagging.
docker build -t $IMAGE:$CIRCLE_SHA1 -t $IMAGE:latest .

# Login to AWS.  This will use the credentials we set in our environment.
eval $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)

# Push both images up
docker push $IMAGE:latest
docker push $IMAGE:$CIRCLE_SHA1

echo "Updating service ..."

# Get current task definition as base of the update
aws ecs describe-task-definition --task-definition $TASK_DEFINITION >> base.json

# Exit if the base.json file fails to populate
if [ ! -f ./base.json ]; then
  echo "base.json not found!"
  exit 1
fi

# Create updated task file at file://update-task.json that we'll make shortly
node ./create-updated-task.js

# Exit if the updated file fails to populate
if [ ! -f ./updated-task.json ]; then
  echo "updated-task.json not found!"
  exit 1
fi

aws ecs register-task-definition --cli-input-json file://updated-task.json

aws ecs update-service --cluster $CLUSTER --service $SERVICE --task-definition $TASK_DEFINITION

# remove temp files

rm ./base.json
rm ./updated-task.json