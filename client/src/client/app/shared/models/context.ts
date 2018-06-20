import { ModelAPIService } from '../services/api/model-api.service';
import { AuthService } from '../services/auth.service';

export interface APIContext {
    apiService: ModelAPIService;
    authService: AuthService; 
}

