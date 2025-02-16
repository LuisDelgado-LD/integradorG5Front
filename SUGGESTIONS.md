# Reglas

- Se trabajará sobre la rama main, hay libertad de crear ramas locales, sin embargo estas **no deben subirse a github**
- Antes de cada sesión de trabajo, sea personal o grupal, se debe ejecutar un pull
``` git
git pull
```
- Después de cada sesión de trabajo se debe ejecutar un push
 ``` git
git push
```
en el caso que este trabajando con una rama local, previamente se debe ejecutar un merge de los cambios a main y luego el git push
``` git
git switch main
git merge <tu rama local>
git push origin main
``` 

- Las ramas **produccionFront o produccionBack no deben ser usada**s por ningún miembro del equipo
- Se sugiere que tan pronto se pruebe y se suba un commit que complete una tarea o cumpla un criterio de aceptación, se debe crear un pull request a la rama produccionFront o produccionBack, indicando el comentario la tarea completada, los integrantes que aportaron al código y evidencias de testing, esta última el tester la puede subir posteriormente como comentario, pero en ningún caso se aprobara un pull request sin evidencias de testing
- Se sugiere que si ambas personas están trabajando en el mismo repositorio al mismo tiempo, se haga por llamada estilo live coding

## Guía interactiva de los comandos

Pueden visitar [este enlace](https://ndpsoftware.com/git-cheatsheet.html#loc=local_repo) si tienen dudas de algún comando o de como se va moviendo la información en las distintas "etapas".
Considerar estos sinónimos para entender mejor la página

| Nombre             | significado                                        |
| ------------------ | -------------------------------------------------- |
| Workspace          | Lo que tendremos en el directorio                  |
| Index              | lo que conocemos con el área de staging o de stage |
| Repositorio local  | nuestros commits                                   |
| Repositorio remoto | el repositorio en GitHub                           |

## Qué hacer en caso de error en git
### En caso de conflicto
- Conversar con el usuario que modificó el archivo que provoca el conflicto y solucionar el código en el archivo, hacer el push y todos los involucrados en el repo deben inmediatamente hacer pull 

#### Como puedo saber cual es el archivo que tiene conflictos
Se debe ejecutar un 
```git
git status
 ```

Y fijarse en la línea que dice "Rutas no fusionadas", a continuación se da un ejemplo donde quisimos hacer un merge de la rama main en la rama HU2 y se creó un conflicto, al ejecutar git status se ve
```git
En la rama HU2
Tienes rutas no fusionadas.
  (arregla los conflictos y ejecuta "git commit"
  (usa "git merge --abort" para abortar la fusion)

Cambios a ser confirmados:
        modificados:     src/Components/Navbar.jsx
        renombrados:     src/App.css -> src/Styles/App.css
        nuevos archivos: src/img/logo.png

Rutas no fusionadas:
  (usa "git add <archivo>..." para marcar una resolución)
        modificados por ambos:  src/App.jsx

Cambios no rastreados para el commit:
  (usa "git add <archivo>..." para actualizar lo que será confirmado)
  (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)
        modificados:     src/Components/Navbar.jsx
        modificados:     src/Styles/App.css

Archivos sin seguimiento:
  (usa "git add <archivo>..." para incluirlo a lo que será confirmado)
        src/Pages/Productos.jsx
        src/Styles/Productos.module.css

```
De este fragmento podemos notar varias cosas.
- Dentro de los cambios de la fusión se incluyen los archivos src/Components/Navbar.jsx, src/img/logo.png y se movió el archivo src/App.css -> src/Styles/App.css
- En el siguiente bloque podemos observar cual es el archivo que esta en conflicto, para este caso es src/App.jsx
- En la sección siguiente se ve los archivos modificados que se encuentran en staging 
- Finalmente los archivos que solo estan en el área de trabajo

#### Como se que parte del archivo es la que tiene el conflicto
Una vez que identificamos el archivo procedemos a buscar la línea que incluya <<<<<<< y >>>>>>> ambos separados por =======
En este caso en el archivo src/App.jsx tenemos
```git 
<<<<<<< HEAD
import "./App.css";
=======
import "./Styles/App.css";
>>>>>>> main
```

Esto quiere decir:
- En mi rama HU2 (la rama origen) tengo el texto
```txt
import "./App.css";
```
y en la rama que quiero incorporar (main) tengo
```txt
import "./Styles/App.css";
```
A veces solo veremos HEAD, que indica nuestra rama local, y el hash del commit que genera el conflicto.
Para este caso es solo una línea la que tiene el conflicto, si fuesen más podriamos tener varios bloques con los simbolos <<<<<<< y >>>>>>> o varias líneas en cada uno de estos bloques.

#### Como se soluciona
Hay que corregir el conflicto y además eliminar todas las líneas que tengan los símbolos "<<<<<<<", ">>>>>>>" y "======="
Luego hacemos un 
```git
git add <nombre del archivo>
```
Para luego hacer el commit
```git
git commit
```




### Como puedo saber que cambios hice en un archivo desde el último commit
Para ver todos los cambios que ha hecho a algún archivo desde el último commit basta con ejecutar
``` git
git diff <nombre del archivo>
```
Este comando también puede ser utilizado para comparar 2 commits, e incluso 2 ramas distintas


### En caso de mensaje "Por favor, confirma tus cambios o aguárdalos antes de fusionar."
Este mensaje indica que tenemos archivos en el área de trabajo que no han sido commiteados, en la línea superior nos indica cual o cuales son los archivos con problemas, de igual forma para asegurarnos podemos ejecutar un

```git
git status
```
Para ver los archivos modificados que aún no estén en staging.
Teniendo el listado de los archivos se puede elegir alguno de los siguientes caminos:
1. Si es un cambio necesario, debemos agregarlo al área de staging y hacer un commit 
2. Si es un cambio necesario, podemos crear una rama nueva y ahí hacer el commit, luego hacer el pull de main en la rama main local y un merge de los cambios 
3. Si es un cambio innecesario podemos utilizar git restore \<archivo>

#### Para el caso 1
#### Para el caso 2
##### Resumen de comandos
```git
git switch -c cambios  
git add integradorG5Front/package.json    
git commit -m "cambios en package"  
git switch main  
git pull origin main  
git merge cambios    
git status
```
##### Log completo
```bash
[yikoru@blank-rabbit integradorG5Front2]$ git pull  
Actualizando fc75bd2..e0d01ee  
error: Los cambios locales de los siguientes archivos serán sobrescritos al fusionar:  
       integradorG5Front/package.json  
Por favor, confirma tus cambios o aguárdalos antes de fusionar.  
Abortando  
[yikoru@blank-rabbit integradorG5Front2]$ git status    
En la rama main  
Tu rama está detrás de 'origin/main' por 1 commit, y puede ser avanzada rápido.  
 (usa "git pull" para actualizar tu rama local)  
  
Cambios no rastreados para el commit:  
 (usa "git add <archivo>..." para actualizar lo que será confirmado)  
 (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)  
       modificados:     integradorG5Front/package.json  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
sin cambios agregados al commit (usa "git add" y/o "git commit -a")  
[yikoru@blank-rabbit integradorG5Front2]$ git switch -c cambios  
Cambiado a nueva rama 'cambios'  
[yikoru@blank-rabbit integradorG5Front2]$ git add integradorG5Front/package.json    
[yikoru@blank-rabbit integradorG5Front2]$ git commit -m "cambios en package"  
[cambios 2a279db] cambios en package  
1 file changed, 2 insertions(+), 1 deletion(-)  
[yikoru@blank-rabbit integradorG5Front2]$ git switch main  
Cambiado a rama 'main'  
Tu rama está detrás de 'origin/main' por 1 commit, y puede ser avanzada rápido.  
 (usa "git pull" para actualizar tu rama local)  
[yikoru@blank-rabbit integradorG5Front2]$ git pull origin main  
Desde github.com:jfcuadra/integradorG5Front  
* branch            main       -> FETCH_HEAD  
Actualizando fc75bd2..e0d01ee  
Fast-forward  
integradorG5Front/.gitignore => .gitignore                 |  0  
integradorG5Front/README.md => README.md                   |  0  
integradorG5Front/eslint.config.js => eslint.config.js     |  0  
integradorG5Front/index.html => index.html                 |  0  
integradorG5Front/src/Pages/Home.jsx                       |  9 ---------  
integradorG5Front/package-lock.json => package-lock.json   |  0  
integradorG5Front/package.json => package.json             |  0  
{integradorG5Front/public => public}/vite.svg              |  0  
{integradorG5Front/src => src}/App.css                     |  0  
{integradorG5Front/src => src}/App.jsx                     |  0  
{integradorG5Front/src => src}/Components/Footer.jsx       |  0  
{integradorG5Front/src => src}/Components/Navbar.jsx       |  0  
{integradorG5Front/src => src}/Pages/Clientes.jsx          |  0  
src/Pages/Home.jsx                                         | 46 ++++++++++++++++++++++++++++++++++++++++++++++  
{integradorG5Front/src => src}/Pages/Reserva.jsx           |  0  
{integradorG5Front/src => src}/Routes/AppRouter.jsx        |  0  
{integradorG5Front/src => src}/Styles/global.css           |  0  
{integradorG5Front/src => src}/assets/react.svg            |  0  
{integradorG5Front/src => src}/index.css                   | 56 ++++++++++++++++++++++++++++++++------------------------  
{integradorG5Front/src => src}/main.jsx                    |  0  
{integradorG5Front/src => src}/services/ReservaService.js  |  0  
{integradorG5Front/src => src}/services/clienteServices.js |  0  
integradorG5Front/vite.config.js => vite.config.js         |  0  
23 files changed, 78 insertions(+), 33 deletions(-)  
rename integradorG5Front/.gitignore => .gitignore (100%)  
rename integradorG5Front/README.md => README.md (100%)  
rename integradorG5Front/eslint.config.js => eslint.config.js (100%)  
rename integradorG5Front/index.html => index.html (100%)  
delete mode 100644 integradorG5Front/src/Pages/Home.jsx  
rename integradorG5Front/package-lock.json => package-lock.json (100%)  
rename integradorG5Front/package.json => package.json (100%)  
rename {integradorG5Front/public => public}/vite.svg (100%)  
rename {integradorG5Front/src => src}/App.css (100%)  
rename {integradorG5Front/src => src}/App.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Footer.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Navbar.jsx (100%)  
rename {integradorG5Front/src => src}/Pages/Clientes.jsx (100%)  
create mode 100644 src/Pages/Home.jsx  
rename {integradorG5Front/src => src}/Pages/Reserva.jsx (100%)  
rename {integradorG5Front/src => src}/Routes/AppRouter.jsx (100%)  
rename {integradorG5Front/src => src}/Styles/global.css (100%)  
rename {integradorG5Front/src => src}/assets/react.svg (100%)  
rename {integradorG5Front/src => src}/index.css (59%)  
rename {integradorG5Front/src => src}/main.jsx (100%)  
rename {integradorG5Front/src => src}/services/ReservaService.js (100%)  
rename {integradorG5Front/src => src}/services/clienteServices.js (100%)  
rename integradorG5Front/vite.config.js => vite.config.js (100%)  
[yikoru@blank-rabbit integradorG5Front2]$ git branch  
 cambios  
* main  
[yikoru@blank-rabbit integradorG5Front2]$ git merge cambios    
Merge made by the 'ort' strategy.  
package.json | 3 ++-  
1 file changed, 2 insertions(+), 1 deletion(-)  
[yikoru@blank-rabbit integradorG5Front2]$ git status  
En la rama main  
Tu rama está adelantada a 'origin/main' por 2 commits.  
 (usa "git push" para publicar tus commits locales)  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)
```
#### Para el caso 3
##### Resumen de comandos
```git
git restore integradorG5Front/package.json
git pull
```
##### Log completo
```bash
[yikoru@blank-rabbit integradorG5Front3]$ git status  
En la rama main  
Tu rama está detrás de 'origin/main' por 1 commit, y puede ser avanzada rápido.  
 (usa "git pull" para actualizar tu rama local)  
  
Cambios no rastreados para el commit:  
 (usa "git add <archivo>..." para actualizar lo que será confirmado)  
 (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)  
       modificados:     integradorG5Front/package.json  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
sin cambios agregados al commit (usa "git add" y/o "git commit -a")  
[yikoru@blank-rabbit integradorG5Front3]$ git restore integradorG5Front/package.json    
[yikoru@blank-rabbit integradorG5Front3]$ git pull  
Actualizando fc75bd2..e0d01ee  
Fast-forward  
integradorG5Front/.gitignore => .gitignore                 |  0  
integradorG5Front/README.md => README.md                   |  0  
integradorG5Front/eslint.config.js => eslint.config.js     |  0  
integradorG5Front/index.html => index.html                 |  0  
integradorG5Front/src/Pages/Home.jsx                       |  9 ---------  
integradorG5Front/package-lock.json => package-lock.json   |  0  
integradorG5Front/package.json => package.json             |  0  
{integradorG5Front/public => public}/vite.svg              |  0  
{integradorG5Front/src => src}/App.css                     |  0  
{integradorG5Front/src => src}/App.jsx                     |  0  
{integradorG5Front/src => src}/Components/Footer.jsx       |  0  
{integradorG5Front/src => src}/Components/Navbar.jsx       |  0  
{integradorG5Front/src => src}/Pages/Clientes.jsx          |  0  
src/Pages/Home.jsx                                         | 46 ++++++++++++++++++++++++++++++++++++++++++++++  
{integradorG5Front/src => src}/Pages/Reserva.jsx           |  0  
{integradorG5Front/src => src}/Routes/AppRouter.jsx        |  0  
{integradorG5Front/src => src}/Styles/global.css           |  0  
{integradorG5Front/src => src}/assets/react.svg            |  0  
{integradorG5Front/src => src}/index.css                   | 56 ++++++++++++++++++++++++++++++++------------------------  
{integradorG5Front/src => src}/main.jsx                    |  0  
{integradorG5Front/src => src}/services/ReservaService.js  |  0  
{integradorG5Front/src => src}/services/clienteServices.js |  0  
integradorG5Front/vite.config.js => vite.config.js         |  0  
23 files changed, 78 insertions(+), 33 deletions(-)  
rename integradorG5Front/.gitignore => .gitignore (100%)  
rename integradorG5Front/README.md => README.md (100%)  
rename integradorG5Front/eslint.config.js => eslint.config.js (100%)  
rename integradorG5Front/index.html => index.html (100%)  
delete mode 100644 integradorG5Front/src/Pages/Home.jsx  
rename integradorG5Front/package-lock.json => package-lock.json (100%)  
rename integradorG5Front/package.json => package.json (100%)  
rename {integradorG5Front/public => public}/vite.svg (100%)  
rename {integradorG5Front/src => src}/App.css (100%)  
rename {integradorG5Front/src => src}/App.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Footer.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Navbar.jsx (100%)  
rename {integradorG5Front/src => src}/Pages/Clientes.jsx (100%)  
create mode 100644 src/Pages/Home.jsx  
rename {integradorG5Front/src => src}/Pages/Reserva.jsx (100%)  
rename {integradorG5Front/src => src}/Routes/AppRouter.j[yikoru@blank-rabbit integradorG5Front3]$ git status  
En la rama main  
Tu rama está detrás de 'origin/main' por 1 commit, y puede ser avanzada rápido.  
 (usa "git pull" para actualizar tu rama local)  
  
Cambios no rastreados para el commit:  
 (usa "git add <archivo>..." para actualizar lo que será confirmado)  
 (usa "git restore <archivo>..." para descartar los cambios en el directorio de trabajo)  
       modificados:     integradorG5Front/package.json  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
sin cambios agregados al commit (usa "git add" y/o "git commit -a")  
[yikoru@blank-rabbit integradorG5Front3]$ git restore integradorG5Front/package.json    
[yikoru@blank-rabbit integradorG5Front3]$ git pull  
Actualizando fc75bd2..e0d01ee  
Fast-forward  
integradorG5Front/.gitignore => .gitignore                 |  0  
integradorG5Front/README.md => README.md                   |  0  
integradorG5Front/eslint.config.js => eslint.config.js     |  0  
integradorG5Front/index.html => index.html                 |  0  
integradorG5Front/src/Pages/Home.jsx                       |  9 ---------  
integradorG5Front/package-lock.json => package-lock.json   |  0  
integradorG5Front/package.json => package.json             |  0  
{integradorG5Front/public => public}/vite.svg              |  0  
{integradorG5Front/src => src}/App.css                     |  0  
{integradorG5Front/src => src}/App.jsx                     |  0  
{integradorG5Front/src => src}/Components/Footer.jsx       |  0  
{integradorG5Front/src => src}/Components/Navbar.jsx       |  0  
{integradorG5Front/src => src}/Pages/Clientes.jsx          |  0  
src/Pages/Home.jsx                                         | 46 ++++++++++++++++++++++++++++++++++++++++++++++  
{integradorG5Front/src => src}/Pages/Reserva.jsx           |  0  
{integradorG5Front/src => src}/Routes/AppRouter.jsx        |  0  
{integradorG5Front/src => src}/Styles/global.css           |  0  
{integradorG5Front/src => src}/assets/react.svg            |  0  
{integradorG5Front/src => src}/index.css                   | 56 ++++++++++++++++++++++++++++++++------------------------  
{integradorG5Front/src => src}/main.jsx                    |  0  
{integradorG5Front/src => src}/services/ReservaService.js  |  0  
{integradorG5Front/src => src}/services/clienteServices.js |  0  
integradorG5Front/vite.config.js => vite.config.js         |  0  
23 files changed, 78 insertions(+), 33 deletions(-)  
rename integradorG5Front/.gitignore => .gitignore (100%)  
rename integradorG5Front/README.md => README.md (100%)  
rename integradorG5Front/eslint.config.js => eslint.config.js (100%)  
rename integradorG5Front/index.html => index.html (100%)  
delete mode 100644 integradorG5Front/src/Pages/Home.jsx  
rename integradorG5Front/package-lock.json => package-lock.json (100%)  
rename integradorG5Front/package.json => package.json (100%)  
rename {integradorG5Front/public => public}/vite.svg (100%)  
rename {integradorG5Front/src => src}/App.css (100%)  
rename {integradorG5Front/src => src}/App.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Footer.jsx (100%)  
rename {integradorG5Front/src => src}/Components/Navbar.jsx (100%)  
rename {integradorG5Front/src => src}/Pages/Clientes.jsx (100%)  
create mode 100644 src/Pages/Home.jsx  
rename {integradorG5Front/src => src}/Pages/Reserva.jsx (100%)  
rename {integradorG5Front/src => src}/Routes/AppRouter.jsx (100%)  
rename {integradorG5Front/src => src}/Styles/global.css (100%)  
rename {integradorG5Front/src => src}/assets/react.svg (100%)  
rename {integradorG5Front/src => src}/index.css (59%)  
rename {integradorG5Front/src => src}/main.jsx (100%)  
rename {integradorG5Front/src => src}/services/ReservaService.js (100%)  
rename {integradorG5Front/src => src}/services/clienteServices.js (100%)  
rename integradorG5Front/vite.config.js => vite.config.js (100%)  
[yikoru@blank-rabbit integradorG5Front3]$ git status  
En la rama main  
Tu rama está actualizada con 'origin/main'.  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)  
[yikoru@blank-rabbit integradorG5Front3]$sx (100%)  
rename {integradorG5Front/src => src}/Styles/global.css (100%)  
rename {integradorG5Front/src => src}/assets/react.svg (100%)  
rename {integradorG5Front/src => src}/index.css (59%)  
rename {integradorG5Front/src => src}/main.jsx (100%)  
rename {integradorG5Front/src => src}/services/ReservaService.js (100%)  
rename {integradorG5Front/src => src}/services/clienteServices.js (100%)  
rename integradorG5Front/vite.config.js => vite.config.js (100%)  
[yikoru@blank-rabbit integradorG5Front3]$ git status  
En la rama main  
Tu rama está actualizada con 'origin/main'.  
  
Archivos sin seguimiento:  
 (usa "git add <archivo>..." para incluirlo a lo que será confirmado)  
       Dockerfile  
  
no hay nada agregado al commit pero hay archivos sin seguimiento presentes (usa "git add" para hacerles seguimiento)  
[yikoru@blank-rabbit integradorG5Front3]$
```



### En caso que no pueda hacer un push 
El motivo más frecuente es por que existen cambios en el repositorio remoto que aún no tenemos en local y suele ser una señal de aviso de que se producirá un conflicto.
Para solucionar este problema, se recomienda utilizar el comando 
``` git
git pull --rebase
```
y ver si existe algún conflicto, solucionarlo según [[#En caso de conflicto]] y hacer el push correspondiente


### En caso de error desconocido
- Crear una copia de todo el directorio de la rama que estamos trabajando
- Guardar en un archivo de texto aparte todos los comandos git que se hayan ejecutado durante esa sesión, mínimo los últimos 10 comandos
- Tomar un pantallazo de la consola al momento del error y copiar en un archivo todo lo que aparezca luego de ejecutar el comando que genera el error
- subir todos los archivos generados, el directorio copiado, los pantallazos y el listado de comandos a discord en canal problemas de su respectiva categoría (zona frontend, zona backend o zona común)


```
hint: Las ramas se han divergido y hay que especificar cómo reconciliarlas.  
hint: Se puede hacerlo ejecutando uno de los comandos siguiente antes del  
hint: próximo pull:  
hint:  
hint:   git config pull.rebase false  # fusionar  
hint:   git config pull.rebase true   # rebasar  
hint:   git config pull.ff only       # solo avance rápido  
hint:  
hint: Se puede reemplazar "git config" con "git config --global" para aplicar  
hint: la preferencia en todos los repositorios. También se puede pasar  
hint: --rebase, --no-rebase o --ff-only en el comando para sobrescribir la  
hint: configuración por defecto en cada invocación.
```
