import travelsRepository from "../repositories/travels.repository.js";

async function getPassengersTravels(page, name) {
    const result = await travelsRepository.getPassengersTravels(page,name);
    return result;
}

export default { getPassengersTravels };