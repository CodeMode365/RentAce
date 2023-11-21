import bcrypt from "bcrypt"

const generateHash = async (text: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(text, saltRounds)

}

const compareWithHash = async (plainText: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(plainText, hashedText);
}

export { generateHash, compareWithHash }