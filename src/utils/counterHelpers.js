export const formatCountDisplay = (count) => {
    if (count < 0) return "Count: 0";
    if (count > 999) return "Count: 999+";
    return `Count: ${count}`;
};