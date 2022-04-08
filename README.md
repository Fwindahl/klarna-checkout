# klarna-checkout-boilerplate

## How to install

1. Clone the git repo in the terminal using `git clone https://github.com/MMR-Solutions-AB/klarna-checkout-boilerplate.git`.
2. Run `cd klarna-checkout-boilerplate` in the terminal.
3. Run `npm i` in the terminal.
4. Create a Klarna Playground Account + Klarna Playground API Key that you will use below:
5. Create an .env file that looks like this: 
```
NODE_ENV=development
PORT=3000
PUBLIC_KEY=************
SECRET_KEY=************
CONFIRMATION_URL=https://klarna-checkout-matt.herokuapp.com
BASE_URL=https://api.playground.klarna.com
```
6. Run `sudo npm install -g nodemon` in the terminal.
7. Run `npm run dev` in the terminal.
8. The application should now be running on `http://localhost:3000`

## App Architecture

OBS: .env file is needed to run project, and is not supplied through the `git clone` command.

```
.env                # Environment variables, supplied by @fullstackmac.
public              # All static and public assets, such as images and videos.
src
│   start.js        # App start file
│   app.js          # App entry point
└───routes          # Express route controllers for all the endpoints of the app
└───loaders         # Splits up the startup process into modules
└───services        # All the business logic is here
└───views           # Views that we use together with handlebars.js to render html sent from the server
└───static          # Static data, for example fake cart items

```

**Keep in mind that we often group files in to the following categories:**

```
any_folder
└───both          # Both client and server-needed files
└───client        # Only client-side needed files
└───server        # Only server-side files
```
