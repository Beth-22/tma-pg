import os
import requests
from datetime import datetime, timedelta

TOKEN = os.environ["BOT_TOKEN"]
USER_IDS = os.environ.get("USER_IDS", "")

def send_message(chat_id, text):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    requests.post(url, json={"chat_id": chat_id, "text": text})

def handle_start():
    """
    Sends a custom greeting when a user presses /start.
    """
    url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"
    try:
        data = requests.get(url).json()
    except:
        return

    for update in data.get("result", []):
        if "message" in update:
            chat_id = update["message"]["chat"]["id"]
            text = update["message"]["text"]
            if text.strip() == "/start":
                send_message(chat_id, "Hi! This is your KM reminder – Soul Check. I will send you a message every Sunday after the 16th.")

def is_first_sunday_after_16th(today):
    # Check if today is Sunday
    if today.weekday() != 6:
        return False
    # Must be after the 16th
    if today.day <= 16:
        return False
    # Ensure it's the first Sunday after 16th
    previous_week = today - timedelta(days=7)
    return previous_week.day <= 16

def run_reminder():
    if not USER_IDS:
        print("No USER_IDS configured yet.")
        return

    users = USER_IDS.split(",")
    today = datetime.utcnow()

    if is_first_sunday_after_16th(today):
        for user in users:
            send_message(user, "Hi! This is your KM reminder – Soul Check. I will send you a message every Sunday after the 16th.")
        print("Reminder sent.")
    else:
        print("Not the correct day.")

if __name__ == "__main__":
    handle_start()   # send greeting if someone pressed /start
    run_reminder()   # send Sunday-after-16th reminder if today is correct
