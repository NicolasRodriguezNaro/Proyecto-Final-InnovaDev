import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        "nombre": {type: String, required: true},
        "apellido": {type: String, required: true},
        "identificacion": {type: String, required: true, unique: true, trim: true},
        "correo": {type: String, required: true, unique: true, trim: true},
        "contraseña": {type: String, required: true },
        "rol": {type: String, enum: ['estudiante', 'docente', 'coordinador'], required: true },
        "telefono": {type: String, required: true},
        "fecha_nacimiento": {type: String},
        "grado_escolar": {
            type: String,
            required: function() {
                return this.role === 'student';
            }
        },
        "institucion": {type: String, required: true},
        "activo": {type: Boolean, default: true}
    }
);

export default mongoose.model('usuarios', usuarioSchema);