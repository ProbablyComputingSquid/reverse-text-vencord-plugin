<h1 align="center" id="title"> flip and reverse text vencord plugins </h1>

Have you ever wanted to talk backwards? Or send your messages upside down? <br>
This vencord plugin allows you to do just that, along with translating messages sent in reversed/flipped text back to English!
<br>
### What is vencord?
Vencord is a modded discord client that allows user customization of the discord client, and create plugins to add new features to the client. <br>
You can find more information about vencord [here](https://vencord.dev/)
### How do I install this plugin?
In order to add user plugins you need to have vencord self-built. <br>
```bash
git clone https://github.com/Vendicated/Vencord.git
# after doing this, place flipText.tsx and reverseText.tsx in a new folder you create in src, /userplugins/
npm install -g pnpm
pnpm install
pnpm build
pnpm inject
```
Restart discord and you should see the plugins in the plugin list. Enable the plugin for all it's functionalities!<br>
### How do I use this plugin?
![enabled plugin](https://cloud-j37nlsog0-hack-club-bot.vercel.app/0image.png)
Once each plugin is enabled, all messages sent will be fliped or reversed, respectively. <br>
To translate fliped or reversed messages, there is a "reverse/flip" button that appears on the message options bar. Examples are shown below <br>
![pre-unflip](https://cloud-qvyano5y9-hack-club-bot.vercel.app/0image.png)
After using chatbar button:
![post-unflip](https://cloud-qvyano5y9-hack-club-bot.vercel.app/1image.png)
There are buttons for both flip and reverse. 

### Known issues
- the plugin doesn't unflip messages not sent with the plugin itself, because it works with a unicode character mapping, not a "mirror font"
- the plugin doesn't "flip" emojis because that's not possible
- the plugin doesn't "reverse" emojis because that's not possible
- the plugin doesn't correctly "flip" text that is not with latin characters (English), because it uses a character mapping
