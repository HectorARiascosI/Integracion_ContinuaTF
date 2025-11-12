# Checklist de Aceptación


| ID | Criterio | ¿Cumple? | Evidencia/Observaciones |
|---:|---|:---:|---|
| 1 | Sitio despliega en Vercel sin errores visibles | | URL + captura |
| 2 | Carga inicial ≤ 3 s (Home) | | Lighthouse/Video |
| 3 | Endpoints devuelven datos correctos (Postman) | | Runner OK |
| 6 | Navegación fluida (sin bloqueos) | | Grabación corta |
| 7 | Sin errores en consola | | Captura DevTools |
| 8 | Unit tests pasan en pipeline | | Actions run |
| 9 | Integración Postman exitosa | | Export de tests |
| 10 | JMeter ≤ 5 s promedio (p95 ≤ 6 s) | | Reporte percentiles |