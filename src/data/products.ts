import type { Product } from "../types";

/** Catálogo ficticio para la demostración académica. Precios en bolivianos. */
export const products: Product[] = [
  {
    id: "aurora",
    name: "Aurora Headphones",
    category: "Audio",
    price: 420,
    stock: 8,
    image: "/products/headphones.jpg",
    description:
      "Auriculares inalámbricos de diseño envolvente para acompañar tus ideas.",
    color: "Arena",
  },
  {
    id: "pulse",
    name: "Pulse Keyboard",
    category: "Periféricos",
    price: 280,
    stock: 12,
    image: "/products/keyboard.jpg",
    description:
      "Teclado mecánico compacto con tacto preciso y espacio para crear.",
    color: "Marfil",
  },
  {
    id: "orbit",
    name: "Orbit Mouse",
    category: "Periféricos",
    price: 160,
    stock: 15,
    image: "/products/mouse.jpg",
    description:
      "Ratón inalámbrico ligero que se adapta a tu ritmo de trabajo.",
    color: "Grafito",
  },
  {
    id: "echo",
    name: "Echo Speaker",
    category: "Audio",
    price: 350,
    stock: 6,
    image: "/products/speaker.jpg",
    description:
      "Altavoz portátil de sonido equilibrado para cualquier rincón.",
    color: "Oliva",
  },
  {
    id: "vista",
    name: "Vista Monitor",
    category: "Pantallas",
    price: 1450,
    stock: 4,
    image: "/products/monitor.jpg",
    description:
      "Monitor de 27 pulgadas para ver tus proyectos con otra perspectiva.",
    color: "Plata",
  },
  {
    id: "focus",
    name: "Focus Webcam",
    category: "Accesorios",
    price: 240,
    stock: 0,
    image: "/products/webcam.jpg",
    description:
      "Cámara de escritorio para conversaciones y presentaciones claras.",
    color: "Negro",
  },
  {
    id: "link",
    name: "Link USB-C Hub",
    category: "Accesorios",
    price: 190,
    stock: 10,
    image: "/products/hub.jpg",
    description:
      "Concentrador compacto para conectar tus herramientas esenciales.",
    color: "Titanio",
  },
  {
    id: "air",
    name: "Air Earbuds",
    category: "Audio",
    price: 320,
    stock: 7,
    image: "/products/earbuds.jpg",
    description:
      "Auriculares de bolsillo con estuche de carga para llevar tu música.",
    color: "Blanco",
  },
];
