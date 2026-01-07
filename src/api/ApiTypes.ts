export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto extends LoginDto {
    fullName: string;
}

export interface RefreshDto {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export type AuthEndpointMap = {
    Login: LoginDto,
    Register: RegisterDto,
    Refresh: RefreshDto
};

export class ResponseError {
    errorCode: number;
    errorMessage?: string;

    constructor(errorCode: number, errorMessage?: string) {
        this.errorCode = errorCode;
        if (errorMessage) this.errorMessage = errorMessage;
    }
}