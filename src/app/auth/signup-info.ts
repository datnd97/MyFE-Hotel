export class SignUpInfo {
    name: string;
    email: string;
    username: string;
    password: string;
    role: string[];

  constructor(name: string, email: string, username: string, password: string) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = ['user'];
  }
}
