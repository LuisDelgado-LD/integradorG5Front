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
