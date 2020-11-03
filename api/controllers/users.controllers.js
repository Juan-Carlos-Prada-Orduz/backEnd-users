const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getUsers = async (request, response) => {
  try {
    const sql =
      "SELECT * FROM usuarios";

    let responseDB = await _servicePg.execute(sql);
    let rowCount = response.rowCount;
    let rows = responseDB.rows
    let responseJSON = {}
    responseJSON.ok = true
    responseJSON.message = 'usuarios:'
    responseJSON.info = rows
    responseJSON.metainfo = {total : rowCount}
    response.send(responseJSON);
      
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al mostrar los usuarios";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveUser = async (request, response) => {
  try {
    let sql =
      "INSERT INTO public.usuarios (id, nombre, apellido, clave, edad, correo, pais_residencial, ciudad, tipo_usuario, identificacion, tipo_identificacion) ";
    sql += " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";
    let body = request.body;
    let values = [
      body.id,
      body.nombre,
      body.apellido,
      body.clave,
      body.edad,
      body.correo,
      body.pais_residencial,
      body.ciudad,
      body.tipo_usuario,
      body.identificacion,
      body.tipo_identificacion,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "usuario creado";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al crear el usuario";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateUser = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "  UPDATE public.usuarios SET id=$1, nombre=$2, apellido=$3, clave=$4, edad=$5, correo=$6, pais_residencial=$7, ciudad=$8, tipo_usuario=$9, identificacion=$10, tipo_identificacion=$11;";
    let body = request.body;
    let values = [
      body.identification_type,
      body.firstname,
      body.lastname,
      body.email,
      body.phone,
      body.rol,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Usuario actualizado";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al actualizar usuario";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteUser = async (request, response) => {
  try {
    const sql = "DELETE  FROM usuarios WHERE id=$1";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Usuario eliminado";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error al eliminar usuario";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getUsers, saveUser, updateUser, deleteUser };