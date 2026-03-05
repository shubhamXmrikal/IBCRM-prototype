import { MockVerificationRepository } from "../../infrastructure/apiClients/MockVerificationRepository";

export class UpdateContactDetailsUseCase {
  private repository: MockVerificationRepository;

  constructor() {
    this.repository = new MockVerificationRepository();
  }

  /**
   * Validates uniqueness of an email or mobile across the entire subscriber base.
   * Mirrors `UpdateCustomerVerificationDetails` mixed with `IsEmailExistsWithSubscriber`.
   * @param vcNumber The VC updating details
   * @param newEmail New email to set
   * @param newMobile New mobile to set
   */
  async execute(
    vcNumber: string,
    newEmail?: string,
    newMobile?: string,
  ): Promise<void> {
    if (newEmail) {
      const isUniqueEmail = await this.repository.isEmailUnique(
        newEmail,
        vcNumber,
      );
      if (!isUniqueEmail) {
        throw new Error(
          "This email is already registered to another subscriber.",
        );
      }
      // Logic would then proceed to update customer repo (omitted/mocked)
    }

    if (newMobile) {
      const isUniqueMobile = await this.repository.isMobileUnique(
        newMobile,
        vcNumber,
      );
      if (!isUniqueMobile) {
        throw new Error(
          "This mobile number is already registered to another subscriber.",
        );
      }
      // Update logic
    }
  }
}
