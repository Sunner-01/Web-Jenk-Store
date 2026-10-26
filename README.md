# Voltio Store

Tienda de tecnología de demostración construida con Next.js, React, TypeScript y Jest. Proyecto académico para mostrar integración y despliegue continuos con Jenkins. Datos y precios ficticios; no procesa pagos ni crea pedidos reales.

## Empezar

Requisitos: Node.js 24 recomendado (mínimo 22.14), npm y Git. Jenkins usa la herramienta `node24`.

```powershell
npm ci
npm run dev
```

Abrir http://localhost:3000. En PowerShell, si una política bloquea npm.ps1, usar `npm.cmd`.

```powershell
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

`npm ci` usa exactamente el lockfile. `npm run build` genera la exportación estática en `out/`. No usar `next start` para esta exportación; Nginx sirve los archivos. Las fuentes e imágenes se incluyen localmente, de modo que la compilación no depende de Google Fonts o Unsplash.

## Qué incluye la versión base

- Portada adaptable a móvil, catálogo de ocho productos y carrito funcional de una unidad por producto.
- Stock, precios, subtotales, eliminación de productos y revisión simulada del pedido.
- Pruebas de lógica y de interacción con React Testing Library.
- Pipeline con reportes JUnit, cobertura, control de tipos, compilación y despliegue.
- Ocho puntos de extensión desactivados, preparados para dos contribuciones por integrante.

El carrito y los favoritos usan memoria del navegador: se reinician al recargar. No hay backend, base de datos, autenticación ni procesamiento real de pedidos. Las fotos son ilustrativas de las categorías, no representan marcas/modelos comercializados por Voltio.

## Estructura

```text
src/app/                 Página, layout y estilos
src/components/store.tsx Interfaz y conexión de las ocho extensiones
src/data/products.ts     Catálogo ficticio
src/lib/cart.ts          Reglas comunes del carrito
src/features/            Ocho extensiones: versión base desactivada
tests/                   Pruebas de la base
Jenkinsfile              Pipeline versionado junto al proyecto
scripts/deploy.mjs       Publicación del build validado
infra/                   Ejemplo Compose y configuración de Nginx
docs/                    Guías de Jenkins y trabajo del equipo
```

## Trabajo en equipo

Consultar [las ocho agregaciones](docs/AGREGACIONES.md). El código para agregarlas se entrega aparte en `D:\Jenkins-Pract\material-equipo\agregaciones`, para que no forme parte de la versión inicial. Cada carpeta contiene módulos completos de reemplazo, pruebas e instrucciones. No copiar las ocho a la vez durante la exposición.

El historial debe representar contribuciones reales: cada persona revisa, aplica, prueba y hace sus commits desde su propia cuenta. No incluir `jenkins_home`, credenciales, `node_modules`, `out` o cobertura en Git.

## CI/CD

Seguir [la configuración de Jenkins](docs/JENKINS.md). El pipeline descarga el código, instala dependencias, valida calidad y tipos, ejecuta Jest, compila y publica. Un test con error devuelve código distinto de cero y detiene las etapas posteriores. Los resultados se publican aun cuando fallen las pruebas.

Por defecto el job revisa `main` cada minuto. Ejecutar una vez manualmente registra el trigger del Jenkinsfile. Poll SCM detecta cambios pendientes, no garantiza una ejecución por cada commit si llegan varios juntos. Para evidenciar ocho ejecuciones: un push, esperar el resultado y recién después el siguiente. Las ramas de otros nombres requieren Multibranch o un job dedicado; no se validan por tener únicamente un job conectado a `main`.

El despliegue es **local de laboratorio**: exportación estática copiada a un directorio compartido con Nginx. No es una publicación a Internet. Una falla previa al despliegue conserva la versión anterior. La copia no es transaccional ni ofrece rollback automático ante un error durante la copia. Los assets de versiones anteriores se conservan para pestañas abiertas; limpiar periódicamente fuera de la demo.

Direcciones: Jenkins http://localhost:8081 · tienda desplegada http://localhost:3001 · desarrollo http://localhost:3000. `http://localhost:3001/deployment.json` permite comparar el SHA publicado con el commit de Jenkins.

## Referencias

- [Next.js: exportación estática](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js y Jest](https://nextjs.org/docs/app/guides/testing/jest)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Imágenes y procedencia](public/ASSETS.md)
