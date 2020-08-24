function solve() {
  class Melon {
    constructor(weight, melonSort) {
      if (new.target === Melon) {
        throw new Error("Abstract class cannot be instantiated directly");
      }

      this.weight = weight;
      this.melonSort = melonSort;
      this.element = "";
    }

    get elementIndex() {
      return this.weight * this.melonSort.length;
    }

    toString() {
      return (
        `Element: ${this.element}` +
        "\n" +
        `Sort: ${this.melonSort}` +
        "\n" +
        `Element Index: ${this.elementIndex}`
      );
    }
  }

  class Watermelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = "Water";
    }
  }

  class Firemelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = "Fire";
    }
  }

  class Earthmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = "Earth";
    }
  }

  class Airmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = "Air";
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = "Water";
      this.elements = ["Fire", "Earth", "Air", "Water"];
    }

    morph() {
      let nextElement = this.elements.shift();
      this.element = nextElement;
      this.elements.push(nextElement);
    }
  }

  return {
    Melon,
    Watermelon,
    Firemelon,
    Earthmelon,
    Airmelon,
    Melolemonmelon,
  };
}
