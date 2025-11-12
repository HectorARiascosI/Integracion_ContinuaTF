# Guía de Contribución

Gracias por contribuir al proyecto. Este documento resume el proceso para proponer cambios sin romper el código.

## Flujo básico
- Crear rama desde `main`.
- Hacer cambios pequeños y con propósito.
- Ejecutar localmente: `npm run lint`, `npm run type-check`, `npm test`.
- Abrir Pull Request con descripción clara.

## Convenciones de commits
Usamos un formato inspirado en Conventional Commits:
- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `docs:` documentación
- `test:` pruebas unitarias
- `refactor:` refactorización sin cambios funcionales
- `chore:` tareas de mantenimiento

Ejemplo: `feat(auth): agrega 2FA en login`

## Pruebas
- Asegúrate de cubrir casos borde y comportamiento esperado.
- En CI usamos `npm run test:ci`.

## Estilo de código
- TypeScript estricto.
- Eslint + Prettier.
- Accesibilidad: agregar `aria-*` donde aplique.
