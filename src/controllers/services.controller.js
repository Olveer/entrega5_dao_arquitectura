import servicesService from "../services/services.service.js";

export const getServices = async (req, res) => {
    const { category, available } = req.query;
    const services = await servicesService.getServices({ category, available });
    res.status(200).json(services);
};

export const getServiceById = async (req, res) => {
    const { sid } = req.params;
    const service = await servicesService.getServiceById(sid);
    res.status(200).json(service);
};

export const createService = async (req, res) => {
    const newService = await servicesService.createService(req.body ?? {});
    res.status(201).json(newService);
};

export const updateService = async (req, res) => {
    const { sid } = req.params;
    const updated = await servicesService.updateService(sid, req.body ?? {});
    res.status(200).json(updated);
};

export const deleteService = async (req, res) => {
    const { sid } = req.params;
    const deleted = await servicesService.deleteService(sid);
    res.status(200).json({ message: "Servicio eliminado", service: deleted });
};