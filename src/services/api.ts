const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface MascotUploadResponse {
  success: boolean;
  message: string;
  data: {
    asset_id: string;
    status: string;
    url?: string;
  };
}

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error',
        error,
      };
    }
  }

  static async uploadMascot(file: File): Promise<ApiResponse<MascotUploadResponse['data']>> {
    const formData = new FormData();
    formData.append('mascot', file);
    console.log('--------mascot upload54--------');
    try {
      const response = await fetch(`${API_BASE_URL}/mascot/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      console.log('--------mascot upload62--------', data);      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Mascot upload failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Upload failed',
        error,
      };
    }
  }

  static async getAssetStatus(assetId: string): Promise<ApiResponse> {
    console.log('--------mascot 79--------');
    return this.request(`/mascot/status/${assetId}`);
  }

  static async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }

  static async uploadBackground(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('background', file);

    try {
      const response = await fetch(`${API_BASE_URL}/background/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Background upload failed');
      return data;
    } catch (error) {
      console.error('Background upload failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Upload failed',
        error,
      };
    }
  }
}

export default ApiService;
