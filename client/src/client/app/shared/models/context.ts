import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

export interface APIContext {
    apiService: APIService;
    authService: AuthService; 
}

