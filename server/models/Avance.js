import mongoose from 'mongoose';

const avanceSchema = new mongoose.Schema({
  proyectoId: { type: mongoose.Schema.Types.ObjectId, ref: 'proyectos', required: true },
  fecha: { type: Date, default: Date.now },
  descripcion: { type: String, required: true },
  documentos: [{ type: String }],  // URLs a archivos PDF, etc.
  fotos: [{ type: String }]         // URLs a imágenes
}, { timestamps: true });

export default mongoose.model('avances', avanceSchema);