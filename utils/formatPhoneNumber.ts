const formatPhoneNumber = (phone: string): string => {
  // Remove non-digit characters except "+" for international numbers
  phone = phone.replace(/[^\d+]/g, "");

  // If the phone number starts with a "+", it's an international number
  if (phone.startsWith("+")) {
    // Format for international phone numbers:
    // Polish format: +48 123 456 789
    phone = phone.replace(/^(\+?\d{1,3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");

    // American format: +1 123 456 7890
    phone = phone.replace(/^(\+?\d{1})(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");

    // British format: +44 123 456 7890
    phone = phone.replace(/^(\+?\d{1,3})(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
  } else {
    // Format regular local numbers (e.g., 1234567890 -> 123 456 7890)
    phone = phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");
  }

  return phone;
};

export default formatPhoneNumber;
