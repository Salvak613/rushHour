export class WantedGuy {
  constructor(
    public id: string, 
    public aliases: string[], 
    public details: string, 
    public datesOfBirthUsed: string[], 
    public types: string[], 
    public description: string, 
    public image: string | null, 
    public status: string, 
    public age_range: string,
    public reward_text: string, 
    public sex : string,
    public race : string,
    public warningMessage : string,
    public profileURl: string,
    public hair: string, 
    public fieldOffices: string[],
    public title: string
  ) {}
}
