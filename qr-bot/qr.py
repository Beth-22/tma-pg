import qrcode
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application, CommandHandler, MessageHandler, filters, 
    ContextTypes, ConversationHandler
)
from io import BytesIO
import logging

# Enable logging.
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class QRCodeBot:
    def __init__(self, token: str):
        self.application = Application.builder().token(token).build()
        self.setup_handlers()
        self.user_data = {}  # Simple user data storage
    
    def setup_handlers(self):
        # Simple handlers without complex conversation
        self.application.add_handler(CommandHandler("start", self.start))
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(MessageHandler(filters.TEXT, self.handle_message))

    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Start the bot and show main menu."""
        await self.show_main_menu(update)

    async def show_main_menu(self, update: Update):
        """Show the main menu with two options."""
        menu_text = "🏠 Welcome to Travelist Hub!\n\nWhat would you like to do?"
        
        keyboard = [
            ['Generate QR Code'],
            ['🚀 Travelist Mini App']
        ]
        reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
        
        await update.message.reply_text(menu_text, reply_markup=reply_markup)

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle all text messages."""
        user_message = update.message.text
        user_id = update.effective_user.id
        
        logger.info(f"User {user_id} sent: {user_message}")
        
        if user_message == 'Generate QR Code':
            # Store that user is in QR generation flow.
            context.user_data['awaiting_phone'] = True
            await update.message.reply_text(
                "👋 Let's create your QR code!\n\nPlease enter your phone number:",
                reply_markup=ReplyKeyboardRemove()
            )
            
        elif user_message == '🚀 Travelist Mini App':
            await self.send_mini_app_launch(update)
            
        elif context.user_data.get('awaiting_phone'):
            # User is providing phone number
            context.user_data['phone'] = user_message
            context.user_data['awaiting_phone'] = False
            context.user_data['awaiting_name'] = True
            await update.message.reply_text(
                "📝 Now please enter your full name:",
                reply_markup=ReplyKeyboardRemove()
            )
            
        elif context.user_data.get('awaiting_name'):
            # User is providing name
            context.user_data['name'] = user_message
            context.user_data['awaiting_name'] = False
            
            # Show confirmation
            user_data = context.user_data
            summary = "📋 Your information:\n\n"
            summary += f"📞 Phone: {user_data.get('phone', 'N/A')}\n"
            summary += f"👤 Name: {user_data.get('name', 'N/A')}\n\n"
            summary += "Click 'Generate QR' to create your QR code:"
            
            keyboard = [['Generate QR']]
            reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
            await update.message.reply_text(summary, reply_markup=reply_markup)
            
        elif user_message == 'Generate QR':
            # Generate and send QR code
            if context.user_data.get('phone') and context.user_data.get('name'):
                qr_image = self.generate_contact_qr(context.user_data)
                
                await update.message.reply_photo(
                    photo=qr_image,
                    caption="✅ Here's your contact QR code!",
                    reply_markup=ReplyKeyboardRemove()
                )
                
                vcard_text = self.generate_vcard(context.user_data)
                await update.message.reply_text(
                    f"📇 Your vCard data:\n```\n{vcard_text}\n```",
                    parse_mode='Markdown'
                )
                
                # Clear user data
                context.user_data.clear()
                await self.show_main_menu(update)
            else:
                await update.message.reply_text("Please start over with /start")
                
        else:
            # If we don't understand, show main menu
            await self.show_main_menu(update)

    async def send_mini_app_launch(self, update: Update):
        """Send the Travelist Mini App launch button."""
        MINI_APP_BOT_USERNAME = "travelistminibot"
        MINI_APP_NAME = "travellist"
        
        mini_app_text = "🚀 **Travelist Mini App**\n\nClick the button below to launch!"
        
        keyboard = [
            [InlineKeyboardButton(
                "🚀 Launch Travelist Mini App", 
                web_app={"url": f"https://t.me/{MINI_APP_BOT_USERNAME}/{MINI_APP_NAME}"}
            )]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            mini_app_text,
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    def generate_contact_qr(self, user_data: dict) -> BytesIO:
        """Generate QR code with contact information."""
        vcard = self.generate_vcard(user_data)
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(vcard)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        bio = BytesIO()
        img.save(bio, 'PNG')
        bio.seek(0)
        
        return bio

    def generate_vcard(self, user_data: dict) -> str:
        """Generate vCard format text."""
        vcard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            f"FN:{user_data.get('name', '')}",
            f"TEL:{user_data.get('phone', '')}",
            "END:VCARD"
        ]
        return "\n".join(vcard)

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Send help message."""
        help_text = """
🤖 Travelist Hub Bot Help:

/start - Show main menu
/help - Show this message

**Features:**
• Generate QR Code - Create contact QR codes
• Travelist Mini App - Launch travel planning app
"""
        await update.message.reply_text(help_text)

    def run(self):
        """Run the bot with error handling."""
        try:
            print("Bot is starting...")
            self.application.run_polling()
        except Exception as e:
            print(f"Error: {e}")
            print("Make sure you have a stable internet connection")

def main():
    BOT_TOKEN = "here"
    
    if not BOT_TOKEN or BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("Please set your bot token!")
        return
    
    bot = QRCodeBot(BOT_TOKEN)
    bot.run()

if __name__ == '__main__':
    main()
