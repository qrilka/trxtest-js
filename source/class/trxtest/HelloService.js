qx.Class.define("trxtest.HelloService",
{
  extend : qx.core.Object,

  properties : {
    hellos : {
      nullable: true,
      event: "changeHellos"
    }
  },

  members :
  {
    __store : null,
    
    
    fetchHellos : function() {
      if (this.__store == null) {
        var url = "/hellos.json";
        this.__store = new qx.data.store.Jsonp(url, null, "callback");
        this.__store.bind("model", this, "tweets");
      } else {
        this.__store.reload();
      }
    }
  }
});