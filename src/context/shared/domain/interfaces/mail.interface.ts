export interface Mailer {
  send(
    to: string,
    from: string,
    subject: string,
    template: string
  ): Promise<any>;
}
