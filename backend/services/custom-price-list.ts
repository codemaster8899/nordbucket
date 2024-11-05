import {
  AdminPriceListPricesUpdateReq,
  CreatePriceListInput,
  PriceListService,
  TransactionBaseService,
  UpdatePriceListInput,
} from "@medusajs/medusa";
import { UpdateStrapiService } from "medusa-plugin-strapi-ts";

type InjectedDependencies = {
  priceListService: PriceListService;
  updateStrapiService: UpdateStrapiService;
};

class CustomPriceListService extends TransactionBaseService {
  protected priceListService_: PriceListService;
  protected updateStrapiService_: UpdateStrapiService;

  constructor(container: InjectedDependencies) {
    super(container);
    this.priceListService_ = container.priceListService;
    this.updateStrapiService_ = container.updateStrapiService;
  }
  async create(data: CreatePriceListInput) {
    try {
      await this.priceListService_.create(data);
      const [price] = data.prices;
      return await this.updateVariantsPrices(price);
    } catch (error) {
      console.error(error);
    }
  }
  async update(id: string, data: UpdatePriceListInput) {
    try {
      await this.priceListService_.update(id, data);
      const [price] = data.prices;
      return await this.updateVariantsPrices(price);
    } catch (error) {
      console.error(error);
    }
  }

  private async updateVariantsPrices(price: AdminPriceListPricesUpdateReq) {
    return await this.updateStrapiService_.updateProductVariantInStrapi(
      {
        prices: price.amount / 100,
        id: price.variant_id,
        currency_code: price.currency_code,
      },
      this.updateStrapiService_.defaultAuthInterface
    );
  }
}
export default CustomPriceListService;
