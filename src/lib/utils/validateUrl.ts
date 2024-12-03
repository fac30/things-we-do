export function validateUrl(input: string): { isValid: boolean; url?: string; error?: string } {
  if (!input) {
    return {
      isValid: false,
      error: 'Please enter a URL'
    };
  }

  try {
    const urlProtocol = input.startsWith('http://') || input.startsWith('https://')
      ? input
      : `https://${input}`;

    console.log(`urlProtocol: ${urlProtocol}`);

    const url = new window.URL(urlProtocol);

    if (!['http:', 'https:'].includes(url.protocol)) {
      return {
        isValid: false,
        error: 'Only HTTP and HTTPS protocols are allowed'
      };
    }

    console.log(`URL is valid: ${url.toString()}`);
    return {
      isValid: true,
      url: url.toString()
    };
  } catch (error) {
    console.error(`Error validating URL: ${error}`);

    return {
      isValid: false,
      error: `Invalid URL format: ${error}`
    };
  }
}
