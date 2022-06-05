// generateOTPDto represents the request body of generateOtp
export interface generateOTPDto {
  phone_number: string;
}

// errorResponse represents the general error response
export interface errorResponse {
  status: number;
  message: string;
}

// generateOTPResponse represents the response of generateOtp request 
export interface generateOTPResponse {
  id: string;
}