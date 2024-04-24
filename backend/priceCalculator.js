// priceCalculator.js

const calculatePrice = (zone, km_price, base_distance_in_km,total_distance, item_type) => {
  // Logic to query database and calculate price based on provided parameters
  // Use cents to avoid decimal issues

  // Example implementation:
  const baseDistance = base_distance_in_km; // Base distance in km
  const basecost = km_price*100; // Base price in cents (10 euros)
  const perishablePricePerKm = 150; // Perishable item price per km in cents (1.5 euros)
  const nonPerishablePricePerKm = 100; // Non-perishable item price per km in cents (1 euro)
console.log(basecost)
  let totalPrice = basecost;
  if (total_distance > baseDistance) {
    const additionalDistance = total_distance - baseDistance;
    const pricePerKm = item_type === 'perishable' ? perishablePricePerKm : nonPerishablePricePerKm;
    totalPrice += additionalDistance * pricePerKm;
  }

  return totalPrice;
};

module.exports = { calculatePrice };
