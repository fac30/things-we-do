export function validateUrl(input: string, label: string = 'URL'): { isValid: boolean; url?: string; error?: string } {
  if (!input) {
    return {
      isValid: false,
      error: `Please enter a ${label}`
    };
  }

  try {
    const urlProtocol = input.startsWith('http://') || input.startsWith('https://')
      ? input
      : `https://${input}`;

    const url = new window.URL(urlProtocol);

    if (!['http:', 'https:'].includes(url.protocol)) {
      return {
        isValid: false,
        error: `Only HTTP and HTTPS protocols are allowed for ${label}`
      };
    }

    return {
      isValid: true,
      url: url.toString()
    };
  } catch (error) {
    return {
      isValid: false,
      error: `Invalid ${label} format: ${error}`
    };
  }
}
