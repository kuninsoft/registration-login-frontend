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
        await this.executeAuth("Register", dto);
    }

    async login(dto: LoginDto) {
        await this.executeAuth("Login", dto);
    }

    async refresh() {
        const refreshToken = localStorage.getItem("refreshToken");

        try {
            await this.executeAuth("Refresh", { refreshToken: refreshToken } as RefreshDto);
        } catch (e) {
            console.error(e);

            sessionStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            throw e;
        }
    }

    async test() {
        await this.makeRequestWithRetry("Main/Test");
    }

    async assignAdmin() {
        const response = await this.makeRequestWithRetry("Main/AssignAdmin") as AuthResponse;

        this.saveTokens(response.accessToken, response.refreshToken);
    }

    async adminTest() {
        await this.makeRequestWithRetry("Main/AdminTest");
    }

    private async makeRequestWithRetry<T>(endpoint: string, init?: RequestInit): Promise<T> {
        try {
            return await this.makeRequest<T>(endpoint, init);
        } catch (error) {
            if (!(error instanceof ResponseError)
                || error.errorCode !== 401) {
                throw error;
            } 

            await this.refresh();

            return await this.makeRequest<T>(endpoint, init);
        }
    }

    private async executeAuth<T extends keyof AuthEndpointMap>(endpoint: T, dto: AuthEndpointMap[T]) {
        const response = await this.makeRequest(`Auth/${endpoint}`, {
            method: "POST",
            body: JSON.stringify(dto)
        }) as AuthResponse;

        this.saveTokens(response.accessToken, response.refreshToken);
    }

    private async makeRequest<T>(endpoint: string, init?: RequestInit): Promise<T> {
        const accessToken = sessionStorage.getItem("accessToken");

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

        return await response.json() as T;
    }

    private saveTokens(accessToken: string, refreshToken: string) {
        if (!accessToken || !refreshToken) {
            throw Error("AccessToken or RefreshToken are invalid");
        }

        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }
}

const apiService = new ApiService("http://localhost:5236");

export default apiService;