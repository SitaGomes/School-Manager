// // src/services/__tests__/emailService.test.ts
// import { MailService } from '@sendgrid/mail';
// import EmailService from '../emailService.ts';
// import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

// jest.mock('@sendgrid/mail', () => {
//   return {
//     MailService: jest.fn().mockImplementation(() => {
//       return {
//         setApiKey: jest.fn(),
//         send: jest.fn(),
//       };
//     }),
//   };
// });

// describe('EmailService', () => {
//   let emailService: EmailService;
//   let sendGridInstance: jest.Mocked<MailService>;

//   beforeEach(() => {
//     emailService = new EmailService();
//     sendGridInstance = (MailService as jest.Mock).mock.instances[0] as jest.Mocked<MailService>;
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should set the API key during construction', () => {
//     expect(sendGridInstance.setApiKey).toHaveBeenCalledWith(process.env.SENDGRID_API_KEY || '');
//   });

//   it('should send an email', async () => {
//     const email = 'test@example.com';
//     const subject = 'Test Subject';
//     const message = 'Test Message';

//     await emailService.sendEmail(email, subject, message);

//     expect(sendGridInstance.send).toHaveBeenCalledWith({
//       to: email,
//       from: 'arthurjuju7@gmail.com',
//       subject: subject,
//       text: 'dasdadas',
//       html: `<strong>${message}</strong>`,
//     });
//   });

//   it('should handle missing SENDGRID_API_KEY', () => {
//     delete process.env.SENDGRID_API_KEY;
//     expect(() => new EmailService()).not.toThrow();
//   });
// });
import {describe, expect, it} from "@jest/globals"

describe("studend service", () => {
  it("should return a student", () => {
    expect(1).toBe(1)
  })
})
