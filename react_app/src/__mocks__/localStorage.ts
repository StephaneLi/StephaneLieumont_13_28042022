interface KeyValue {
  [key: string]: string;
}

export const localStorageMock = (function() {
  let store: any = {};

  return {
    getItem: function(key: string) {
      return store[key] || null;      
    },
    setItem: function(key:string, value:string) {

      store[key] = value.toString();
      
    },
    removeItem: function(key:string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();