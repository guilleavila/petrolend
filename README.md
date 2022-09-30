# Petrol-end

Bienvenidos a Petrol-end.
Nuestra aplicación busca la gasolineras  más cercanas a tu ubicación, permitiéndote elegir el combustible más barato.
Regístrate, añade tus vehículos, dinos qué combustible usas y ya estás listo para empezar a ahorrar.
Registramos todos tus repostajes para que puedas tener un historial preciso de tus gastos y ahorros.


### RUTAS


#### HOME

```http
/ 
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | mapa de la home |   Log       |
| `POST` | `/` | res.json de gasolineras |   Log       |
| `GET` | `/?fuel={typeFuel}` | mapa con gasolineras |   Log       |

#### AUTH

```http
/ 
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/registro` | renderizar vista | Todos         |
| `POST` | `/registro` | enviar formulario |   Todos  |
| `GET` | `/iniciar-sesion` | renderizar vista |     Todos     |
| `POST` | `/iniciar-sesion` | enviar formulario |   Registrados      |
| `POST` | `/cerrar-sesion` | enviar formulario |      Log   |


#### PERFIL

```http
/perfil
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | renderiza el perfil del usuario |     Log     |



#### ADMIN

```http
/admin
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | renderiza usuarios y vehiculos (global) |    ADMIN      |
| `POST` | `/eliminar/:user_id/delete` | elimina usuario |    ADMIN       |



#### Vehículos

```http
/vehiculos
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | listado de vehículos |   Log       |
| `GET` | `/crear` | renderiza formulario |     Log     |
| `POST` | `/crear` | envía formulario |       Log   |
| `GET` | `/editar` | renderiza formulario |    Log      |
| `POST` | `/editar` | envía formulario |      Log    |
| `POST` | `/eliminar` |envía formulario |   Log       |


#### GASTOS

```http
/gastos
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | renderiza listado gastos |    Log      |
| `GET` | `/crear` | renderiza formulario |    Log      |
| `POST` | `/crear` | envía formulario |    Log      |
| `GET` | `/editar/:id` | renderiza edicion |    Log      |
| `POST` | `/editar/:id` | envía formulario |    Log      |
| `POST` | `/eliminar-gasto/:id` | envía formulario |    Log      |


## Authors
  
- [@guilleavila](https://www.github.com/guilleavila) 
- [@riiGalaxy](https://www.github.com/riiGalaxy)


## 🛠 Skills
Javascript, Express, MongoDB, Node, Mongoose, Api's, HTML, CSS...

## 🚀 About Us
Somos Guillermo Avila y Ricardo Molpeceres estudiantes del bootcamp de desarrollo Web en Ironhack Madrid.
Este es nuestro proyecto para el modulo de back-end.


## Demo

Próximamente disponible.
