export interface Crypt {
  hashSync(data: string, saltOrRounds: number): string;
  compareSync(data: string, encrypted: string): boolean;
}
