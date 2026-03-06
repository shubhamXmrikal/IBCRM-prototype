import { MockAlacarteRepository } from "../../infrastructure/apiClients/MockAlacarteRepository";
import { SummerTicket } from "../../domain/package/AlacarteTypes";

export class GetSummerTicketUseCase {
  private repository: MockAlacarteRepository;

  constructor() {
    this.repository = new MockAlacarteRepository();
  }

  async execute(smsId: string): Promise<SummerTicket[]> {
    return this.repository.getSummerTickets(smsId);
  }
}
