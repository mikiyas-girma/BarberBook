export interface SignInFormData {
    email: string;
    password: string;
}

export interface SignUpBarberData {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}


export interface SignUpCustomerData {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export type SignUpFormData = SignUpBarberData | SignUpCustomerData;
