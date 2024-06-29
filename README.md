# Fenomenos_frontend

## Interfaz
Para levantar la interfaz de la aplicación, antes que nada se debe ejecutar en la terminal el siguiente comando dentro de la carpeta `piramide` que se encuentra en el directorio raíz:
```
yarn
```
De esta forma, se instalarán todos los paquetes necesarios y se agregará la carpeta `node_modules`.

Para levantar la interfaz y conectarse a la API, se debe ejecutar:
```
yarn dev
```
Para jugar, es necesario acceder a la página de `Acceder` o `Registrarse`. Las cuentas no están conectados al backend aún por lo que se puede entrar con cualquier email y contraseña. Luego, les lleva a la página `Profile-Page`, en donde pueden ver el perfil o acceder al tablero.

Durante el juego, se presenta la interfaz del que le toca el turno, se puede desafiar a cualquier persona de la mesa y luego se asume que le estan respondiendo que sí tiene la carta, por lo que hay que decidir si creer en que si la tiene o no. Si es que se pone la opción sí no sucede nada y sigue el juego (debería cambiar de turno pero en esta entrega solo hay un jugador real), si se coloca la opción no se mostrará una alerta si es que la tiene o no mostrándose también la carta en caso de que efectivamente la tenga. El juego termina una vez reveladas todas las cartas de la pirámide.



