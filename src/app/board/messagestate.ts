export class MessageState {
    constructor(public moveAllowed: boolean,
         public alertMessage: string,
          public noMoreMoves: boolean,
           public boxMessage: string[]) {}
}