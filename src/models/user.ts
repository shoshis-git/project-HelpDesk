export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: Date;
    is_active: number;

}
export interface RegisterUser {
    name: string;
    email: string;
    password: string;
}
