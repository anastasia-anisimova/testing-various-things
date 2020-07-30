export class Pastebin {
  public readonly id: number;
  public readonly title: string;
  public readonly language: string;
  public readonly paste: string;
  constructor(props: {id, title, language, paste}) {
    Object.assign(this, props);
  }

}

// const a = new Pastebin({id: '1', title: 'First', language: 'Ru', paste: '1111'});
// console.log(a.language);
