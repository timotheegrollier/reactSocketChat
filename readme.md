1. Creer un .env avec "DBUSER,PORT,SSL_PORT"
2. Modifier le fichier /client/src/config.json pour configurer l'url exact du serveur avec le bon port et le bon protocol
3. npm install && npm install-client && npm run build
4. Pour le dev il est possible de lancer le serveur react "cd client && npm start" mais il faut également modifier le proxy dans le fichier /client/package.json pour rediriger les requetes websocket vers le port du serveur websocket (HTTP)