export const countByStatus = (items) => {
  const map = {
    APPROVED: 0,
    PENDING: 0,
    AMENDMENT_REQUIRED: 0
  };

  items?.forEach(item => {
    if (map[item.status] !== undefined) {
      map[item.status]++;
    }
  });

  return [
    { name: "Approved", value: map.APPROVED },
    { name: "Pending", value: map.PENDING },
    { name: "Amendment", value: map.AMENDMENT_REQUIRED }
  ];
};
