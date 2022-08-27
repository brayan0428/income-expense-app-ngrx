export class User{
    uid:string;
    name:string;
    email:string; 

    constructor(uid:string, name:string, email:string){
        this.uid = uid;
        this.name = name;
        this.email = email;
    }
}