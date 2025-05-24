import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        area: { type: String, required: true },
        objetivos: { type: String, required: true },
        cronograma: { type: String },
        presupuesto: { type: String },
        institucion: { type: String },
        observaciones: { type: String },
        docenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
        integrantes: [
            {
                nombres: String,
                apellidos: String,
                identificacion: String,
                grado_escolar: String
            }
        ],
        estado: {
            type: String,
            enum: ['Formulación', 'Evaluación', 'Activo', 'Inactivo', 'Finalizado'],
            default: 'Formulación'
        },
        historialEstados: [
            {
                fecha: { type: Date, default: Date.now },
                estado: String,
                observacion: String
            }
        ]
    }, { timestamps: true }
);

export default mongoose.model('proyectos', proyectoSchema); //el primer parametro es el nombre de la coleccion