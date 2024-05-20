export const formatAddress = (address) => {
    if (address == null) return null;
    const addressSplit = address.split(',');
  
    if (addressSplit.length > 3) {
      return {
        address: addressSplit[0],
        city: addressSplit.slice(1).join(),
      };
    }
  
    return {
      address: '',
      city: address,
    };
  };
  