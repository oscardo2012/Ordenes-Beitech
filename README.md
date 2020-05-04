# Solucion-de-la-prueba
Desarrollo del examen práctico de programación PHP para Beitech.  
Realizado por Oscar Fernando Espinosa Rocha.
***
## Descripción de la solución:

##### 1. Back-end
El desarrollo del back-end se desarrollo utilizando el framework Laravel en su versión 5.8.  
Consiste en un API Rest para ser consumido por el cliente del API.  
- En el archivo `config/database.php` se deben configurar los parámetros para realizar la conexión con la base de datos.
    - Los parámetros de conexión ya se encuentran configurados según las instrucciones del examen.  

Se debe abrir una ventana de terminal, cmd, etc. y ubicarse en la carpeta del proyecto.
- Se deben realizar las siguientes configuraciones:
    ```sh
    % composer dump-autoload
    % php artisan config:cache
    % php artisan key:generate
    ```
-   Para levantar el servidor se debe ejecutar
    ```sh
    % php artisan serve
    ```
- Por defecto Laravel se ejecuta en la dirección: 
    [http://localhost:8000/](http://localhost:8000/)  
- Los métodos del API se acceden a través de [http://localhost:8000/api/](http://localhost:8000/api/)
##### 2. Front-end
Para el desarrollo del cliente del API:
-   Se usaron:  
    * El Framework `Vue.js`.  
    * La biblioteca `Bootstrap`.  
    * La plantilla `INSPINIA - Responsive Admin Theme`.  
- Se recomienda desplegarlo en un servidor web.
- También se puede desplegar en un servidor temporal usando `PHP` de la siguiente forma:  
    * En la terminal, cmd, etc. ubicarse en la carpeta del cliente del API.
    * Ejecutar la siguiente instrucción:
        ```sh
        % php -S=localhost:12345
        ```
    * Así el cliente se ejecutará en `http://localhost:12345/`
-   La URL del API se debe modificar en el archivo `js/app.js`, en la línea 1, en la variable `urlAPI`

##### 3. Nota
Se pueden presentar problemas de comunicación entre el cliente web y el API por cuestiones de CORS.  
Se recomienda instalarle al navegador algún plug-in que permita las peticiones CORS.  
- Firefox: [CORS Everywhere](https://addons.mozilla.org/es/firefox/addon/cors-everywhere/)  
- Chrome: [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)