export function querySetSecretWord(): string {
        return `FOR user IN users
              FILTER user.username == @username
              UPDATE user WITH { secretWord: @secretWord } IN users
              RETURN NEW
            `;
    }
    export function queryGetUser(field: string):string{
       return `
              FOR user IN users
              FILTER user.${field} == @value
              RETURN {
                email: user.email,
                password: user.password,
                secretWord: user.secretWord,
                username: user.username,
              }
            `;
    }
    export function GetRamdomQuestion($amount:number=5): string {
        return `FOR q IN questions
              FILTER q.type == @type
              SORT RAND()
              LIMIT ${$amount}
              RETURN q`;
    }
