import {
  cpSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const source = resolve("out");
const target = process.env.DEPLOY_DIR;
if (!target)
  throw new Error(
    "Falta DEPLOY_DIR. Este comando lo ejecuta Jenkins con el directorio compartido de despliegue.",
  );
if (!existsSync(resolve(source, "index.html")))
  throw new Error("No existe out/index.html. Ejecuta npm run build primero.");
const revision = execFileSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const metadata = {
  commit: revision,
  build: process.env.BUILD_NUMBER ?? "manual",
  date: new Date().toISOString(),
};
writeFileSync(
  resolve(source, "deployment.json"),
  JSON.stringify(metadata, null, 2),
);
mkdirSync(target, { recursive: true });
// Copia únicamente tras pasar pruebas y compilación. Los assets anteriores se conservan
// para pestañas ya abiertas. Es un despliegue de laboratorio, sin garantía de atomicidad.
cpSync(source, target, { recursive: true });
if (
  readFileSync(resolve(target, "index.html"), "utf8") !==
  readFileSync(resolve(source, "index.html"), "utf8")
) {
  throw new Error("La comprobación del HTML publicado falló.");
}
console.log(
  `Desplegado commit ${revision.slice(0, 8)} · build ${metadata.build}`,
);
