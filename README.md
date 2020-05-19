# FFMPEG Cloud Run Example
A small express API used for ffmpeg on Googles cloud run. It allows for simple video transcoding between S3 buckets.

The project can be deployed with the below bash script. It assumes you have everything configured correctly with the gcloud SDK.

```
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_HERE>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY_KERE>
export GCLOUD_PROJECT_ID=<YOUR_GCLOUD_PROJECT_ID_HERE>
export IMAGE_TAG=<YOUR_DOCKER_ID_HERE>/<YOUR_IMAGE_NAME_HERE>
export PROJECT_NAME=<YOUR_CLOUDRUN_NAME_HERE>

docker build -t $IMAGE_TAG \
--build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
--build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY .

docker tag $IMAGE_TAG gcr.io/$GCLOUD_PROJECT_ID/$PROJECT_NAME
docker push gcr.io/$GCLOUD_PROJECT_ID/$PROJECT_NAME

gcloud run deploy --image gcr.io/$GCLOUD_PROJECT_ID/$PROJECT_NAME --platform manage
```

## Example Curl Command

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"input_uri":"s3://input-bucket/test.mp4", "output_uri":"s3://output-bucket/video/output.mkv"}' \
  http://localhost:3000/transcode
```

