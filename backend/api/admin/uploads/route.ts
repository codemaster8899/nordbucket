import {
  CreatePriceListInput,
  IAdminPostUploadsFileReq,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import CustomPriceListService from "src/services/custom-price-list";
import { EntityManager } from "typeorm";
import ff from "@medusajs/medusa/dist/api/routes/admin/uploads/create-upload.js";

export async function POST(
  req: MedusaRequest<CreatePriceListInput>,
  res: MedusaResponse
) {
  const fileService: CustomPriceListService = req.scope.resolve("fileService");
  const hh = new IAdminPostUploadsFileReq();
  // hh.
  return await ff(req, res);

  // const manager: EntityManager = req.scope.resolve("manager");

  // const status = await manager.transaction(async (transactionManager) => {
  //   return await customPriceListService
  //     .withTransaction(transactionManager)
  //     .create(req.body);
  // });

  return res.status(200).json({ status: 200 });
}
