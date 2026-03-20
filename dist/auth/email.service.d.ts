export declare class EmailService {
    private transporter;
    private readonly logger;
    constructor();
    private getBaseTemplate;
    sendVerificationEmail(email: string, firstName: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, firstName: string, token: string): Promise<void>;
    sendWelcomeEmail(email: string, firstName: string): Promise<void>;
    sendVerificationApplicationManagerEmail(emails: string[], firstName: string, hostelName: string): Promise<void>;
    sendVerificationApplicationAdminEmail(adminEmail: string, hostelName: string, phone: string): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map