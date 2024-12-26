export function validateIsraeliPhoneNumber(phone: string): boolean {
    // Remove all whitespace and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');

    // Regular expressions for different formats
    const mobileRegex = /^05[0-9][0-9]{7}$/;  // Mobile numbers starting with 05
    const landlineRegex = /^0[2-9][0-9]{7}$/;  // Landline numbers starting with 0
    const intlRegex = /^\+972[0-9]{9}$/;  // International format

    // Test against all formats
    return mobileRegex.test(cleanPhone) ||
        landlineRegex.test(cleanPhone) ||
        intlRegex.test(cleanPhone);
}