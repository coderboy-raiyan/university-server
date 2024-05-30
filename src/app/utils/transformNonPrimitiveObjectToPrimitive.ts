// Time Complexity = O(n*n)+ O(n) = O(n^2)
function transformNonPrimitiveObjectToPrimitive<T>(
    primitiveFields: Partial<T>,
    nonPrimitiveFields: Partial<T>
) {
    const modifiedObject: Record<string, unknown> = { ...primitiveFields };
    const transformObjectToArray = Object.entries(nonPrimitiveFields); // 0(n);

    transformObjectToArray.forEach((nonPrimitive) => {
        // O(n)
        if (nonPrimitive[1]) {
            if (Object.keys(nonPrimitive[1]).length) {
                for (const [key, value] of Object.entries(nonPrimitive[1])) {
                    // O(n)
                    modifiedObject[`${nonPrimitive[0]}.${key}`] = value;
                }
            }
        }
    });

    return modifiedObject;
}

export default transformNonPrimitiveObjectToPrimitive;
