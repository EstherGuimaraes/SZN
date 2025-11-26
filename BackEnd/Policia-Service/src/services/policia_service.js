import denuncias from "../models/denuncia.model.js";

export function getAll() {
    return denuncias;
}

export function getById(id) {
    return denuncias.find(d => d.id === id);
}