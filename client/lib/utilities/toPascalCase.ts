function toPascalCase(inputString: string) {
    const words = inputString.split(/\s+/);

    const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const pascalCaseString = pascalCaseWords.join('');

    return pascalCaseString;
}

export { toPascalCase }