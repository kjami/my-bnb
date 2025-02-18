export const convertToSerializableObject = (leanDocument) => {
    for (let key of Object.keys(leanDocument)) {
        if (leanDocument[key].toJSON && leanDocument[key].toString) {
            leanDocument[key] = leanDocument[key].toString();
        }
    }
    return leanDocument;
}