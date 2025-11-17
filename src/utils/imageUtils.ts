// Base64 encoded profile image to hide from assets inspection
// This makes it much harder to extract the image from the network tab
export const getProfileImageData = (): string => {
  // This will be replaced with actual base64 data
  // For now, we'll use a dynamic approach to load the image
  return 'data:image/jpeg;base64,'; // This will be populated with actual data
};

// Function to create a blob URL for additional obfuscation
export const createObfuscatedImageUrl = (base64Data: string): string => {
  // Convert base64 to blob and create object URL
  const byteCharacters = atob(base64Data.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
  return URL.createObjectURL(blob);
};

// Dynamic image loader that fetches from a custom endpoint
export const loadProtectedImage = async (): Promise<string> => {
  try {
    // You can later replace this with an API endpoint that serves the image
    // with authentication or other protection mechanisms
    const response = await fetch('/api/profile-image');
    
    if (!response.ok) {
      throw new Error('Failed to load image');
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.log('Using fallback image loading method');
    // Fallback to original image if API is not available
    return new Promise((resolve) => {
      import('../assets/profile.jpg').then((module) => {
        resolve(module.default);
      });
    });
  }
};