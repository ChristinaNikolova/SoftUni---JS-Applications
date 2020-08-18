(() => {
  String.prototype.ensureStart = function (str) {
    return this.startsWith(str) ? this.toString() : str.concat(this);
  };

  String.prototype.ensureEnd = function (str) {
    return this.endsWith(str) ? this.toString() : this.concat(str);
  };

  String.prototype.isEmpty = function () {
    return this.length === 0 ? true : false;
  };

  String.prototype.truncate = function (n) {
    if (n < 4) {
      return ".".repeat(n);
    }

    if (this.length <= n) {
      return this.toString();
    }

    let spaceIndex = this.substring(0, n - 1).lastIndexOf(" ");

    if (spaceIndex === -1) {
      return this.substring(0, n - 3) + "...";
    }

    return this.substring(0, spaceIndex) + "...";
  };

  String.format = function (str, ...params) {
    for (let i = 0; i < params.length; i++) {
      str = str.replace(`{${i}}`, params[i]);
    }

    return str;
  };
})();
