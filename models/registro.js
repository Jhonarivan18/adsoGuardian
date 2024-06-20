const db = require('../config/config');
const Registro = {};

Registro.getAll = (result) => {
    const sql = `
    SELECT
        id,
        name,
        lastname,
        telefono,
        tipoDocumento,
        documento,
        dispositivo,
        marca,
        color,
        serial,
        descripcion,
        created_at,
        updated_at
    FROM
        registros
    ORDER BY
        created_at
        DESC
    `;

    db.query (
        sql,
        (err, data) => {
            if (err) {
                console.log('Error (Registro.getAll):', err);
                result(err, null);
            }
            else {
                console.log('Id registro nuevo propietario: ', data);
                result(null, data);
            }
        }
    )
}

Registro.create = (registro, result) => {
    const sql = `
    INSERT INTO
         registros(
            name,
            lastname,
            telefono,
            tipoDocumento,
            documento,
            dispositivo,
            marca,
            color,
            serial,
            descripcion,
            created_at,
            updated_at
         )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query (
        sql,
        [
            registro.name,
            registro.lastname,
            registro.telefono,
            registro.tipoDocumento,
            registro.documento,
            registro.dispositivo,
            registro.marca,
            registro.color,
            registro.serial,
            registro.descripcion,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error (Registro.create):', err);
                result(err, null);
            }
            else {
                console.log('Id registro nuevo propietario: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )   
}

Registro.delete = (id, result) => {
    const sql = `
    DELETE FROM
        registros
    WHERE
        id = ?    
    `;
    db.query(
        sql,
        id,
        (err, res) => {
            if (err) {
                console.log('Error (Registro.delete):', err);
                result(err, null);
            }
            else {
                console.log('Id del registro fue eliminado: ', id);
                result(null,id);
            }
        }    
    )
}

Registro.update = (registro, result) => {
    const sql = `
    UPDATE
        registros
    SET
        name=?,
        lastname=?,
        telefono=?,
        tipoDocumento=?,
        documento=?,
        dispositivo=?,
        marca=?,
        color=?,
        serial=?,
        descripcion=?,
        updated_at=?
    WHERE
        id=?

    `;
    db.query(
        sql,
        [
            registro.name,
            registro.lastname,
            registro.telefono,
            registro.tipoDocumento,
            registro.documento,
            registro.dispositivo,
            registro.marca,
            registro.color,
            registro.serial,
            registro.descripcion,
            new Date(),
            registro.id

        ],
        (err, res) => {
            if (err) {
                console.log('Error:  (Registro.update', err);
                result(err, null);
            }
            else {
                console.log('Id del dispostivo registrado fue actualizado exitosamente: ', registro.id);
                result(null,registro.id);
            }
        }    
    )
}

////nuevo metodo de consultas documento y name


Registro.getBusqueda = (result) => {
    const sql = `
    SELECT
        id,
        name,
        lastname,
        telefono,
        tipoDocumento,
        documento,
        dispositivo,
        marca,
        color,
        serial,
        descripcion,
        created_at,
        updated_at
    FROM
        registros
    ORDER BY
        created_at
        DESC
    `;

    db.query (
        sql,
        (err, data) => {
            if (err) {
                console.log('Error (Registro.getAll):', err);
                result(err, null);
            }
            else {
                console.log('Id registro nuevo propietario: ', data);
                result(null, data);
            }
        }
    )
}

 




module.exports = Registro;
