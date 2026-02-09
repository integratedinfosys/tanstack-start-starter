

export const throwError = (message: string, error: unknown) => {
    let options: ErrorOptions | undefined = undefined;

    // Narrow the type to ensure it's a valid object for the 'cause' property
    if (typeof error === 'object' && error !== null) {
        options = { cause: error };
    } else {
        // Handle cases where the thrown value is a primitive (e.g., a string or number)
        options = { cause: String(error) };
    }

    // Now 'options' is safely assigned and can be used
    throw new Error(message, options);
}

export function getErrorOptions(error: unknown): ErrorOptions {
  if (typeof error === 'object' && error !== null) {
    return { cause: error };
  }
  // Fallback for primitives or null/undefined
  return { cause: String(error) };
}

// Usage in catch block:
try {
  // Code that might throw an error
} catch (error: unknown) {
  throw new Error("Something went wrong", getErrorOptions(error));
}