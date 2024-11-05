import { EntityManager, Like } from "typeorm"; // Import your model
import CustomIdRepository from "../repositories/custom-id"; // Import your repository
import { TransactionBaseService } from "@medusajs/medusa";

interface CustomIdServiceOptions {
  manager: EntityManager;
  customIdRepository: typeof CustomIdRepository; // Use the repository type
}

class CustomIdService extends TransactionBaseService {
  private customIdRepository_: typeof CustomIdRepository;

  constructor({ customIdRepository }: CustomIdServiceOptions) {
    super(arguments[0]);
    this.customIdRepository_ = customIdRepository;
  }

  async generateCustomId(
    customer_id: string,
    country: string
  ): Promise<string> {
    // Example logic for generating a custom ID
    return "generated_custom_id"; // Replace with your logic
  }

  async createCustomId(
    customer_id: string,
    country: string,
    custom_id: string
  ): Promise<any> {
    return await this.manager_.transaction(async (transactionManager) => {
      const customIdRepo = transactionManager.withRepository(
        this.customIdRepository_
      );

      const newRow = customIdRepo.create({
        custom_id,
        customer_id,
        country,
      });

      return await customIdRepo.save(newRow);
    });
  }

    async getItemsByCountryAndCustomIdPrefix(country: string, prefix: string): Promise<any> {
      const prefixLength = 4; // First 4 symbols filter
      const filteredPrefix = prefix.substring(0, prefixLength); // Ensure prefix is limited to 4 characters

      return await this.manager_.transaction(async (transactionManager) => {
        const customIdRepo = transactionManager.withRepository(this.customIdRepository_);

        return await customIdRepo.find({
          where: {
            country: country,
            custom_id: Like(`%${filteredPrefix}%`)
          },
        });
      });
    }

  async getByCustomerId(customer_id: string): Promise<any> {

    console.log("test113");
    
    return await this.manager_.transaction(async (transactionManager) => {
      const customIdRepo = transactionManager.withRepository(
        this.customIdRepository_
      );
      return await customIdRepo.findOne({
        where: {
          customer_id: customer_id,
        },
      });
    });
  }
}

export default CustomIdService;
