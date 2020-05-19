# Generate signed URL so that resource doesn't have to be public
id=`aws s3 presign $1 --output text`
ffmpeg -i $id -f mp4 -movflags frag_keyframe+empty_moov pipe:1 | aws s3 cp - $2 