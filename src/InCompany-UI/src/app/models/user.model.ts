export class User {
    public email!: string;
    public department!: string;
    public username!: string;

    constructor(obj: any) {
        this.email = obj.email;
        this.department = obj.department;
        this.username = obj.username;
    }
}
