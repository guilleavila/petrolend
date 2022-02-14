
# Petrol-end

Aplicación para comparar precios de gasolineras.




### RUTAS

#### AUTH

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/registro` | renderizar vista | Todos         |
| `POST` | `/registro` | enviar formulario |   Todos  |
| `GET` | `/iniciar-sesion` | renderizar vista |     Todos     |
| `POST` | `/iniciar-sesion` | enviar formulario |   Registrados      |
| `POST` | `/cerrar-sesion` | enviar formulario |      Log   |



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



#### HOME

```http
/ 
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | mapa de la home |   Log       |



#### GASTOS

```http
/gastos
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/crear` | renderiza formulario |    Log      |
| `POST` | `/crear` | envía formulario |    Log      |


#### PERFIL

```http
/perfil
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/:user_id` | renderiza el perfil del usuario |     Log     |
| `GET` | `/:user_id/editar` | renderiza formulario |     Log     |
| `POST` | `/:user_id/editar` | envía el formulario |    Log      |
| `GET` | `/gastos` | renderiza gastos y formulario |     Log     |
| `POST` | `/gastos` | envía formulario (axios) |       Log   |
| `POST` | `/gastos/eliminar` | elimina gasto(axios) |     Log     |
| `GET` | `/gastos/:gasto_id/editar` | renderiza formulario |      Log    |
| `POST` | `/gastos/:gasto_id/editar` | envía formulario |    Log      |


#### ADMIN

```http
/admin
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/datos` | renderiza usuarios y gastos (global) |    ADMIN      |
| `GET` | `/datos/gastos` | renderiza gastos (todos) |    ADMIN       |
| `GET` | `/datos/usuarios` | renderiza usuarios (todos) |     ADMIN      |
| `GET` | `/datos/usuarios/:user_id` | renderiza detalles de un usuario |       ADMIN    |
| `POST` | `/datos/usuarios/:user_id/delete` | elimina usuario |    ADMIN       |
