**Subatributos seleccionados:**
1. **Time behavior (TPR):** tiempos de carga y respuesta.
2. **Resource utilization (RU):** tamaño de bundle y consumo.


**Métricas y criterios (aceptación):**
- Home (TTI) ≤ **3 s** (4G simulado, Lighthouse).
- Navegación SPA ≤ **500 ms**.
- JMeter (Vercel): **promedio ≤ 5 s**, **p95 ≤ 6 s**, **errores = 0%**.
- Bundle inicial ≤ **250 KB** gzip; assets críticos ≤ **2 MB**.


**Cómo se medirá:** Lighthouse (local y Vercel), JMeter sobre la URL pública, inspección de build (`dist/`).