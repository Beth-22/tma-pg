import os
import requests
from datetime import datetime, timedelta

TOKEN = os.environ["BOT_TOKEN"]

# Comma-separated chat IDs stored in environment variable
# Example: "12345,67890"
USER_IDS = os.environ.get("USER_IDS", "")

def get_updates():
    url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"
    return requests.get(url).json()

def send_message(chat_id, text):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    requests.post(url, json={"chat_id": chat_id, "text": text})

def is_first_sunday_after_16th(today):
    # Sunday check (Monday=0 ... Sunday=6)
    if today.weekday() != 6:
        return False

    # Must be AFTER the 16th
    if today.day <= 16:
        return False

    # Ensure it's the FIRST such Sunday
    previous_week = today - timedelta(days=7)
    return previous_week.day <= 16

def register_new_users():
    """
    Reads who pressed /start and prints their chat IDs.
    You copy them once into Render USER_IDS.
    """
    data = get_updates()

    ids = set()
    for update in data.get("result", []):
        if "message" in update:
            chat_id = update["message"]["chat"]["id"]
            ids.add(str(chat_id))

    if ids:
        print("Add these to USER_IDS in Render:")
        print(",".join(ids))

def run_reminder():
    if not USER_IDS:
        print("No USER_IDS configured yet.")
        return

    users = USER_IDS.split(",")

    today = datetime.utcnow()

    if is_first_sunday_after_16th(today):
        for user in users:
            send_message(user, "Reminder: Today is KM day!")

        print("Reminder sent.")
    else:
        print("Not the correct day.")

if __name__ == "__main__":
    # First time you run, it will show chat IDs.
    # After you configure USER_IDS, it will act as the reminder.
    register_new_users()
    run_reminder()
