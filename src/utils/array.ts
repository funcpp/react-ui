export const isSameSet = (
    a: Array<string | number> | null,
    b: Array<string | number> | null
): boolean => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;

    if (a?.length !== b?.length) return false;
    a = a.sort();
    b = b.sort();
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

export const isSubset = (
    big: Array<string | number> | null,
    small: Array<string | number> | null
): boolean => {
    if (!Array.isArray(big) || !Array.isArray(small)) return false;

    for (let i = 0; i < small.length; i++) {
        if (!big.includes(small[i])) return false;
    }
    return true;
};
