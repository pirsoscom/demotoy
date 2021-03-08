from slack_cleaner2 import *
import ssl
import os
ssl._create_default_https_context = ssl._create_unverified_context

slack_token=os.environ.get('SLACK_TOKEN')
print (slack_token)

if len(slack_token) > 10:
  s = SlackCleaner(slack_token)

  # list of users
  s.users

  # list of all kind of channels
  s.conversations

  slack_channel=os.environ.get('SLACK_CHANNEL')
  if len(slack_channel) > 4:

    print (slack_channel)
    f = is_not_pinned()
    after = a_while_ago(minutes=2)

    # delete all messages in -bots channels
    for msg in filter(f, s.msgs(filter(match(slack_channel), s.conversations))):
      # delete messages, its files, and all its replies (thread)
      msg.delete(replies=True, files=True)
  else:
    print ("SLACK CHANNEL NOT DEFINED")
    exit()
else:
  print ("SLACK TOKEN NOT DEFINED")
  exit()