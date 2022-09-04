// Install library CryptoJS

decrypt(data: any): any {
    let dData = CryptoJS.AES.decrypt(data, "KEY"), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(''),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return JSON.parse(dData.toString(CryptoJS.enc.Utf8));
  }

  encrypt(data: any): string {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    let eData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), "KEY"), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(''),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return eData.toString();
  }

  getEncryptedGetParam(data: any): string {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    let eData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), "KEY"), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(''),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encodeURIComponent(eData.toString());
  }