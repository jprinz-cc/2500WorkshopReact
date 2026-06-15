export const formatCountDisplay = (count) => {
    if (count < 0) return "Count: 0";
    if (count > 99) return "Count: 99+";
    return `Count: ${count}`;
};