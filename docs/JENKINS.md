# Preparar Jenkins para Voltio Store

## Arquitectura del laboratorio

```text
Integrantes -> git push -> GitHub/main <- consulta periódica de Jenkins
                                             |
                    npm ci -> lint/tsc -> Jest/JUnit -> next build
                                                               |
                                          carpeta deployment <- copia validada
                                                               |
                                                    Nginx -> localhost:3001
```

Docker Desktop ejecuta Jenkins y Nginx. Java viene dentro de la imagen de Jenkins. El plugin NodeJS instala Node/npm en el JENKINS_HOME persistente. Jenkins ejecuta los trabajos en su nodo integrado, una simplificación de laboratorio; en producción se separan los agentes. No se monta el socket Docker ni se ejecuta Docker-in-Docker.

El checkout y node_modules del pipeline usan `/tmp/voltio-workspaces/JOB_NAME` dentro del contenedor. Evita el costo de miles de operaciones pequeñas sobre el directorio compartido de Windows. Es una copia temporal reconstruible: al recrear el contenedor se pierde y el siguiente build la vuelve a crear. Las fuentes del desarrollador permanecen en `D:\Jenkins-Pract\Web-Jenk-Store`, los reportes archivados y configuración en `jenkins_home`, y la publicación en `deployment`.

## Archivos del host

El Compose activo está en `D:\Jenkins-Pract\compose.yaml`. El ejemplo `infra/compose.yaml` se copia a esa ubicación: sus rutas se calculan desde allí. No arrancarlo directamente desde `infra/`, porque usaría otros directorios.

```text
D:\Jenkins-Pract\
  compose.yaml
  nginx.conf
  jenkins_home\         Usuarios, herramientas, trabajos e historial: privado
  deployment\           Web compilada que lee Nginx
  Web-Jenk-Store\       Único repositorio Git del proyecto
  material-equipo\      Ocho agregaciones y guía, fuera de la base
```

## Plugins y herramientas

En Administrar Jenkins -> Plugins -> Instalados comprobar Git, Pipeline, JUnit y NodeJS. Para una instalación multibranch también Pipeline: Multibranch. Los plugins sugeridos suelen incluir los tres primeros. No son necesarios Docker Pipeline ni GitHub Actions.

En Herramientas, la instalación NodeJS debe llamarse exactamente `node24`, con Node.js 24 e instalación automática. Ya fue comprobada en `prueba-jenkins`.

## Crear el job principal, si no existe todavía

1. Nueva tarea -> nombre `voltio-store` -> Pipeline.
2. Descripción: `Voltio Store: validaciones y despliegue local de main`.
3. En Pipeline, Definition: **Pipeline script from SCM**.
4. SCM: **Git**.
5. Repository URL: `https://github.com/Sunner-01/Web-Jenk-Store.git`.
6. Si el repo es público, Credentials: none. Si es privado, crear credencial de lectura en Jenkins, nunca poner el token en el repositorio.
7. Branch Specifier: `*/main`.
8. Script Path: `Jenkinsfile`.
9. Guardar y construir una vez manualmente. Después se habilita Poll SCM cada minuto desde el Jenkinsfile.

El job debe existir después de publicar el commit base en GitHub. Si ya se creó automáticamente, comprobar estos campos y usarlo; no duplicarlo.

## Evidencia por ejecución

- Último commit y autor en la etapa Código fuente.
- Resultado y detalle de Jest en Test Result.
- Cobertura descargable en artefactos.
- Etapas posteriores omitidas cuando falla Jest.
- `deployment.json` del artefacto y de http://localhost:3001/deployment.json contienen SHA y build.

Para un fallo deliberado, cambiar una implementación sin modificar su expectativa correcta. Primero comprobar que el test falla localmente; luego subir ese cambio, mostrar el rojo y que el SHA publicado no cambió. Restaurar la lógica con otro commit y mostrar recuperación. No añadir `|| true`, `returnStatus` ignorado o `catchError` que permita desplegar.

## Ramas y colaboración

Con un solo job sobre `main`, solo los cambios que llegan a `main` disparan este pipeline. Para la demo coordinada, cada integrante hace pull, un commit y un push a `main`; espera la ejecución antes del siguiente. Un conflicto de Git se resuelve antes de subir. No usar force push.

Para validar también las ramas, crear Multibranch Pipeline -> Branch Sources -> Git -> URL del repositorio, Discover branches y un escaneo periódico de 1 minuto. El Jenkinsfile hace las validaciones en cada rama y publica solo `main`. Los triggers Poll SCM aparecen una vez ejecutado cada job de rama. El escaneo tampoco garantiza un build por cada commit acumulado. Un webhook es una alternativa por eventos que requiere una dirección alcanzable desde GitHub; `localhost` por sí solo no lo es.

## Uso cotidiano

```powershell
cd D:\Jenkins-Pract
docker compose up -d
docker compose ps
docker compose logs --tail 40 jenkins
docker compose stop
```

La primera vez se descarga Nginx. No eliminar jenkins_home: contiene también secretos y usuarios. Las direcciones están limitadas a 127.0.0.1; compañeros remotos no pueden abrir tu localhost, aunque sí puedan contribuir al repositorio.
