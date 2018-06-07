import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DataAccessService } from '../services/data-access.service';

export interface APIContext {
    apiService: APIService;
    authService: AuthService; 
    dataAccessService: DataAccessService;
}

