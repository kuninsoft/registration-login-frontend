import { 
    ResponseError, 
    type AuthEndpointMap,
    type AuthResponse,
    type LoginDto, 
    type RefreshDto, 
    type RegisterDto 
} from "./ApiTypes";

class ApiService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async register(dto: RegisterDto) {
        return await this.executeAuth("Register", dto);
    }

    async login(dto: LoginDto) {
        return await this.executeAuth("Login", dto);
    }

    async refresh(dto: RefreshDto) {
        try {
            return await this.executeAuth("Refresh", { refreshToken: dto.refreshToken } as RefreshDto);
        } catch (e) {
            console.error(e);

            sessionStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            throw e;
        }
    }

    async test(accessToken: string | null) {
        await this.makeRequest("Main/Test", accessToken);
    }

    async assignAdmin(accessToken: string | null) {
        return await this.makeRequest("Main/AssignAdmin", accessToken, {
            method: "POST"
        }) as AuthResponse;
    }

    async adminTest(accessToken: string | null) {
        await this.makeRequest("Main/AdminTest", accessToken);
    }

    private async executeAuth<T extends keyof AuthEndpointMap>(endpoint: T, dto: AuthEndpointMap[T]) {
        return await this.makeRequest(`Auth/${endpoint}`, null, {
            method: "POST",
            body: JSON.stringify(dto)
        }) as AuthResponse;
    }

    private async makeRequest<T>(endpoint: string, accessToken: string | null, init?: RequestInit): Promise<T> {
        const response = await fetch(new URL(endpoint, this.baseUrl), {
            ...init,
            headers: {
                ...(init?.headers ?? {}),
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new ResponseError(response.status, response.statusText ?? "An error occurred");
        }

        const contentType = response.headers.get("content-type");

        console.debug(`Request to ${endpoint} success! Response code: ${response.status}`);

        if (!contentType || !contentType.includes("application/json")) {
            return undefined as T;
        }

        const text = await response.text();
        if (!text) {
            return undefined as T;
        }

        return JSON.parse(text) as T;
    }
}

const apiService = new ApiService("https://registration-login-api-baezanekfnbqcqaf.westeurope-01.azurewebsites.net");

export default apiService;