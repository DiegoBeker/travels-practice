import httpStatus from "http-status";
import travelsServices from "../services/travels.services.js";

async function getPassengersTravels(req, res) {
    const { page, name } = req.query;

    if (isNaN(Number(page)) || Number(page) <= 0) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid page value' });

        try {
            const result = await travelsServices.getPassengersTravels(page, name);
            if (result.length > 100) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Too many results' });
            return res.send(result);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
}

export default { getPassengersTravels };