# Voltio Store: guía de las ocho entregas del equipo

Este material acompaña la base de Next.js, Jest y Jenkins. No es evidencia de ejecuciones reales: cada integrante debe ejecutar sus comprobaciones y registrar los resultados de Jenkins durante la práctica.

## Distribución: dos agregaciones por integrante

| Integrante | Entrega | Carpeta del kit | Archivos de lógica y prueba |
| --- | --- | --- | --- |
| 1 | Búsqueda por nombre | `01-busqueda` | `src/features/search.ts`, `tests/search.test.ts` |
| 1 | Filtro por categoría | `02-categorias` | `src/features/category.ts`, `tests/category.test.ts` |
| 2 | Ordenamiento por precio | `03-ordenamiento` | `src/features/sorting.ts`, `tests/sorting.test.ts` |
| 2 | Solo productos disponibles | `04-disponibilidad` | `src/features/availability.ts`, `tests/availability.test.ts` |
| 3 | Favoritos | `05-favoritos` | `src/features/favorites.ts`, `tests/favorites.test.ts` |
| 3 | Cantidades y límite de stock | `06-cantidades` | `src/features/quantity.ts`, `tests/quantity.test.ts` |
| 4 | Cupón VOLTIO10 | `07-cupones` | `src/features/coupon.ts`, `tests/coupon.test.ts` |
| 4 | Envío gratis desde 300 Bs | `08-envio` | `src/features/shipping.ts`, `tests/shipping.test.ts` |

Los kits 01, 02, 05, 06, 07 y 08 incluyen además `tests/ui-<modulo>.test.tsx`. Copia también ese archivo para verificar la interacción visible del usuario. Cada entrega debe incluir sus pruebas en el mismo commit que su implementación.

## Dónde están los archivos

- Código base: `D:\Jenkins-Pract\Web-Jenk-Store`.
- Material aparte: `D:\Jenkins-Pract\material-equipo`.
- Código que se agregará después: `material-equipo\agregaciones\01-busqueda` a `08-envio`.
- El código base no incluye las implementaciones futuras. Sus módulos están desactivados con `enabled = false`; al reemplazar un módulo por su versión del kit, su control aparece en la interfaz porque la base ya está conectada a ese módulo.

No copies los ocho kits de una vez al repositorio base ni agregues la carpeta material-equipo completa a Git: eso eliminaría la evolución por commits que se quiere demostrar. Comparte el material con los compañeros aparte, por ejemplo como ZIP.

## Flujo recomendado para esta práctica: main, una entrega por turno

Usaremos entregas coordinadas directamente a `main` para que el trabajo principal de Jenkins procese cada contribución. Es una simplificación para la demostración; un proyecto con revisión de código puede usar ramas, pull requests y Multibranch Pipeline.

**Regla del equipo: solo una persona hace push a la vez. Esperen a que termine Jenkins antes del siguiente push.** Poll SCM comprueba el repositorio aproximadamente cada minuto. Si reciben varios commits entre revisiones, Jenkins puede agruparlos en una sola ejecución; no es una garantía de una ejecución por commit. Para obtener ocho ejecuciones distinguibles, suban cada entrega y esperen su resultado antes de continuar.

No usen saltos de pruebas, `[skip ci]`, `--no-verify` ni `push --force` para resolver un fallo. Un error en Jest o compilación debe bloquear el despliegue.

### Preparación de cada integrante

Cada persona clona el repositorio en su propia computadora/carpeta. No se comparte una carpeta de trabajo con cambios sin guardar. Solo la computadora que aloja Jenkins necesita `jenkins_home`, Docker Compose y el servidor local de despliegue.

```powershell
git clone https://github.com/Sunner-01/Web-Jenk-Store.git
cd Web-Jenk-Store
git switch main
npm.cmd ci
git config user.name "Tu nombre"
git config user.email "Tu correo asociado a GitHub"
```

Estas dos opciones `git config` sin `--global` se aplican a esta copia del repositorio. No uses la identidad de otro integrante: el commit debe permitir reconocer su autoría. El dueño del repositorio debe dar acceso de colaboración a los otros tres antes de que intenten publicar.

### Ejemplo completo: integrante 1, búsqueda

1. Acuerden que es tu turno y actualiza tu copia:

```powershell
git switch main
git pull --ff-only origin main
```

2. Copia desde tu kit `01-busqueda` los archivos preservando las rutas:

```text
src/features/search.ts       → Web-Jenk-Store/src/features/search.ts
tests/search.test.ts         → Web-Jenk-Store/tests/search.test.ts
tests/ui-search.test.tsx     → Web-Jenk-Store/tests/ui-search.test.tsx
```

El primer archivo reemplaza el módulo base; los dos de pruebas se agregan. No pegues el código dentro de otro componente ni cambies el `Jenkinsfile` para entregar esta función.

3. Comprueba todo antes de publicar:

```powershell
npm.cmd ci
npm.cmd run check
git diff
git status --short
```

`npm ci` instala exactamente lo definido en package-lock.json. `check` ejecuta lint, tipos, Jest y compilación. Para ver solo tus pruebas puedes ejecutar `npm.cmd test -- search`, pero eso no sustituye la comprobación completa.

4. Agrega solo tus rutas, crea tu commit y actualiza antes del push:

```powershell
git add src/features/search.ts tests/search.test.ts tests/ui-search.test.tsx
git commit -m "feat: agregar búsqueda por nombre"
git pull --rebase origin main
```

Si la actualización incorporó cambios de otro compañero, vuelve a ejecutar `npm.cmd run check`. Si hay conflictos, detente y revísalos con el autor del cambio; para abandonar una resolución incompleta usa `git rebase --abort`. No publiques una mezcla que no has comprobado.

5. Publica y observa Jenkins:

```powershell
git push origin main
git rev-parse --short HEAD
```

Esperen a que Jenkins detecte el cambio, comprueben que la revisión mostrada en consola corresponde a ese commit y registren el número de ejecución. Si es la primera vez que se configura el trabajo, normalmente se ejecuta manualmente una vez para que el Jenkinsfile registre el disparador de Poll SCM; después la detección es automática.

6. Comprueba la tienda desplegada, toma evidencia y avisa al siguiente integrante. Repite con tu segunda entrega en otro commit. Cada uno usa el nombre de módulo y los archivos de su propia fila. Para módulos sin prueba UI, agrega solo las dos rutas de esa fila.

### Si prefieren ramas y pull requests

El README de cada kit también presenta una variante con rama y pull request. Un trabajo que observa únicamente main **no ejecuta cada push de las ramas personales**: se ejecuta al llegar su cambio a main. Para pruebas por rama, configuren Multibranch Pipeline y descubrimiento periódico/webhook. El despliegue compartido debe limitarse a main para que distintas ramas no se sobrescriban. La guía de esta sección usa main por turnos para que la demostración sea sencilla y verificable.

## Qué mostrar por cada entrega

| Evidencia | Qué debe demostrar |
| --- | --- |
| Commit | Autor real, descripción y archivos de la agregación |
| Ejecución de Jenkins | Revisión de Git y etapas automáticas |
| Reporte de pruebas | Casos ejecutados, resultado y error si existe |
| Sitio desplegado | Control nuevo y comportamiento observable |
| Caso fallido | Prueba roja, despliegue omitido y versión anterior funcionando |

Guarden las capturas con un nombre que incluya integrante, entrega, commit y ejecución. No afirmen éxito del servidor Jenkins basándose solo en `npm run check` local; son verificaciones distintas.

## Demostración sugerida de 16 minutos

| Tiempo | Responsable sugerido | Qué mostrar |
| --- | --- | --- |
| 0–2 min | Integrante 1 | Problema que resuelve CI/CD, repositorio y tienda |
| 2–5 min | Integrante 2 | Jenkins en Docker, Jenkinsfile, Node24, stages y Poll SCM |
| 5–9 min | Integrante 3 | Aplicar una agregación preparada, commit propio y push; ver ejecución y nueva UI |
| 9–13 min | Integrante 4 | Introducir error con pruebas correctas, push, fallo, despliegue bloqueado y corrección |
| 13–16 min | Todos | Preguntas y debate |

Las ocho entregas pueden realizarse antes de exponer y conservar su historial/evidencias. No intenten escribir ocho funciones en vivo dentro de ocho minutos; para la demo enseñen un éxito y un fallo completos. Ensayen con la conexión y equipo de clase, midan npm ci/build y dejen margen para el minuto de Poll SCM.

## Fallo deliberado y reparación

Después de haber aplicado y desplegado el cupón correctamente:

1. Mantén sus pruebas sin cambiar y modifica en `src/features/coupon.ts` el factor `0.10` por `0.20`.
2. Crea un commit de error y haz push a main cuando el equipo haya acordado el turno.
3. La prueba espera descuento 10 para subtotal 100; la implementación defectuosa devolverá 20. Jenkins debe marcar fallo y omitir el despliegue. Muestra que la tienda publicada conserva el cálculo anterior.
4. Corrige el factor a `0.10`, ejecuta `npm.cmd run check`, crea otro commit y haz push. Otra opción es revertir únicamente el commit defectuoso:

```powershell
git revert SHA_DEL_COMMIT_DEFECTUOSO
git push origin main
```

Nunca reviertas el commit de la función buena por accidente. Revert conserva la historia compartida; no uses reset --hard ni force-push.

Alternativa: en búsqueda, sustituye `includes(needle)` por `startsWith(needle)`. La prueba con headphones debe seguir esperando Aurora Headphones y detectará el error. No modifiquen el resultado esperado para hacer pasar código incorrecto.

## Alcance real de la tienda

Los productos, precios y existencias son ficticios. No existen pagos, pedidos reales, autenticación de compradores ni base de datos. El carrito y favoritos viven en memoria y se reinician al recargar la página; esto permite concentrar la práctica en CI/CD. La base ya tiene catálogo y carrito sencillo; cada módulo agrega un comportamiento real y su control aparece al habilitarlo.

La tienda publicada por Jenkins es una compilación estática para la demostración local; `npm run dev` es otra instancia para desarrollo. Si una prueba falla, el directorio publicado no debe actualizarse. Un fallo durante la copia del despliegue tiene otros riesgos: este montaje académico no sustituye un despliegue transaccional de producción.