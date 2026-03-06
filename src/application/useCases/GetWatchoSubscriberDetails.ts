import { MockWatchoRepository } from "../../infrastructure/apiClients/MockWatchoRepository";
import { WatchoSubscriber } from "../../domain/watcho/WatchoTypes";

export class GetWatchoSubscriberDetailsUseCase {
  private repository: MockWatchoRepository;

  constructor() {
    this.repository = new MockWatchoRepository();
  }

  /**
   * Retrieves Watcho-specific account info.
   * Emulates GetsubscriberWatchoDetails.
   */
  async execute(vcNumber: string): Promise<WatchoSubscriber | null> {
    return this.repository.getSubscriber(vcNumber);
  }
}
