
echo "chan $SLACK_CHANNEL"
echo "tok $SLACK_TOKEN"

python3 ./scripts/maintenance/slack-cleaner.py

