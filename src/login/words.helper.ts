export default class WordsHelper {
    /**
     * Generates a random string of the specified length, including special characters.
     *
     * @param {number} length The desired length of the random string.
     * @returns {string} The generated random string.
     */
    static generateRandomString(length: number): string {
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|[]\?><,./-'; // Caracteres especiales añadidos
      let result: string = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
  
      return result;
    }
  }