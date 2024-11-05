import {
  MedusaRequest,
  MedusaResponse,
  UpdatePriceListInput,
} from "@medusajs/medusa";
import CustomPriceListService from "src/services/custom-price-list";
import { EntityManager } from "typeorm";

export async function POST(
  req: MedusaRequest<UpdatePriceListInput>,
  res: MedusaResponse
) {
  const customPriceListService: CustomPriceListService = req.scope.resolve(
    "customPriceListService"
  );
  const manager: EntityManager = req.scope.resolve("manager");

  const status = await manager.transaction(async (transactionManager) => {
    return await customPriceListService
      .withTransaction(transactionManager)
      .update(req.params.id, req.body);
  });

  res.status(200).json({ status });
}