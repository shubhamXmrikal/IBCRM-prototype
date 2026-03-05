import {
  Interaction,
  ServiceRequest,
} from "../../domain/interaction/Interaction";
import {
  mockInteractions,
  mockServiceRequests,
} from "../mockData/interactionMock";

export class MockInteractionRepository {
  async getHistoryByCustomerId(
    customerId: string,
  ): Promise<{
    interactions: Interaction[];
    serviceRequests: ServiceRequest[];
  }> {
    // Simulate DB query
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (customerId === "33659209") {
      return {
        interactions: mockInteractions,
        serviceRequests: mockServiceRequests,
      };
    }

    return { interactions: [], serviceRequests: [] };
  }
}
