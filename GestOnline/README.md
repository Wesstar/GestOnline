# GestOnline - Sistema de Gestión de Inventarios para PYMES

![Versión](https://img.shields.io/badge/versión-1.0-blue)
![Estado](https://img.shields.io/badge/estado-Prototipo%20Funcional-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)

## 📌 Descripción

**GestOnline** es una plataforma web diseñada para la gestión y optimización de inventarios en Pequeñas y Medianas Empresas (PYMES) del sector comercial de **Pitalito, Huila, Colombia**.

El sistema integra modelos matemáticos de control de stock para mejorar la toma de decisiones:

| Modelo | Descripción |
|--------|-------------|
| **EOQ** | Lote Económico de Pedido - Cantidad óptima a pedir |
| **ROP** | Punto de Reorden - Cuándo hacer un nuevo pedido |
| **ABC** | Clasificación Pareto 80/20 - Productos por valor |
| **Alertas** | Stock bajo - Notificaciones automáticas |
| **Dashboard** | KPIs y gráficos en tiempo real |

---

## Objetivo

> Desarrollar un sistema de gestión y optimización de inventarios mediante la integración de modelos matemáticos de control de stock (EOQ, punto de reorden y análisis ABC) para mejorar la toma de decisiones y reducir pérdidas operativas en PYMES del sector comercial de Pitalito, Huila.

---

## 👥 Autores

| **Yiner Julian Ruiz Ñañez** |  Investigador |
| **Deibin Andrey Rojas Tellez** | Desarrollador / Investigador |

**Tutor:** Daniel Andrés Guzmán Arevalo  
**Institución:** Universidad Nacional Abierta y a Distancia (UNAD) - Ingeniería de Sistemas

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura |
| CSS3 | Estilos |
| Bootstrap 5 | Framework responsivo |
| JavaScript | Lógica y cálculos |
| Chart.js | Gráficos estadísticos |
| SweetAlert2 | Alertas y notificaciones |

---

### Características TRL:
- ✅ Prototipo funcional completo
- ✅ Validación en entorno simulado de producción
- ✅ Integración de todos los componentes del sistema
- ✅ Pruebas de usuario en entorno controlado
- ✅ Documentación técnica completa

## 🚀 Funcionalidades Implementadas

### Core del Sistema
- Gestión completa de productos (CRUD)
- Control de inventario en tiempo real
- Registro de movimientos (entradas/salidas)
- Dashboard con métricas y gráficos interactivos
- Sistema de alertas de stock bajo

### Módulos de Optimización
- **EOQ** - Cálculo de lote económico
- **ROP** - Punto de reorden con stock de seguridad
- **Clasificación ABC** - Gestión por valor de inventario
- **Rotación de inventario** - Análisis de eficiencia

### Características Técnicas
- Frontend vanilla JavaScript sin dependencias pesadas
- Visualización de datos
- Diseño responsive (Desktop/Tablet/Mobile)
- Sistema de reportes descargables (CSV/TXT)


ADMINISTRADOR (Acceso total)
├── Gestionar Productos (CRUD)
├── Gestionar Proveedores (CRUD)
├── Gestionar Usuarios (CRUD)
├── Calcular EOQ
├── Calcular Punto de Reorden
├── Clasificación ABC
├── Generar Reportes
└── Auditar Sistema

ALMACENISTA (Gestión de inventario)
├── Registrar Entrada de Productos
├── Registrar Salida de Productos
├── Consultar Stock
├── Ver Alertas de Stock Bajo
└── Ver Dashboard

AUDITOR (Solo consulta)
├── Consultar Productos
├── Consultar Stock
├── Ver Clasificación ABC
├── Ver Alertas
├── Ver Dashboard
├── Generar Reportes
└── Ver Auditoría