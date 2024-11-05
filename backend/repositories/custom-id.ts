import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CustomId } from "../models/customId";

const CustomIdRepository = dataSource.getRepository(CustomId);

export default CustomIdRepository;